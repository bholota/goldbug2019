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

