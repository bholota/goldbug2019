var showContextMenu = undefined;

updateCallback = function () {
    if (showContextMenu !== preferences.showContextMenu) {
        showContextMenu = preferences.showContextMenu;
        setContextMenu(showContextMenu);
    }
};

localStorage.setItem("option_panel", "null");

var currentVersion = chrome.runtime.getManifest().version;


setContextMenu(preferences.showContextMenu);

chrome.cookies.onChanged.addListener(function (changeInfo) {
    var removed = changeInfo.removed;
    var cookie = changeInfo.cookie;
    var cause = changeInfo.cause;

    var name = cookie.name;
    var domain = cookie.domain;
    var value = cookie.value;

    if (cause === "expired" || cause === "evicted") {
        return;
    }

    console.log(
        'Cookie change',
        name,
        domain,
        value,
        removed,
        cookie,
        cause
    );
});

function setContextMenu(show) {
    chrome.contextMenus.removeAll();
    if (show) {
        chrome.contextMenus.create({
            "title": "Bezpieczny Jez",
            "contexts": ["page"],
            "onclick": function (info, tab) {
                showPopup(info, tab);
            }
        });
    }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {

        let url = new URL(details.url);
        let data = {
            method: details.method,
            tabId: details.tabId,
            domain: url.host.split('.').reverse().map((val, idx, arr) => { return arr.slice(0, idx + 1).reverse().join('.'); }),
            url: details.url
        };
        updateReq(data);
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ['*://*/*']},
    ['blocking', 'requestHeaders', 'extraHeaders']
);

function updateReq(data) {
    chrome.storage.sync.get(['requests'], function (value) {
        let raw = [];
        if (value.requests !== undefined ) {
            raw = value.requests;
        }
        raw.push(data);
        //alert(raw.length);
        chrome.storage.sync.set({ requests: raw }, () => {});
    });
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {

        if (details.url.indexOf('http://127.0.0.1:5000/data?url=') === -1) {
            let url = parseUrl(details.url);
            if (data_tracking.action_map[url] !== undefined) {
                if (data_tracking.action_map[url].heuristicAction === 'block') {
                    addCurrentTracker(url);
                    // $.get("http://127.0.0.1:5000/data?url=blocked_" + url);
                    return {cancel: true};
                }
            }

            // $.get("http://127.0.0.1:5000/data?url=" + url);
        }
        // removeHeader(details.requestHeaders, 'cookie');
        return {requestHeaders: details.requestHeaders};
    },
    // filters
    {urls: ['https://*/*', 'http://*/*']},
    // extraInfoSpec
    ['blocking', 'requestHeaders', 'extraHeaders']);

chrome.webRequest.onHeadersReceived.addListener(
    function(details) {

        if (details.url.indexOf('http://127.0.0.1:5000/data?url=') === -1) {
            let url = parseUrl(details.url);

            // $.get("http://127.0.0.1:5000/data?url=" + url + "&data=" + JSON.stringify(details.responseHeaders));
            if (data_tracking.action_map[url] !== undefined) {
                if (data_tracking.action_map[url].heuristicAction !== 'block') {
                    removeHeader(details.responseHeaders, 'set-cookie');
                }
            }
        }
        return {responseHeaders: details.responseHeaders};
    },
    // filters
    {urls: ['https://*/*', 'http://*/*']},
    // extraInfoSpec
    ['blocking', 'responseHeaders', 'extraHeaders']);

function parseUrl(url) {
    let hostname;

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
}

function removeHeader(headers, name) {
    for (var i = 0; i < headers.length; i++) {
        if (headers[i].name.toLowerCase() == name) {
            console.log('Removing "' + name + '" header.');
            headers.splice(i, 1);
            break;
        }
    }
}
