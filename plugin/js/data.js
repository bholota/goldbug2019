
var preferences = {
    showContextMenu: true
};

let current_tracker = {};

chrome.storage.sync.get(['trackers'], function(result) {
    if (result.trackers === undefined) {
        current_tracker = {};
    } else {
        current_tracker = result.trackers;
    }
    console.log(result.trackers);
});


function addCurrentTracker(url) {
    chrome.storage.sync.get(['trackers'], function(result) {
        if (result.trackers === undefined) {
            current_tracker = {};
        } else {
            current_tracker = result.trackers;
        }

    });

    if (typeof(current_tracker[url]) === 'undefined') {
        current_tracker[url] = {
            url: url,
            name: current_tracker,
            status: 'blocking',
            domain: {}
        };

        current_tracker[url].domain[window.location.hostname] = window.location.hostname;
        chrome.storage.sync.set({trackers: current_tracker}, function() {
            console.log('Value is set to ' + current_tracker);
        });
    } else {
        // current_tracker[url].domain[window.location.hostname] = window.location.hostname;
    }
}


let actions = {
    block: 'block',
    allow: 'allow'
};

let template = {
    "heuristicAction": "",
    "userAction": ""
};

function addTracker(url, userAction) {
    if (data_tracking.action_map[url] === undefined) {
        data_tracking.action_map[url] = template
    } else {
        data_tracking.action_map[url].userAction = userAction
    }
}


let data_tracking = {
    "action_map": {
        "events.ocdn.eu": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "%20digicert.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "01net.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "0914.global.ssl.fastly.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "100027443.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "100widgets.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "10510523.collect.igodigital.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "1060694.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "10733430.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "10733431.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "10870841.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "112.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "122.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "1387.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "140cc.v.fwmrm.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "15.zorosrv.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "1577.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "15gifts.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "173e252a.akstat.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "1847082.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "1996823.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "1dmp.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "1f2e7.v.fwmrm.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "1rx.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "20243.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "243-mrr-459.mktoresp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "247-inc.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "247realmedia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "2507573.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2588783.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "25livepub.collegenet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "2611388.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2677521.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2700447.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2771890.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2789293.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "29773.v.fwmrm.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2a7e9.v.fwmrm.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "2ecd5.v.fwmrm.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "2o7.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "33across.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "3518549.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3569326.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "360.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "360yield.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "36185.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3733772.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3797690.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3811564.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3822063.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3856256.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3944448.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "39700.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "3gimg.qq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "3gl.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "3lift.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "3m.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4053494.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "40856.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4139589.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4197153.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4272175.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4292932.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4298961.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4351288.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4457720.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4487060.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4488211.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4516568.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4531883.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4635217.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4635225.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4652332.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4704202.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4706068.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "47642.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4798151.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4855956.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4924464.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4d.condenastdigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "4dsply.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "50bang.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "5109.xg4ken.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5127394.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5146618.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5165330.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "51jingying.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "5270729.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5285806.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5340953.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "536-ct.c3tag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "5406241.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5427711.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5496506.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5524056.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5566805.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5581089.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "5597601.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6034474.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6050154.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6076416.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6101009.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6126321.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6144662.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6232239.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6249361.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6279534.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6321597.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6344610.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6356875.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6357902.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6441934.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6450450.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6462.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6498008.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6612401.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "66356275.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "66356337.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "66356383.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "66356409.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "66356605.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6854279.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6927309.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6gpwkrxh.micpn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "6sc.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "71360.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "7236711.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "75159.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "7cf90.v.fwmrm.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8007189.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8019375.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8021264.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8052794.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8064740.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8105471.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8117415.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8136487.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8136595.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8140983.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8166291.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8168974.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8178006.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8256288.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8343.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8344993.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8443129.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8468614.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8478693.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8531376.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8548005.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8548780.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8577835.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8667917.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8698893.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8709762.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8772288.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "88290.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8889547.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8896215.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "89008.global.siteimproveanalytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8966610.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8989188.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "8993311.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9001543.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9075004.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9080928.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9094101.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9096304.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9120855.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9207840.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9224405.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9272502.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9293948.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9346829.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9348536.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9483053.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9513928.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9563670.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "9582686.fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.ad.gt": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.adroll.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.cdn.intentmedia.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "a.dpmsrv.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "a.gdt.qq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "a.gedidigital.it": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "a.idio.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "a.intentmedia.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.pub.network": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "a.quora.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.rfihub.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.ria.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "a.teads.tv": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.tribalfusion.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a.wishabi.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "a2.adform.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "a3.xinhuanet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aa.agkn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aamcf.aamsitecertifier.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aamsitecertifier.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aarp.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aarp.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aax-eu.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aax-fe-pek.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aax-fe.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aax-us-east.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aax.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aaxads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "abmr.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "abtasty.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "acc-auth.sphdigital.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "accenture.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "accenture.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "accounts.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "accounts.us1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "accounts.zoho.com.au": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "accounts.zoho.in": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "acdn.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aclu.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "acpm.fr": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "acquia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "action.media6degrees.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "actions.everyaction.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "activenetworks-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "acuityplatform.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "acw.elsevier.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "acw.evise.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "acw.sciencedirect.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "acw.secure.jbs.elsevierhealth.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ad-hatena.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ad-plus.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ad-stir.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ad.as.amanad.adtdp.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ad.atdmt.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ad.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ad.gt": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ad.ipredictive.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ad.turn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ad.yieldlab.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ad1.adfarm1.adition.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ad2.360yield.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "adalliance.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adalyser.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adapf.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adblade.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adc-srv.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adc.nine.com.au": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adc.xxxlutz.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adcdn.goo.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "addthis.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adentifi.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adfarm.mediaplex.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adform.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adfox.ru": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adhigh.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adingo.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adition.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adkernel.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adlc-exchange.toast.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adm.fwmrm.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "admaster.com.cn": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "admedo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adn-d.sp.gmossp-sp.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adnimation-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "adnxs.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adobe.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adobedtm.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adotmob.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adping.qq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adroll.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adrtx.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ads.adaptv.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ads.adfox.ru": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ads.betweendigital.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ads.creative-serving.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ads.lfstmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ads.pro-market.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ads.pubmatic.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ads.revjet.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ads.rubiconproject.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ads.servebom.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ads.smrtb.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ads.stickyadstv.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ads.supplyframe.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ads.undertone.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ads.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ads.yap.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "adscale.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adserver-as.adtech.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "adserver-us.adtech.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "adserver.intentiq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adservice.google.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "adservice.kelkoogroup.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adsrvr.org": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adswizz.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adsymptotic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adtdp.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adventori.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "adverline-s.nuggad.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "advertising.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "adx.adform.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aetn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aetnd.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aexp.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "af.monetate.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "affirm.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "agilemeasure.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "agkn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "aid.send.microad.jp": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "aidata.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aimediagroup.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ainads.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "airpr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aj1015.online": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ajax.googleapis.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "ajax.microsoft.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ak1s.abmr.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "akamaihd.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "akstat.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "alb.reddit.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "alcmpn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "alexametrics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "aliapp.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "alibaba.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "alicdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "aliyun.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "all.orfr.adgtw.orangeads.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "allure.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "am.freshrelevance.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "amazon-adsystem.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "amazoncustomerservice.d2.sc.omtrdc.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "amazonwebservices.d2.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "amazonwebservicesinc.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ameba.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ampcid.google.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "amplify.outbrain.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "amplifypixel.outbrain.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "an.facebook.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "an.yandex.ru": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "analytics-sm.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "analytics.cohesionapps.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "analytics.fairfax.com.au": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "analytics.foresee.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "analytics.mailmunch.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "analytics.supplyframe.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "and.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "answerscloud.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ap.lijit.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "apester.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "apex.go.sonobi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api-na.geetest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.adrtx.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.autopilothq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.bam-x.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.circularhub.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "api.company-target.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api.disney.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.facebook.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api.flickr.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "api.flyertown.ca": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "api.getdrip.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.growingio.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.hubspot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api.intentiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api.map.baidu.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "api.pinterest.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api.pymx5.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.rlcdn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api.swiftype.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.theadex.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api.viafoura.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "api.webpush.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "api2932.d41.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "api4920.d41.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "apihotels.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "apis.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "app-us1.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "app.cdn.lookbookhq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "app.hive.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "app.hushly.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "app.link": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "app.matheranalytics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "app.pendo.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "app3.emlgrid.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "app3.salesmanago.pl": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "appconsent.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "appdynamics.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "appier.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "apple.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "apple.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aps.hearstnp.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "apt.techtarget.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "aralego.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "architecturaldigest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "arcpublishing.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "art19.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "as-sec.casalemedia.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "as.amanad.adtdp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "as.casalemedia.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "asadcdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "asahishimbun.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "asc.xs4all.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "asoscomltd.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "asqliberation.nuggad.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "asset.easydmp.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "assets.adobedtm.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "assets.bnidx.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "assets.bounceexchange.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "assets.map.brightcove.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "assets.pinterest.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "assets.purch.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "assoc-eu.associates-amazon.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "assoc-na.associates-amazon.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "associates-amazon.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "atdmt.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "atgsvcs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "atout.email-match.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "atp.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ats.otto.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "att.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "att.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "attservicesinc.tt.omtrdc.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "au.tags.newscgp.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "audex.userreport.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "audience-static.smart-traffik.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "auth.adobe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "auth.audience.acpm.fr": {
            "heuristicAction": "",
            "userAction": ""
        },
        "auth.voxmedia.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "auth0.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "authorize.coxmediagroup.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "autodesk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "automate.linksynergy.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "autopilothq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "avclub.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "avira.marketlinc.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "aw.dw.impact-ad.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ayc0zsm69431gfebd.xyz": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "azureedge.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "b-code.liadm.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "b-s.tercept.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "b.6sc.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "b.hatena.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "b.scorecardresearch.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "b0e8.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "b1img.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "b2c.insticator.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "b3.mookie1.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "b92.yahoo.co.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "b97.yahoo.co.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "baidu.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "baidustatic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bam-x.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bam.nr-data.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bartleby.zendesk.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "bat.bing.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "baynote.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bazaarvoice.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "bbb.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bbg.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bbnaut.ibillboard.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bdg-analytics.appspot.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bdimg.share.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "beacon.krxd.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "beacon.scorecardresearch.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "beacon.sina.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "beacon.sojern.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "beam.koddi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "beemray.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "beian.gov.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bellmedia.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bellsouth.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "beringmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bestbuy.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "beta-eue-1.steelcentral.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "betweendigital.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bfmio.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bfmtv.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bh.contextweb.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bid.contextweb.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bid.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bid.intentiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bidder.criteo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bidder.rtk.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "biddingx.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "biddr.brealtime.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bidr.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bids.proper.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bidswitch.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bing.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bizible.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bizibly.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bizographics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bizrate.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "bizspring.co.kr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bizspring.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "blip.bizrate.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "bluecava.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "blueconic.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bluehost.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bluekai.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bm.adentifi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bnidx.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bnmla.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "boldchat.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "bonappetit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bonnier-subscriptions.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bonniercorp.122.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "books.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "boredpanda-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "boston.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bostonglobemedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bounceexchange.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bouncex.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "brain.foresee.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "brain.rvty.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "brainyquote-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "brand-display.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "brealtime.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "brightcove.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "briskpelican.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "britishairways.d3.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "britishtelecom.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "brookings.foxycart.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "brsrvr.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bs.serving-sys.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bshare.optimix.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bt.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "btg.mtvnservices.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "btlr.sharethrough.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "bttrack.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "btttag.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "bunchbox.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "buydomains.evyy.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "buzzfeed.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "bwk1axfla05vrku9.col.ip-label.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "by2.uservoice.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "c.6sc.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c.aaxads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "c.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c.bing.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c.cintnetworks.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "c.contentsquare.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "c.deployads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "c.ingage.tech": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "c.jsrdn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "c.lytics.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c.pub.network": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c.statcounter.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "c1.adform.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c2.taboola.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "c212.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "c3tag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cache.vindicosuite.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cadreon.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "calendar.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "calendarwiz.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "canada.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "canon.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "capture.condenastdigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "capturehighered.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "carambola-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "carbon-cdn.ccgateway.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cas.cluep.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "casalemedia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "castle.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cbe.capturehighered.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cbjs.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cbsi.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cc.swiftype.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "ccgateway.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cct.o2online.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn-0.d41.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn-akamai.mookie1.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn-gl.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn-images-journals.azureedge.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn-images.mailchimp.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "cdn.appdynamics.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.ayc0zsm69431gfebd.xyz": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.bizible.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.blueconic.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.bttrack.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.cohesionapps.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.cxense.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.d2-apps.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cdn.digitru.st": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.districtm.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.dynamicyield.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.firstimpression.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.flipboard.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.heapanalytics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.izooto.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.justuno.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.keywee.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.mg2connext.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.monsido.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.neighbourly.co.nz": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.oas-c18.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.onthe.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.pagesense.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.pbbl.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cdn.petametrics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.registerdisney.go.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.scribblelive.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.selectablemedia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cdn.siftscience.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.static.zdbb.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.syndication.twimg.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cdn.taboola.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.treasuredata.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.tynt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.viglink.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdn.wbtrk.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cdns.eu1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "cdns.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "cdns.us1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "cdnssl.clicktale.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cdnwidget.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ce.lijit.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cendantchg.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cern.ch": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "certify-js.alexametrics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "certify.alexametrics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cfzu.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ch.ch": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "channel4.com.ssl.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "chartbeat.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "checkin.purechat.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "checkout.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "checkout.paddle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "checkout.stripe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "chinaso.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "chirp.bizrate.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "choozle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "christianscience.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "christscientist.d2.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cintnetworks.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "circularhub.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cisco-tags.cisco.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cisco.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ciscowebex.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ciscowebex.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "civicscience.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "cjox6hib.micpn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ck.connatix.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cks.mynativeplatform.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cl0.webterren.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cl2.webterren.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cl3.webterren.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clearbrain.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clearchannel.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "click.wrating.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clickability.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clickagy.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clickhole.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clicktale.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "clicktripz.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "client.a.pxi.pub": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "client.perimeterx.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clients1.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "clients6.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "clinch.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "clmbtech.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cloud-iq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cloudflare.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "clrstm.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cluep.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cm.adform.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cm.e.qq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cm.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cm.pos.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cm.smadex.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cms.analytics.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cms.gtags.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cms.quantserve.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cntraveler.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cnzz.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "cnzz.mmstat.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "code.visitor-track.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cohesionapps.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "collect-eu-central-1.tealiumiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collect.tealiumiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collecte.audience.acpm.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "collector-1564.tvsquared.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collector-282.tvsquared.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collector-840.tvsquared.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collector-963.tvsquared.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collector-pxrw7m6iav.perimeterx.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "collector-pxszbkva5m.perimeterx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collector-pxxgcxm9by.cl6.perimeterx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collector.appconsent.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "collector.effectivemeasure.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "collegeboard.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "collegenet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "colossusssp.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "com-lenovo.netmng.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "com-wyndham.netmng.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "comcast-app.quantummetric.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "comcast.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "comcastcom.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "comcastresidentialservices.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "comeresaprensasl.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "commander1.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "company-target.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "complex.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "conac.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "condenast.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "condenastdigital.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "conductor.clicktale.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "config.lrcontent.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "connatix-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "connatix-supply-partners.tremorhub.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "connatix.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "connect.facebook.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "connexity.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "connextra.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "consensu.org": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "consent-pref.trustarc.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "consent.dc-storm.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "consent.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "consent.jrs5.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "consent.linksynergy.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "consent.mediaforge.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "consent.nxtck.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "consentmanager.mgr.consensu.org": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "const.website": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "consumer.krxd.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "contensis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "content.jwplatform.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "contentive.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "contentsquare.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "contextual.media.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "contextweb.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "contributor.google.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "conv-tm.everesttech.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cookie.sync.ad.cpe.dotomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cookie.vrtzads.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cookiesync.rtb.redventures.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cookiex.ngd.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "core.connatix.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "coremetrics.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "corus.ca": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "counter.scribblelive.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "counter.yadro.ru": {
            "heuristicAction": "",
            "userAction": ""
        },
        "coxmediagroup.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cpro.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cpx.to": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "crain.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "creative-serving.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "creativecdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "criteo.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "crm4d.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "crsspxl.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cs.adingo.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cs.choozle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cs.emxdgt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cse.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "csync.smartadserver.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ct.pinterest.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ct.verticalhealth.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cta-service-cms2.hubspot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cti.w55c.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cts.w55c.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "custhelp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "customer-4876.micpn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "customer.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "cw.addthis.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cx.atdmt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "cxense.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "d-track.send.microad.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d.adroll.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "d.agkn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "d.btttag.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "d.df-srv.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d.nativendo.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d.pub.network": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d.socdm.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "d.t-x.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d.tailtarget.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "d.turn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "d1af033869koo7.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d1epsz32winqbo.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d1rv23qj5kas56.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d2-apps.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "d2qrdklrsxowl2.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d2t77mnxyo7adj.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d395dw5zk780j2.cloudfront.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "d3kwtionx0p7im.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d41.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "d5nxst8fruw4z.cloudfront.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "d9jj3mjthpub.cloudfront.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "dailymail.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dat.gtags.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "data.dianomi.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "data.queryly.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "datacloud.tealiumiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "datacollect6.abtasty.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "datamind.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "datas.tianqistatic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "daum.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dayintegrationintern.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "dc-storm.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dc.ads.linkedin.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "dcs.conac.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "de-gmtdmp.mookie1.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "de.ioam.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "de.tynt.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "deadspin.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "delivery-cdn-cf.adswizz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "delivery.vidible.tv": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "demandexchange.report.download": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "demdex.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "deployads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "deqwas.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dev.visualwebsiteoptimizer.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "developers.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "dezeenjobs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "df-srv.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "di-dtaectolog-us-prod-1.appspot.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "di.rlcdn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "di8n.bfmtv.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dianomi.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "digicert.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "digicert.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "digitalfirstmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "digitru.st": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "direct.ad.cpe.dotomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "disney.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "display.apester.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "distiltag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "districtm-match.dotomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "districtm.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dl.ixiaa.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dmp.im-apps.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dmp.theadex.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dmx.districtm.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dmxleo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "docs.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "dotomi.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dotsub.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "doubleclick.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dowjoneson.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "downloads.mailchimp.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "dpm.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "dpmsrv.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dpx.airpr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "drive.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "ds.reson8.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ds.zhaopin.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dsp.adfarm1.adition.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "dsum-sec.casalemedia.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "dsw.tt.omtrdc.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "dynad.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "dynamic.criteo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "dynamicyield.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "e.serverbid.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "e.zg-api.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "e1.emxdgt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "east-bid.ybp.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "easydmp.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eb2.3lift.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ebay-us.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ebay.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ebis.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eccmp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "edge-cdn.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "edge.quantserve.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "edge.simplereach.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "edigitalsurvey.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "effectivemeasure.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "el-mundo.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "elb.the-ozone-project.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eloqua.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "elsevier.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "elsevierhealth.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "elsevierlimited.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "email-match.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "embedr.flickr.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "emlgrid.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "emxdgt.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "engage.commander1.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "engageclick.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "engine.4dsply.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "entertainow.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eo.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "epicurious.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "epnt.ebay.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "epoch-times-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "equalstyle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eset.marketlinc.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "eset.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "essayprofit.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "estat.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eu-sonar.sociomantic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eu-u.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "eu2.thunderhead.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "euronewsgroup.d3.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "eus.rubiconproject.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "events.apester.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "events.fivetran.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "events.mediarithmics.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "everesttech.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "evergage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "everyaction.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "evise.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "evyy.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ew3.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ewscripps.hb.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "exactag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "excite.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "exelator.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "experianmarketingservices.digital": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "extcm.c.appier.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eyeota.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "eyereturn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "eyeviewads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "facebook.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "fairfax.com.au": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fairfax.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fandango.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fandango.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fandangollc.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "farm-ca.plista.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fast.wistia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fast.wistia.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fastfinch.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fastlane.rubiconproject.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fbc.wcfbc.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "fdz.flashtalking.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "feedburner.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "feedproxy.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "fei.pro-market.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "fh-main.measure.agilemeasure.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fi1.frosmo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "findlaw.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "firebaselogging.googleapis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "firstimpression-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "firstimpression.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fivetran.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "flashtalking.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "flickr.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "flipboard.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "fls.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "flyertown.ca": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "focus.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fontawesome.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "fonts.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "fonts.voxmedia.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "foresee.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "forms.hubspot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "formstack.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fourseasonshotels.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fout.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fox.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "foxnewsuni-f.akamaihd.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "foxycart.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fpn.flipboard.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "framework.web.cern.ch": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "frankfurterallgemeinezeitunggmbh.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "freshrelevance.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "friendship.nbc.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "frosmo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "fundingchoicesmessages.google.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fusiontables.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "futurenet-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "fwmrm.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "g.3gl.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "g.alicdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "g.cn.miaozhen.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "g.ign.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "g2.gumgum.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "g2insights-cdn.azureedge.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "gannett-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ganon.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "garu.hit.gemius.pl": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gateway.answerscloud.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gateway.foresee.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gb-gmtdmp.mookie1.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gedidigital.it": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "geetest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "geid.wbtrk.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gemius.pl": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "geo.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "geo.ziffdavis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "geocoding.internetbrands.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "getclicky.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "getdrip.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "getinvolved.qld.gov.au": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "getsmartcontent.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "giphy.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gizmodo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "glamour.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gleam.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "global.proper.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "globalwebindex.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gm.mmstat.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gmossp-sp.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "go.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "go.pardot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "goetheinstitut01.webtrekk.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "golfdigest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gomoxie.solutions": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "goo.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "google-analytics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "google.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "googleads.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "googleadservices.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gopro.mavrck.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "graph.facebook.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gridsumdissector.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "groupondata.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "groups.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "growingio.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "grunerandjahr.112.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "gscounters.eu1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "gscounters.us1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "gss0.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gss1.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gss2.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gtags.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gu.bizspring.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gulfnews.auth0.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "gum.criteo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gumgum.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gurgle.zdbb.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gwallet.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gwiq-v3.globalwebindex.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "gwiqcdn.globalwebindex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "gwmtracking.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "h.df-srv.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "h.f1.impact-ad.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "haaretz.co.il": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "halc.iadvize.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hatena-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "hatena.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hb-api.omnitagjs.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "hb.adscale.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "hb.emxdgt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "hbevents.1rx.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "hbopenbid.pubmatic.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "hc.tags.newscgp.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "heapanalytics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "hearst3pcc.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hearstnp.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "heredeutschlandgmbh.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "hexagon-analytics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "hgtv.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hive.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hm.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "homeaway.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "homedepot.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "homedepot.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "honeywell.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "honeywellinternation.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "hpe.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "html5-player.libsyn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hubspot.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "huihui.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hushly.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "hypers.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "i-mobile.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "i.gridsumdissector.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "i.po.st": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "i.prcdn.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "i.tianqi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "i.ua": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "i.w55c.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "iadvize.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ib.3lift.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ib.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ibclick.stream": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ibillboard.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ibt.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ice.360yield.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "iclick.cm.admaster.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ictr.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "id.cxense.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "id.rlcdn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "id5-sync.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "identity-norton.gomoxie.solutions": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "idio.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "idm.bce.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "idm.skplanet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ids.cdnwidget.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "idsync.rlcdn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "idx.liadm.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "iesnare.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ign.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "igodigital.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ih.adscale.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "iheart.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ijento.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "im-apps.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "image.excite.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "image.providesupport.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "image2.pubmatic.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "image6.pubmatic.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "imagesrv.adition.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "img.ak.impact-ad.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "img.macromill.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "img.tradedoubler.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "imgur.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "imp.ebis.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "impact-ad.jp": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "impact.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "imprlatbmp.taboola.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "imrworldwide.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "in.getclicky.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "in.treasuredata.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "in.xspadvertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "inc.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "increasingly.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "infinity-tracking.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "infinityid.condenastdigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "infolinks.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ing-district.clicktale.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ingage.tech": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ingov.zendesk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "inq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "insider.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "insight.adsrvr.org": {
            "heuristicAction": "",
            "userAction": ""
        },
        "insightexpressai.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "insights.plista.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "instagram.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "insticator.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "instinctiveads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "insurads.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "intelliad.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "intellimize.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "intellitxt.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "intentiq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "intentmedia.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "internetbrands.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "investis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "invoc.us": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ioam.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ip-label.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "iperceptions.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ipredictive.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ipw.metadsp.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "iqdigital.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "iqdigitalmediamarketinggmbh.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "irqs.ioam.de": {
            "heuristicAction": "",
            "userAction": ""
        },
        "irs01.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "italiaonline01.wt-eu02.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "iteratehq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ixiaa.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "izooto.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "j.6sc.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "jadserve.postrelease.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "jalopnik.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "janrainsso.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "jd.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "jerusalempost-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "jezebel.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "jogger.zdbb.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "jp-cm.dsp.linksynergy.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "jp-u.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "jrs5.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "js.adscale.de": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.adsrvr.org": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.agkn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.bizographics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.gumgum.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.hubspot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.matheranalytics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.spotx.tv": {
            "heuristicAction": "",
            "userAction": ""
        },
        "js.stripe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "jscache.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "jsrdn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "justpremium.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "justuno.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "jwplatform.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "jwpltx.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "k.intellitxt.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kaipuyun.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kakao.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kameleoon.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kampyle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kanade-ad.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kargo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kascs.deqwas.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kaspersky.d3.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "kdata.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kdex097.kanade-ad.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kds-pixel.kargo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kelkoogroup.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "keywee.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "kh.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "khms0.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "khms1.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "khms2.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "khms3.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "khms4.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "kinja.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "klangoo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "knet.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "koddi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kotaku.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kpmg.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "kraken.rambler.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "krxd.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "kuedu.capturehighered.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "kxlogo.knet.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "l.logly.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "l.sharethis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "l3.aaxads.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "labs.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "lasteventf-tm.everesttech.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "leadboxer.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "leadintel.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "leadlander.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "leju.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lennyletter.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lenovo-app.quantummetric.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lenovo.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lenovo.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lenovo.vzew.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lfstmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "liadm.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "liberapay.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "libsyn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lifehack-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lifehacker.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lift3assets.lift.acquia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ligadx.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lightboxcdn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "lijit.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "linkedin.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "linkmaker.itunes.apple.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "linksynergy.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "list-manage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "listrakbi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "literatumonline.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "livechatinc.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "livejournal.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "liveperson.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "lmi.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lmyd3iz3qn.kameleoon.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ln.ameba.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "load.instinctiveads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "loadeu.exelator.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "loadm.exelator.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "loadr.exelator.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "loadus.exelator.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "loc.gov": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lockerdome.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "log.intellimize.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "log.leadboxer.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "log.mmstat.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "log.olark.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "log.opentracker.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "logc187.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logger.co.kr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "loginradius.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "logitech.cfzu.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "logitech.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logitechlogitechglobal.112.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "logly.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "logmeinsupport.nanorep.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "logs1.smithsonian.museum": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "logs1091.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logs11.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logs1187.xiti.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "logs1211.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logs1242.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logs1406.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "logs1407.xiti.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lookbookhq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "loopme.me": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lowes.netmng.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "lowes.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lp4.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lptag.liveperson.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "lrcontent.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ls.hit.gemius.pl": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lwcal.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lww.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "lytics.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "m.exactag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "m.leju.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "m.reachmax.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "m.stripe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "m6r.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mabping.chartbeat.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "macromill.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "macys.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "macys.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "magnetrack.klangoo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mail.ru": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mailchimp.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mailmunch.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mantisadnetwork.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mantodea.mantisadnetwork.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mapixl.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "maps-api-ssl.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "maps.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mapsengine.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "marketing.tr.netsalesmedia.pl": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "marketlinc.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "marketo.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "marketplace.digitalfirstmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "marlin-prod.literatumonline.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mastercard.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mastercard.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mastercard.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "match.adsrvr.org": {
            "heuristicAction": "",
            "userAction": ""
        },
        "match.bnmla.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "match.prod.bidr.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "match.sharethrough.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "match.xg4ken.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "matheranalytics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mathtag.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mavencoalition.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mavrck.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "maxymiser.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mboxedge.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mc.us2.list-manage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mc.webvisor.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mc.yandex.ru": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mc.yandex.ua": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mcafee12.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mcafeeinc.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mcclatchy.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mcclatchy.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mcclatchy.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "media.complex.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "media.mcclatchy.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "media.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "media6degrees.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mediacorp.112.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mediacorp.sg": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mediaforge.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mediaplex.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mediarithmics.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mediav.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mediawallahscript.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "medtargetsystem.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "members.webs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "messefrankfurt01.webtrekk.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "messefrankfurt01.wt-eu02.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "metadsp.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "metrics.aetn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "metrics.brightcove.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "metrics.responsetap.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mfadsrvr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mg2connext.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mia-chat.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "miaozhen.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "micpn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "microad.jp": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "microsoft-us.evyy.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "microsoft.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "microsoftmscompoc.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mid.rkdms.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "minerva-deliver.sp.gmossp-sp.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mirror.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mktoresp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ml314.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mmm.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mmstat.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "moatads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "monarte.hub.loginradius.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "monetate.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "monsido.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "monster.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "monsterworldwide.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mookie1.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mos.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "motusmedia.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mouseflow.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mpnrs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mpnv2-prod-c.alcmpn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mpp.vindicosuite.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mppglobal.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mpsnare.iesnare.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mrpfd.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ms-apps.haaretz.co.il": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ms-apps.themarker.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mscom.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "msftenterprise.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "msgapp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "msn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mssl.fwmrm.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "mt0.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mt1.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mtrx.go.sonobi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mts0.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mts1.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mtvnetworks.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mtvnservices.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "musthird.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mvp.mediav.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "mw1.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "mw2.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "my.justuno.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "my.rtmark.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "my.spectate.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "myfamilycominc.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "mynativeplatform.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "myvisualiq.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "n2.mouseflow.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "na.groupondata.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nanorep.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "narrative.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "native.sharethrough.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nativendo.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "navdmp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "naver.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "naver.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nba.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nbc.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nbcu.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nbcume.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nbcuni.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "nc0.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nci.122.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "nd.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "neighbourly.co.nz": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "netmng.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "netsalesmedia.pl": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "network.bazaarvoice.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "new.essayprofit.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "newjobs.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "news.chinaso.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "news.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "newscgp.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "newsday.d2.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "newsmax.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "newsmaxfeednetwork.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "newyorker.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nfl.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nflenterprises.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ng.techweb.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ngpvan.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nhsdigital.d3.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nicequest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nine.com.au": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "nineto5mac-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nintendoofamerica.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "no-cache.hubspot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nodeny.targetspot.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nokia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nova.collect.igodigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nr-data.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ns.zdbb.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nscontext.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nt-p.alcmpn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "nuggad.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "nxtck.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "nypi.dc-storm.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "o1.qnsr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "o2.eyereturn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "o2online.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "oasc10.247realmedia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "oasc17015.247realmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "observermedia-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "odc.optimahub.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ojrq.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ok.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "okt.to": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "olark.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "olympicchannel.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "omkt.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "omnitagjs.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "omny.fm": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "oms.symantec.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "omtrdc.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "onecount.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "onsugar.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "onthe.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ooyala.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "opecloud.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "opentracker.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "openx.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ophan.theguardian.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "opinionstage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "opml.radiotime.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "optaim.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "optimahub.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "optimix.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "optimize-stats.voxmedia.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "optimizedby.increasingly.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "optimizely.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "opus.analytics.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "oraclecloud.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "orangeads.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "otto.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "outbrain.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ove1.marketlinc.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ovh.commander1.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "owneriq.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "p.adsymptotic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "p.alcmpn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "p.brsrvr.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "p.cpx.to": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "p.crm4d.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "p.typekit.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "p.yieldlab.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "p2.keywee.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "paddle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages.contentive.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages01.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages02.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages03.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages04.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages06.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages07.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pages08.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pagesense.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pardot.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "parsely.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "passport.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "patchmedia14411z.btttag.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pay.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "paypal.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "paypalobjects.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "pb.sogou.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pba.aws.lijit.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pbbl.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pendo.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "perimeterx.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "petametrics.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pf.entertainow.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "philips.112.2o7.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "philips.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "philipselectronicsne.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "phonograph2.voxmedia.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "photobucket.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pi.pardot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "picasaweb.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "ping.chartbeat.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pinterest.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pipes.yahoo.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "pitchfork.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pittpostgazette-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "piwik.pro": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pix.revjet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pixel-geo.prfct.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pixel-sync.sitescout.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.33across.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.adblade.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pixel.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.condenastdigital.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.everesttech.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.keywee.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.mathtag.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.motusmedia.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pixel.quantserve.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.roymorgan.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pixel.rubiconproject.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.servebom.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pixel.sitescout.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.sojern.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.staticworld.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pixel.tapad.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pixel.zprk.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pixeltrack.eyeviewads.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "placelocal.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "planet.virt-tools.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "platform.linkedin.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "platform.twitter.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "play.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "player.ooyala.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "playerservices.live.streamtheworld.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "plista.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "plus.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "pm.w55c.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "po.st": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pool.grid-data.bidswitch.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "populo.zengenti.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pos.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "postmedia.us.janrainsso.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "postrelease.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "powerlinks.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pp.d2-apps.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pp.lp4.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pr-bh.ybp.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "prcdn.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "prd.jwpltx.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "pre.ads.justpremium.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "prebid-match.dotomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "prebid.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pressboard.ca": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "prfct.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "prg.smartadserver.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "prism.app-us1.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "privacy.commander1.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pro-market.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pro.hit.gemius.pl": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "prod-mng-proxy-connext.azurewebsites.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "profile.ngpvan.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "projects.hearstnp.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "proofpoint.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "proper.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "propermedia-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "provenpixel.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "providesupport.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "proximus.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "prv.commander1.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ps-us.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ps.eyeota.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pswec.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pub.network": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pubads.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pubgalaxy-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pubmatic.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "pucha.kaipuyun.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pulsar.xlisting.jp": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "purch-match.dotomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "purch-sync.go.sonobi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "purch.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "purechat.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "push.zhanzhang.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "px.adhigh.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "px.ads.linkedin.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "px.owneriq.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "px.powerlinks.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "px.spiceworks.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "px0.pbbl.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "pxi.pub": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "pymx5.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "q.quora.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "q.stripe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "qchannel03.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "qds0l.publishers.tremorhub.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "qfx.tools.investis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "qhupdate.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "qnsr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "qq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "qsstats.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "qualia.id": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "quantserve.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "quantummetric.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "queryly.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "quora.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "quyaoya.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "r.3gl.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "r.atp.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "r.casalemedia.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "r.i.ua": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "r.skimresources.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "r.turn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "r.zlongad.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "radiotime.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rakuten.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rambler.ru": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "rand.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "randomhouse.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rat.rakuten.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rb.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "reachmax.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "reactful.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "recommender.scarabresearch.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "reddit.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "redirect.frontend.weborama.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "redlink.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "redventures.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "regmedia.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "relap.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "remarket.clicktripz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "report.download": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "report.huatuo.qq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "researchintel.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "researchnow.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "reson8.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "resources-production.la.welt.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "resources.xg4ken.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "responder.wt-safetag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "responsetap.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "revjet.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rezync.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rfihub.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ria.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "riafinancial.d2.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rice.lwcal.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "richaudience.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "richrelevance.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rightnowtech.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rkdms.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rlcdn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rm.em.nscontext.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rnengage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "roomkey.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "router.infolinks.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "roymorgan.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rp.gwallet.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rs.gwallet.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rtax.criteo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rtb-csync.smartadserver.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rtb.adentifi.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rtb.gumgum.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rtb.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rtbcx.jp.canon.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rtd-tm.everesttech.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rtk.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rtmark.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rtve.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "rubiconproject.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "rutarget.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "rvty.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ryanair.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s-static.ak.facebook.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "s.adroll.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s.clickability.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s.cpx.to": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s.getsmartcontent.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "s.hatena.ne.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s.jsrdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s.po.st": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s.skimresources.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s.thebrighttag.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "s.tribalfusion.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s.yimg.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "s1.listrakbi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s1061485456.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s11.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s13.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s1591793372.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s1731649222.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s1981692173.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2033604275.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2044559064.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2048.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2105158753.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2150.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2208.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s2s.proper.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "s3.amazonaws.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "s43975733.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s5.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s6.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s657486201.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s661931745.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s7.addthis.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s740070409.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s74881809.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s795651218.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s837031577.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s840.t.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s95.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "s96.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sa.placelocal.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sacbee.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "salecycle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "salesforceliveagent.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "salesiq.zoho.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "salesloft.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "salesmanago.pl": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "samba.tv": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sap.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sapglobalmarketingin.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sapi.map.baidu.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "saxp.zedo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "saymedia-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sb.monetate.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sb.scorecardresearch.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sbc.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sbnationbidder-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sbsaustralia.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "scarabresearch.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "scdn.cxense.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "scholar.google.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "scholarlyiq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "scholasticinc.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sciencedirect.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "scode.randomhouse.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "scomcluster.cxense.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "scorecardresearch.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "scout.salesloft.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "scout.us1.salesloft.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "scribblelive.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "scripps.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "scripps.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "script.ioam.de": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "se.monetate.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "seaofads.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "search.yahoo.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "seccdn-gl.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-assets.rubiconproject.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-au.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-dcr.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-ds.serving-sys.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-gl.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-it.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-nz.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-sg.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-uk.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure-us.imrworldwide.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure.eloqua.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure.flickr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "secure.leadback.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure.livechatinc.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "secure.onsugar.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "secure.quantserve.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "secure.statcounter.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "securedvisit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "securepubads.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "securite.01net.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "segapi.quantserve.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sejs.moatads.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "selectablemedia.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "self.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sendtonews.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sensic.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "servebom.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "servedby.flashtalking.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "serverbid.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "serverside4285.tagcommander.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "service.maxymiser.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "services.insurads.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "services.xg4ken.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "serving-sys.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "session.timecommerce.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sessioncam.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sf14g.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sg-config.sensic.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sharethis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sharethrough.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "show-f.mediav.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "shutterflycom.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "si.nuggad.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "siemens.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "siftscience.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "simage2.pubmatic.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "simplereach.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "simpli.fi": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "simplifi.partners.tremorhub.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sina.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sina.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sinoptik.ua": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "siteimproveanalytics.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sitelock.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sites.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "sitescout.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sjs.bizographics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "skimresources.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "skplanet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sl.pt": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "slashdotmedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "slckg-kqe2e.ads.tremorhub.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sleeknote.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sm.trb.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "smadex.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smart-traffik.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smartadserver.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "smartlock.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "smetrics.att.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smetrics.corus.ca": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smetrics.el-mundo.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smetrics.elsevier.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "smetrics.lww.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smetrics.mastercard.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smetrics.solarwinds.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smithsonian.museum": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smon.loc.gov": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "smrtb.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "snapchat.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "snssdk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "so.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "socdm.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "socialize.eu1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "socialize.us1.gigya.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "sociomantic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sogou.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sojern.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "solarwinds.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "solarwinds.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sonet.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sonobi.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sonycardmarketingandservices.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sonyglobal.d1.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "soundcloud.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "sp.analytics.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sp.auth.adobe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "sp0.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sp1cluster.cxense.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "spectate.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sphdigital.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sphereup.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "spiceworks.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "spl.zeotap.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "splinternews.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "spotx.tv": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "spotxchange.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "spreadsheets.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "springserve.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sprinklr.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "src.ebay-us.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "srv-2019-09-23-03.config.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-04.config.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-04.pixel.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-05.config.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-05.pixel.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-06.config.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-06.pixel.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-07.config.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-07.pixel.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv-2019-09-23-08.config.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srv.stackadapt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "srx.com.sg": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ssa.hgtv.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ssc-cms.33across.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ssc.33across.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ssl.google-analytics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ssl.logger.co.kr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sslwidget.criteo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ssp-sync.i-mobile.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ssp.ainads.ru": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ssum-sec.casalemedia.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ssum.casalemedia.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "st.dynamicyield.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "st.top100.ru": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "stack-sonar.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "stackadapt.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "stags.bluekai.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "stat.chinaso.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "statcounter.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "static-it.plista.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "static-ssl.mediav.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "static.clicktripz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "static.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "static.formstack.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "static.insider.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "static.mediav.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "static.parsely.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "static.quantcast.mgr.consensu.org": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "static.vilynx.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "staticworld.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "staticxx.facebook.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "stats.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "stats.ibt.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "stats.ps.stylight.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "stats3.unrulymedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "statse.webtrendslive.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "steelcentral.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "steelhousemedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "stickyadstv.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "stmg-prod.mirror.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "storygize.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "streamtheworld.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "stripe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "sts.eccmp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "stylight.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "summerhamster.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sumo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sundaysky.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "suning.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "supplyframe.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "survata.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "survey.g.doubleclick.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "swiftype.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "sydneyuni.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sydneyuni.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "symantec.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "symantec.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync-tm.everesttech.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.1rx.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.adkernel.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sync.alcmpn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.aralego.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sync.bfmio.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sync.colossusssp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sync.go.sonobi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.graph.bluecava.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sync.im-apps.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sync.intentiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.ligadx.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "sync.mathtag.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.rtk.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "sync.search.spotxchange.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.serverbid.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.smartadserver.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.srv.stackadapt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "sync.teads.tv": {
            "heuristicAction": "",
            "userAction": ""
        },
        "synchrobox.adswizz.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "synchroscript.deliveryengine.adswizz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "syndication.twitter.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "syr-piwik-prod.syr.edu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "syr.edu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "syuh.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "t-abi.hypers.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "t-x.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "t.contentsquare.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "t.myvisualiq.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "t.nc0.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "t.paypal.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "t.sf14g.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "t23.intelliad.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "taboola.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tag.1rx.io": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tag.adkernel.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tag.audience.acpm.fr": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tag.bounceexchange.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tag.mtrcs.samba.tv": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tag.navdmp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tag.placelocal.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tag.researchnow.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tag.simpli.fi": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tag.sp.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tag.yieldoptimizer.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tagcommander.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tagger.opecloud.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tagm.tchibo.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tags.bluekai.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tags.rd.linksynergy.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tags.srv.stackadapt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tags.t.tailtarget.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tags.tiqcdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tags.w55c.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tags.wdsvc.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tailtarget.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "talkgadget.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "tamgrt.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tanx.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "taobao.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tapad.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tapestry.tapad.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "targetspot.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tawk.to": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "taylorandfrancis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tchibo.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tcr.tynt.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "td.yieldify.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "teads.tv": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tealiumiq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "techtarget.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "techweb.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "teenvogue.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tercept.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "terminus.services": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "texasinstruments.evergage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tg.socdm.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "the-ozone-project.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "theadex.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "theamericannationalr.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "thebrighttag.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "theglobeandmail.ca": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "theguardian.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "theinventory.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "them.us": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "themarker.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "theonion.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "theroot.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "thetakeout.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "thrtle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "thunder.adnxs.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "thunderhead.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ti.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tianqi.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tianqistatic.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tij.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "timecommerce.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tinypass.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "tiqcdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tlx.3lift.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tm.bizspring.co.kr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tmbi.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tns-counter.ru": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "toast.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "token.rubiconproject.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tokyo.in.treasuredata.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "top100.rambler.ru": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "top100.ru": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tr.snapchat.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "tr.usergram.info": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trace.51jingying.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "track.adform.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "track.customer.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "track.eyeviewads.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "track.hubspot.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "track.securedvisit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "track2.trbo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tracker.mrpfd.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tracking.aimediagroup.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tracking.kdata.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tracking.leadlander.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tracking.m6r.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tracking.monsido.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tradedoubler.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tradingview.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trafficgate.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "translate.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "travelsmarter.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "traversedlp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trb.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "trbo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trc.taboola.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "treasuredata.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tredir.go.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "treg.hearstnp.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tremorhub.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "trends.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "tribalfusion.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tribl.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "trk.clinch.co": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trk.techtarget.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "trkapi.impact.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trkn.us": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "trumba.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "truoptik.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trus.brand-display.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trustarc.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "trustedmediabrands.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "trvl-px.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "try.abtasty.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tt-12842-2.seg.t.tailtarget.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tt.onthe.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "tunein-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "turn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "turner.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tvpixel.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "tvsquared.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "twimg.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "twitter.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "tynt.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "typekit.net": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "u.acuityplatform.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "u.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ubisoftinternational.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ubm.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ubmtech.d3.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "uc.se": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uciservice.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uconnect.tealiumiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "udc-neb.kampyle.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "udc.yahoo.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "udimg.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ugdturner.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uid.mavencoalition.io": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uid.mediacorp.sg": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uktc.ijento.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "undertone.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "unicc.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "union2.50bang.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "unitedparcelservice.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "universal.iperceptions.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "universityofnewsouth.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "unrulymedia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uon-mautic.cloud.contensis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "upi-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "uplynk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ups.inq.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "ups.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ups.xplosion.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "urbandictionary.store": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "urldefense.proofpoint.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "us-ads.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "us-east-1-decisionapi.lift.acquia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "us-u.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "us.ads.justpremium.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "us.tags.newscgp.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "usabilla.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "use.fontawesome.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "usergram.info": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "usermatch.krxd.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "userreport.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "uservoice.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "usocial.pro": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ustream.tv": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ut.ra.linksynergy.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "v.admaster.com.cn": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "va.tawk.to": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "validate.onecount.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vanityfair.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vdc.zoomph.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vdna.exelator.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "veinteractive.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "verify.snssdk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "verizon.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "verticalhealth.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vhb.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "viafoura.co": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "vid-io.springserve.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vid0377.d41.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "vid9430.d41.co": {
            "heuristicAction": "",
            "userAction": ""
        },
        "vidassets.terminus.services": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "video.adaptv.advertising.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "video.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "vidible.tv": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "vidstat.taboola.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "viglink.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "vilynx.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "vindicosuite.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "virt-tools.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "visitor-service.tealiumiq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "visitor-track.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "visualwebsiteoptimizer.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "vk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vmmpxl.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vmss.boldchat.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "vocento.d3.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "vogue.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "volvelle.tech": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "voxmedia.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "vpaid.pubmatic.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "vra.outbrain.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "vrbo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vrtzads.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vt.myvisualiq.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "vuture.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "vzew.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "w.cnzz.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "w.estat.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "w.usabilla.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "w55c.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "wa.sl.pt": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wal.wolfram.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wbtrk.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "wcfbc.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "wcs.naver.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "wdsvc.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "weather.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "web.hb.ad.cpe.dotomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "webex.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "webid.kakao.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "webmdcom.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "weborama.fr": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "webpush.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "webs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "webstats.ch.ch": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "webstatstagging.unicc.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "webterren.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "webtrekk.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "webtrendslive.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "webvisor.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "weibo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "weicaixun.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wellsfargobankna.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "welt.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "westservicesfindlaw.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "westservicesinc.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "westthomson.demdex.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "westthomsoncom.sc.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "widget.mia-chat.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "wired.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wishabi.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "wishpond.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wistia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wistia.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "withcubed.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wix.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wkxppshj-qx.global.ssl.fastly.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wmagazine.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wms-na.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "wnyc.org": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wolfram.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wolterskluwermedical.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "wordpress.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "wp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wrating.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ws.sessioncam.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "wsod.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wt-eu02.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wt-safetag.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "wt.alcmpn.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "wt.vhb.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.adobe.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.affirm.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.allure.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.architecturaldigest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.asadcdn.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.beian.gov.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.bing.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "www.bizographics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.bluehost.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.bonappetit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.buzzfeed.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.civicscience.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "www.cntraveler.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.dezeenjobs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.dianomi.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.epicurious.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.facebook.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "www.getinvolved.qld.gov.au": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.glamour.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.golfdigest.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.google-analytics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.google.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "www.googleadservices.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.gq.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.homeaway.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.huihui.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.i.matheranalytics.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.lennyletter.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.lightboxcdn.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.linkedin.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.medtargetsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.msgapp.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.newyorker.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.nokia.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.ojrq.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "www.opinionstage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pages02.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pages03.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pages04.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pages06.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pages07.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pages08.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.paypal.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "www.paypalobjects.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "www.philips.co.uk": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.pswec.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.qchannel03.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.qsstats.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.queryly.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.rnengage.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.sacbee.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.self.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.srx.com.sg": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.stack-sonar.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.statcounter.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.summerhamster.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.tamgrt.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.teenvogue.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.them.us": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.ti.com.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.tij.co.jp": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.tns-counter.ru": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.trvl-px.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.uc.se": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.uciservice.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.vilynx.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "www.vogue.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.vrbo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.wired.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.wishpond.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.wmagazine.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.youtube-nocookie.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.youvisit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www.zohomeetups.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www1.mpnrs.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "www6.smartadserver.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "wwwimages.adobe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "wwwimages2.adobe.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "wyndham.btttag.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "wyndhamhotelgroup.tt.omtrdc.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "x.bidswitch.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "x.mail.bonnier-subscriptions.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "xdevice.trafficgate.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "xfinity.inq.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "xg4ken.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "xinhuanet.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "xiti.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "xlisting.jp": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "xplosion.de": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "xs4all.net": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "xs4all.piwik.pro": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "xsdownload.adobe.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "xspadvertising.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "xxxlutz.de": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "y.one.impact-ad.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "y3.analytics.yahoo.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "yadro.ru": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "yads.yjtag.yahoo.co.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "yahoo.co.jp": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "yahoo.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "yandex.ru": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "yandex.ua": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "yastatic.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "yieldify.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "yieldlab.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "yieldlove-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "yieldoptimizer.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "yimg.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "yjtag.yahoo.co.jp": {
            "heuristicAction": "",
            "userAction": ""
        },
        "youtube-nocookie.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "youtube.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "youvisit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "yxsu5ufd2m.kameleoon.eu": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "z-na.amazon-adsystem.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "z.moatads.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "z2.cnzz.com": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "zdbb.net": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "zdwidget3-bs.sphereup.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zeddit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zedo.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zemanta.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zendesk.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zengenti.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zeotap.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zergnet.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zerohedge-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "zg-api.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zhaopin.cn": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ziffdavis-d.openx.net": {
            "heuristicAction": "",
            "userAction": ""
        },
        "ziffdavis.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "ziftsolutions.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zlongad.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zn0mtvfxokez0eitv-nlmenterprise.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn5aocakgjj2uagxj-nintendoofamerica.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn72km24lnwppaswx-emeraldgroup.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn7ngtyxwjbrjz6xb-cms.gov1.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn7whwrcrmbs9xwyd-nlmenterprise.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn8p1dph4rgqzwv0x-move.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn9yauo1hia5mptaj-sni.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn_42v6draxyafsjmv-homedepot.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn_55bdrev4af0c1yl-cbs.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn_5u81q8n4jdu5ls9-cbs.siteintercept.qualtrics.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zn_9nquvazst1xipkt-cbs.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zn_a9290jo7eb4diuz-mayoclinicsurveys.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "znbl8rufo7atiirtn-unitysoftware.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "znbmujw2vcljimxnp-mastercard.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "zneex9v5omnknmibj-seagatecx.siteintercept.qualtrics.com": {
            "heuristicAction": "cookieblock",
            "userAction": ""
        },
        "znsv.baidu.com": {
            "heuristicAction": "",
            "userAction": ""
        },
        "zoho.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zoho.com.au": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zoho.in": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zohomeetups.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zoomph.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zoomus.zendesk.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zorosrv.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zprk.io": {
            "heuristicAction": "block",
            "userAction": ""
        },
        "zynbit.com": {
            "heuristicAction": "allow",
            "userAction": ""
        },
        "zz.connextra.com": {
            "heuristicAction": "allow",
            "userAction": ""
        }
    },
    "snitch_map": {
        "01net.com": [
            "liberation.fr"
        ],
        "0914.global.ssl.fastly.net": [
            "thetimes.co.uk"
        ],
        "100widgets.com": [
            "informationweek.com"
        ],
        "15gifts.com": [
            "thetimes.co.uk"
        ],
        "1dmp.io": [
            "livejournal.com",
            "narod.ru"
        ],
        "1rx.io": [
            "msn.com",
            "tinyurl.com",
            "dailymotion.com"
        ],
        "247-inc.net": [
            "marriott.com"
        ],
        "247realmedia.com": [
            "bmj.com",
            "aappublications.org",
            "americanbar.org"
        ],
        "2o7.net": [
            "flickr.com",
            "cdc.gov",
            "prnewswire.com",
            "philips.com",
            "cancer.gov",
            "popsci.com",
            "logitech.com",
            "channelnewsasia.com",
            "fastcompany.com"
        ],
        "33across.com": [
            "dailymotion.com",
            "livescience.com",
            "pcmag.com"
        ],
        "360.cn": [
            "so.com"
        ],
        "360yield.com": [
            "thenextweb.com",
            "home.pl",
            "liberation.fr"
        ],
        "3gl.net": [
            "economist.com",
            "thoughtco.com",
            "lifewire.com"
        ],
        "3lift.com": [
            "issuu.com",
            "msn.com",
            "bloomberg.com"
        ],
        "4dsply.com": [
            "inquisitr.com"
        ],
        "50bang.org": [
            "2345.com"
        ],
        "51jingying.com": [
            "51job.com"
        ],
        "6sc.co": [
            "symantec.com",
            "box.com",
            "qualtrics.com"
        ],
        "71360.com": [
            "sina.com.cn"
        ],
        "aamsitecertifier.com": [
            "bizjournals.com",
            "post-gazette.com"
        ],
        "aaxads.com": [
            "reddit.com",
            "forbes.com",
            "seattletimes.com"
        ],
        "abmr.net": [
            "freetype.org"
        ],
        "abtasty.com": [
            "here.com",
            "leparisien.fr"
        ],
        "acpm.fr": [
            "lefigaro.fr",
            "liberation.fr",
            "leparisien.fr"
        ],
        "acquia.com": [
            "panasonic.com",
            "nasdaq.com",
            "amd.com"
        ],
        "acuityplatform.com": [
            "marriott.com",
            "hilton.com",
            "medscape.com"
        ],
        "ad-hatena.com": [
            "hatena.ne.jp"
        ],
        "ad-plus.cn": [
            "sohu.com"
        ],
        "ad-stir.com": [
            "sakura.ne.jp"
        ],
        "ad.gt": [
            "wired.com",
            "newyorker.com",
            "arstechnica.com"
        ],
        "adalliance.io": [
            "spiegel.de"
        ],
        "adalyser.com": [
            "talktalk.co.uk"
        ],
        "adapf.com": [
            "sakura.ne.jp"
        ],
        "adblade.com": [
            "grademiners.com"
        ],
        "adc-srv.net": [
            "autodesk.com"
        ],
        "addthis.com": [
            "who.int",
            "npr.org",
            "columbia.edu"
        ],
        "adentifi.com": [
            "hilton.com",
            "metmuseum.org",
            "spreaker.com"
        ],
        "adform.net": [
            "amazon.com",
            "sourceforge.net",
            "bloomberg.com"
        ],
        "adfox.ru": [
            "livejournal.com",
            "sputniknews.com",
            "liveinternet.ru"
        ],
        "adhigh.net": [
            "grademiners.com",
            "fordham.edu"
        ],
        "adingo.jp": [
            "rakuten.co.jp"
        ],
        "adition.com": [
            "spiegel.de",
            "t-online.de",
            "zeit.de"
        ],
        "adkernel.com": [
            "livescience.com",
            "techradar.com",
            "space.com"
        ],
        "admaster.com.cn": [
            "pconline.com.cn",
            "qianlong.com",
            "sina.cn"
        ],
        "admedo.com": [
            "theregister.co.uk"
        ],
        "adnxs.com": [
            "microsoft.com",
            "adobe.com",
            "amazon.com"
        ],
        "adobe.com": [
            "espn.com",
            "history.com",
            "nbc.com"
        ],
        "adobedtm.com": [
            "acs.org",
            "verisign.com",
            "variety.com"
        ],
        "adotmob.com": [
            "nypost.com"
        ],
        "adroll.com": [
            "sourceforge.net",
            "issuu.com",
            "dropcatch.com"
        ],
        "adrtx.net": [
            "messefrankfurt.com"
        ],
        "adscale.de": [
            "statista.com",
            "heise.de",
            "t-online.de"
        ],
        "adsrvr.org": [
            "amazon.com",
            "godaddy.com",
            "sourceforge.net"
        ],
        "adswizz.com": [
            "variety.com",
            "sky.com",
            "iheart.com"
        ],
        "adsymptotic.com": [
            "rakuten.co.jp",
            "upwork.com"
        ],
        "adtdp.com": [
            "rakuten.co.jp",
            "hatena.ne.jp",
            "goo.ne.jp"
        ],
        "adventori.com": [
            "messefrankfurt.com"
        ],
        "advertising.com": [
            "amazon.com",
            "yahoo.com",
            "sourceforge.net"
        ],
        "aetn.com": [
            "history.com",
            "biography.com"
        ],
        "aetnd.com": [
            "history.com"
        ],
        "affirm.com": [
            "motorola.com"
        ],
        "agilemeasure.com": [
            "hpe.com"
        ],
        "agkn.com": [
            "yahoo.com",
            "businessinsider.com",
            "npr.org"
        ],
        "aidata.io": [
            "livejournal.com"
        ],
        "aimediagroup.com": [
            "panasonic.com"
        ],
        "ainads.ru": [
            "fordham.edu"
        ],
        "airpr.com": [
            "mcafee.com"
        ],
        "aj1015.online": [
            "bbb.org"
        ],
        "ajax.googleapis.com": [
            "mercurynews.com",
            "denverpost.com",
            "ocregister.com"
        ],
        "akamaihd.net": [
            "foxbusiness.com"
        ],
        "akstat.io": [
            "xbox.com"
        ],
        "alcmpn.com": [
            "pcworld.com",
            "computerworld.com",
            "networkworld.com"
        ],
        "alexametrics.com": [
            "vice.com",
            "chinadaily.com.cn",
            "giphy.com"
        ],
        "aliapp.org": [
            "alibaba.com"
        ],
        "alibaba.com": [
            "alibabacloud.com"
        ],
        "alicdn.com": [
            "alibabacloud.com",
            "amap.com"
        ],
        "aliyun.com": [
            "alibabacloud.com"
        ],
        "allure.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "amazon-adsystem.com": [
            "amazon.com",
            "godaddy.com",
            "nytimes.com"
        ],
        "ameba.jp": [
            "ameblo.jp"
        ],
        "analytics-sm.com": [
            "monster.com",
            "gotomeeting.com"
        ],
        "and.co.uk": [
            "dailymail.co.uk"
        ],
        "answerscloud.com": [
            "worldbank.org",
            "uscis.gov",
            "nordstrom.com"
        ],
        "apester.com": [
            "variety.com",
            "rollingstone.com",
            "deadline.com"
        ],
        "apihotels.net": [
            "hotels.com"
        ],
        "app-us1.com": [
            "lse.ac.uk"
        ],
        "app.link": [
            "medium.com",
            "marriott.com",
            "buzzfeed.com"
        ],
        "appconsent.io": [
            "lefigaro.fr"
        ],
        "appdynamics.com": [
            "jstor.org",
            "webex.com"
        ],
        "appier.net": [
            "dothome.co.kr"
        ],
        "apple.com": [
            "msn.com",
            "wyndhamhotels.com"
        ],
        "aralego.com": [
            "space.com"
        ],
        "architecturaldigest.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "arcpublishing.com": [
            "washingtonpost.com"
        ],
        "art19.com": [
            "merriam-webster.com",
            "aljazeera.com"
        ],
        "asadcdn.com": [
            "welt.de",
            "bild.de"
        ],
        "associates-amazon.com": [
            "amazon.com",
            "amazon.co.uk",
            "amazon.de"
        ],
        "atdmt.com": [
            "facebook.com",
            "adobe.com",
            "xbox.com"
        ],
        "atgsvcs.com": [
            "oracle.com"
        ],
        "atp.io": [
            "aarp.org",
            "upwork.com"
        ],
        "att.com": [
            "yahoo.com"
        ],
        "att.net": [
            "att.com"
        ],
        "auth0.com": [
            "gulfnews.com"
        ],
        "autodesk.com": [
            "instructables.com"
        ],
        "autopilothq.com": [
            "livechatinc.com"
        ],
        "avclub.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "ayc0zsm69431gfebd.xyz": [
            "ajc.com"
        ],
        "azureedge.net": [
            "lww.com",
            "ajc.com",
            "tampabay.com"
        ],
        "b0e8.com": [
            "udel.edu",
            "vmware.com"
        ],
        "b1img.com": [
            "penguinrandomhouse.com"
        ],
        "baidu.com": [
            "sina.com.cn",
            "sohu.com",
            "miit.gov.cn"
        ],
        "baidustatic.com": [
            "sina.com.cn",
            "sohu.com"
        ],
        "bam-x.com": [
            "gq.com",
            "macys.com"
        ],
        "baynote.net": [
            "springer.com"
        ],
        "bazaarvoice.com": [
            "lenovo.com",
            "lg.com",
            "lww.com"
        ],
        "bbb.org": [
            "afternic.com"
        ],
        "bdg-analytics.appspot.com": [
            "bustle.com"
        ],
        "beemray.com": [
            "telegraph.co.uk"
        ],
        "beian.gov.cn": [
            "enorth.com.cn"
        ],
        "bellsouth.com": [
            "att.com"
        ],
        "beringmedia.com": [
            "adobe.com"
        ],
        "betweendigital.com": [
            "liveinternet.ru",
            "ria.ru",
            "tass.ru"
        ],
        "bfmio.com": [
            "livescience.com",
            "techradar.com",
            "space.com"
        ],
        "bfmtv.com": [
            "liberation.fr"
        ],
        "biddingx.com": [
            "sohu.com"
        ],
        "bidr.io": [
            "adobe.com",
            "forbes.com",
            "hp.com"
        ],
        "bidswitch.net": [
            "adobe.com",
            "amazon.com",
            "sourceforge.net"
        ],
        "bing.com": [
            "adobe.com",
            "godaddy.com",
            "cnn.com"
        ],
        "bizible.com": [
            "cloudflare.com",
            "shopify.com",
            "ibm.com"
        ],
        "bizibly.com": [
            "cloudflare.com",
            "shopify.com"
        ],
        "bizographics.com": [
            "surveymonkey.com",
            "nginx.com",
            "economist.com"
        ],
        "bizrate.com": [
            "people.com",
            "ew.com",
            "sourceforge.net",
            "marthastewart.com"
        ],
        "bizspring.co.kr": [
            "dothome.co.kr"
        ],
        "bizspring.net": [
            "dothome.co.kr"
        ],
        "bluecava.com": [
            "mailchimp.com",
            "pcworld.com",
            "computerworld.com"
        ],
        "blueconic.net": [
            "nationalgeographic.com",
            "sfgate.com",
            "chron.com"
        ],
        "bluehost.com": [
            "blogs.com"
        ],
        "bluekai.com": [
            "nytimes.com",
            "marketwatch.com",
            "nypost.com"
        ],
        "bnidx.com": [
            "bravenet.com",
            "jigsy.com"
        ],
        "bnmla.com": [
            "livescience.com",
            "techradar.com",
            "space.com"
        ],
        "boldchat.com": [
            "gotomeeting.com",
            "buydomains.com",
            "groupon.com"
        ],
        "bonappetit.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "bonnier-subscriptions.com": [
            "popsci.com"
        ],
        "boston.com": [
            "bostonglobe.com"
        ],
        "bostonglobemedia.com": [
            "boston.com"
        ],
        "bounceexchange.com": [
            "cnn.com",
            "time.com",
            "wired.com"
        ],
        "bouncex.net": [
            "cnn.com",
            "time.com"
        ],
        "brand-display.com": [
            "wyndhamhotels.com"
        ],
        "brealtime.com": [
            "timesofisrael.com",
            "zerohedge.com"
        ],
        "brightcove.com": [
            "siemens.com",
            "state.gov",
            "bmj.com",
            "billboard.com",
            "tableau.com"
        ],
        "briskpelican.io": [
            "typeform.com"
        ],
        "brsrvr.com": [
            "barnesandnoble.com",
            "shutterfly.com",
            "homedepot.com"
        ],
        "bttrack.com": [
            "adobe.com",
            "forbes.com",
            "hilton.com"
        ],
        "btttag.com": [
            "samsung.com",
            "marriott.com",
            "lenovo.com"
        ],
        "bunchbox.co": [
            "jimdo.com"
        ],
        "buzzfeed.com": [
            "buzzfeednews.com"
        ],
        "c212.net": [
            "prnewswire.com",
            "expedia.com"
        ],
        "c3tag.com": [
            "panasonic.com"
        ],
        "cadreon.com": [
            "economist.com"
        ],
        "calendarwiz.com": [
            "census.gov"
        ],
        "canon.com": [
            "global.canon"
        ],
        "capturehighered.net": [
            "ku.edu",
            "sc.edu"
        ],
        "casalemedia.com": [
            "adobe.com",
            "amazon.com",
            "theguardian.com"
        ],
        "castle.io": [
            "trello.com"
        ],
        "ccgateway.net": [
            "biography.com"
        ],
        "cdnwidget.com": [
            "time.com",
            "photoshelter.com"
        ],
        "cern.ch": [
            "home.cern"
        ],
        "cfzu.net": [
            "logitech.com"
        ],
        "ch.ch": [
            "admin.ch"
        ],
        "chartbeat.net": [
            "nytimes.com",
            "cnn.com",
            "forbes.com"
        ],
        "chinaso.com": [
            "weather.com.cn",
            "people.com.cn",
            "chinanews.com"
        ],
        "choozle.com": [
            "denverpost.com"
        ],
        "cintnetworks.com": [
            "espn.com",
            "disney.com",
            "starwars.com"
        ],
        "circularhub.com": [
            "baltimoresun.com",
            "nola.com",
            "stltoday.com"
        ],
        "cisco.com": [
            "webex.com"
        ],
        "civicscience.com": [
            "post-gazette.com",
            "knowyourmeme.com",
            "ancestry.com"
        ],
        "clearbrain.com": [
            "airbnb.com"
        ],
        "clickability.com": [
            "proquest.com"
        ],
        "clickagy.com": [
            "msn.com"
        ],
        "clickhole.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "clicktale.net": [
            "microsoft.com",
            "redhat.com",
            "symantec.com"
        ],
        "clicktripz.com": [
            "tripadvisor.com",
            "nypost.com",
            "mapquest.com"
        ],
        "clinch.co": [
            "sony.com"
        ],
        "clmbtech.com": [
            "indiatimes.com"
        ],
        "cloud-iq.com": [
            "newscientist.com"
        ],
        "cloudflare.com": [
            "sciencemag.org",
            "redhat.com",
            "uci.edu"
        ],
        "clrstm.com": [
            "adobe.com"
        ],
        "cluep.com": [
            "penguinrandomhouse.com"
        ],
        "cntraveler.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "cnzz.com": [
            "sina.com.cn",
            "chinadaily.com.cn",
            "tianqi.com"
        ],
        "cohesionapps.com": [
            "frontier.com",
            "bankrate.com"
        ],
        "collegenet.com": [
            "gmu.edu"
        ],
        "colossusssp.com": [
            "freep.com",
            "jsonline.com",
            "detroitnews.com"
        ],
        "commander1.com": [
            "ovh.com",
            "hotels.com",
            "ubisoft.com"
        ],
        "company-target.com": [
            "adobe.com",
            "ibm.com",
            "hp.com"
        ],
        "complex.com": [
            "cheezburger.com",
            "allmusic.com",
            "dailydot.com"
        ],
        "conac.cn": [
            "www.gov.cn",
            "mohurd.gov.cn"
        ],
        "condenastdigital.com": [
            "wired.com",
            "newyorker.com",
            "arstechnica.com"
        ],
        "connatix.com": [
            "accuweather.com",
            "business2community.com",
            "alternet.org"
        ],
        "connexity.net": [
            "sourceforge.net"
        ],
        "connextra.com": [
            "cbs.com"
        ],
        "consensu.org": [
            "independent.co.uk",
            "buzzfeed.com",
            "imgur.com",
            "ok.ru",
            "euronews.com"
        ],
        "const.website": [
            "narod.ru"
        ],
        "contensis.com": [
            "nottingham.ac.uk"
        ],
        "contentive.com": [
            "searchenginewatch.com"
        ],
        "contentsquare.net": [
            "lonelyplanet.com",
            "prestashop.com",
            "itv.com"
        ],
        "contextweb.com": [
            "sourceforge.net",
            "forbes.com",
            "theverge.com"
        ],
        "coremetrics.com": [
            "ibm.com"
        ],
        "corus.ca": [
            "globalnews.ca"
        ],
        "coxmediagroup.com": [
            "ajc.com"
        ],
        "cpx.to": [
            "techradar.com",
            "standard.co.uk",
            "popsci.com"
        ],
        "creative-serving.com": [
            "messefrankfurt.com"
        ],
        "creativecdn.com": [
            "tripadvisor.com"
        ],
        "criteo.com": [
            "dropbox.com",
            "telegraph.co.uk",
            "dailymail.co.uk"
        ],
        "crm4d.com": [
            "orange.fr"
        ],
        "crsspxl.com": [
            "sourceforge.net",
            "slashdot.org"
        ],
        "custhelp.com": [
            "mysql.com",
            "oracle.com"
        ],
        "customer.io": [
            "codecademy.com"
        ],
        "cxense.com": [
            "cbc.ca",
            "marketwatch.com",
            "euronews.com"
        ],
        "d1af033869koo7.cloudfront.net": [
            "marriott.com"
        ],
        "d1epsz32winqbo.cloudfront.net": [
            "startribune.com"
        ],
        "d1rv23qj5kas56.cloudfront.net": [
            "webnode.com"
        ],
        "d2-apps.net": [
            "yahoo.co.jp",
            "rakuten.co.jp",
            "asahi.com"
        ],
        "d2qrdklrsxowl2.cloudfront.net": [
            "tableau.com"
        ],
        "d2t77mnxyo7adj.cloudfront.net": [
            "trello.com"
        ],
        "d395dw5zk780j2.cloudfront.net": [
            "canada.com",
            "vancouversun.com",
            "financialpost.com"
        ],
        "d3kwtionx0p7im.cloudfront.net": [
            "wbur.org"
        ],
        "d41.co": [
            "hp.com",
            "intel.com",
            "microfocus.com"
        ],
        "d5nxst8fruw4z.cloudfront.net": [
            "alexa.com"
        ],
        "d9jj3mjthpub.cloudfront.net": [
            "people.com",
            "ew.com",
            "marthastewart.com"
        ],
        "dailymail.co.uk": [
            "metro.co.uk"
        ],
        "datamind.ru": [
            "livejournal.com"
        ],
        "daum.net": [
            "shutterstock.com"
        ],
        "dc-storm.com": [
            "alibabacloud.com",
            "nvidia.com",
            "coursera.org"
        ],
        "deadspin.com": [
            "kotaku.com"
        ],
        "demdex.net": [
            "microsoft.com",
            "adobe.com",
            "amazon.com"
        ],
        "deployads.com": [
            "tinyurl.com",
            "sciencedaily.com",
            "biography.com"
        ],
        "deqwas.net": [
            "rakuten.co.jp"
        ],
        "dezeenjobs.com": [
            "dezeen.com"
        ],
        "df-srv.de": [
            "welt.de",
            "sueddeutsche.de",
            "bild.de"
        ],
        "di-dtaectolog-us-prod-1.appspot.com": [
            "go.com",
            "disney.com",
            "starwars.com"
        ],
        "dianomi.com": [
            "businessinsider.com",
            "marketwatch.com",
            "businessinsider.com.au"
        ],
        "digitalfirstmedia.com": [
            "bostonherald.com"
        ],
        "digitru.st": [
            "dailymail.co.uk",
            "gizmodo.com",
            "sfgate.com"
        ],
        "disney.com": [
            "starwars.com"
        ],
        "distiltag.com": [
            "reuters.com"
        ],
        "districtm.io": [
            "forbes.com",
            "salon.com",
            "freepik.com"
        ],
        "dmxleo.com": [
            "dailymotion.com"
        ],
        "dotomi.com": [
            "adobe.com",
            "forbes.com",
            "dailymotion.com"
        ],
        "dotsub.com": [
            "aarp.org"
        ],
        "doubleclick.net": [
            "youtube.com",
            "linkedin.com",
            "microsoft.com"
        ],
        "dowjoneson.com": [
            "marketwatch.com"
        ],
        "dpmsrv.com": [
            "boston.com",
            "techtarget.com",
            "rd.com"
        ],
        "dynad.net": [
            "uol.com.br"
        ],
        "dynamicyield.com": [
            "cnbc.com",
            "barnesandnoble.com",
            "bild.de"
        ],
        "easydmp.net": [
            "orange.fr"
        ],
        "ebay-us.com": [
            "ebay.com",
            "ebay.co.uk",
            "ebay.de"
        ],
        "ebay.com": [
            "businessinsider.com.au"
        ],
        "ebis.ne.jp": [
            "exblog.jp"
        ],
        "eccmp.com": [
            "newegg.com"
        ],
        "edge-cdn.net": [
            "biomedcentral.com"
        ],
        "edigitalsurvey.com": [
            "bbc.com"
        ],
        "effectivemeasure.net": [
            "bbc.com",
            "gulfnews.com"
        ],
        "el-mundo.net": [
            "elmundo.es"
        ],
        "eloqua.com": [
            "intel.com",
            "siemens.com",
            "redhat.com"
        ],
        "elsevier.com": [
            "thelancet.com",
            "ssrn.com",
            "cell.com"
        ],
        "elsevierhealth.com": [
            "thelancet.com",
            "cell.com"
        ],
        "email-match.com": [
            "orange.fr"
        ],
        "emlgrid.com": [
            "home.pl"
        ],
        "emxdgt.com": [
            "wired.com",
            "theverge.com",
            "venturebeat.com"
        ],
        "engageclick.com": [
            "marriott.com"
        ],
        "entertainow.com": [
            "dailydot.com"
        ],
        "epicurious.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "equalstyle.com": [
            "hubpages.com"
        ],
        "essayprofit.com": [
            "grademiners.com",
            "expert-writers.net",
            "essay-company.com"
        ],
        "estat.com": [
            "over-blog.com",
            "canalblog.com"
        ],
        "everesttech.net": [
            "adobe.com",
            "amazon.com",
            "sourceforge.net"
        ],
        "evergage.com": [
            "ti.com"
        ],
        "everyaction.com": [
            "greenpeace.org",
            "ewg.org"
        ],
        "evise.com": [
            "thelancet.com",
            "cell.com"
        ],
        "evyy.net": [
            "office.com",
            "buydomains.com"
        ],
        "ew3.io": [
            "liberation.fr"
        ],
        "exactag.com": [
            "t-online.de"
        ],
        "excite.co.jp": [
            "exblog.jp"
        ],
        "exelator.com": [
            "amazon.com",
            "sourceforge.net",
            "soundcloud.com"
        ],
        "experianmarketingservices.digital": [
            "thesun.co.uk"
        ],
        "eyeota.net": [
            "sourceforge.net",
            "forbes.com",
            "npr.org"
        ],
        "eyereturn.com": [
            "thestar.com",
            "queensu.ca"
        ],
        "eyeviewads.com": [
            "nypost.com",
            "accuweather.com",
            "boingboing.net"
        ],
        "facebook.com": [
            "instagram.com",
            "adobe.com",
            "pinterest.com"
        ],
        "fairfax.com.au": [
            "smh.com.au",
            "theage.com.au"
        ],
        "fastfinch.co": [
            "livechatinc.com"
        ],
        "firebaselogging.googleapis.com": [
            "history.com"
        ],
        "firstimpression.io": [
            "jpost.com",
            "haaretz.com"
        ],
        "fivetran.com": [
            "wistia.com"
        ],
        "flashtalking.com": [
            "adobe.com",
            "msn.com",
            "samsung.com"
        ],
        "flickr.com": [
            "enable-javascript.com",
            "cia.gov",
            "gatech.edu",
            "colostate.edu"
        ],
        "flipboard.com": [
            "businessinsider.com",
            "venturebeat.com",
            "popsugar.com"
        ],
        "flyertown.ca": [
            "nationalpost.com",
            "globalnews.ca",
            "vancouversun.com"
        ],
        "focus.cn": [
            "sohu.com"
        ],
        "fontawesome.com": [
            "encyclopedia.com",
            "emerald.com",
            "inhabitat.com"
        ],
        "foresee.com": [
            "irs.gov",
            "theglobeandmail.com",
            "asu.edu"
        ],
        "formstack.com": [
            "in.gov"
        ],
        "fout.jp": [
            "economist.com"
        ],
        "fox.com": [
            "nationalgeographic.com"
        ],
        "foxycart.com": [
            "brookings.edu"
        ],
        "freshrelevance.com": [
            "discovermagazine.com"
        ],
        "frosmo.com": [
            "helsinki.fi"
        ],
        "fwmrm.net": [
            "foodnetwork.com",
            "nbc.com",
            "channel4.com"
        ],
        "gedidigital.it": [
            "repubblica.it"
        ],
        "geetest.com": [
            "axs.com",
            "chronicle.com"
        ],
        "gemius.pl": [
            "sapo.pt",
            "ria.ru",
            "www.krakow.pl"
        ],
        "getclicky.com": [
            "newatlas.com",
            "csiro.au"
        ],
        "getdrip.com": [
            "dreamhost.com"
        ],
        "getinvolved.qld.gov.au": [
            "www.qld.gov.au"
        ],
        "getsmartcontent.com": [
            "pcworld.com",
            "computerworld.com",
            "networkworld.com"
        ],
        "gigya.com": [
            "independent.co.uk",
            "cnbc.com",
            "abc.net.au",
            "ctvnews.ca",
            "softonic.com",
            "nfl.com",
            "post-gazette.com",
            "uefa.com",
            "independent.ie",
            "syfy.com",
            "rtve.es"
        ],
        "giphy.com": [
            "urbandictionary.com"
        ],
        "gizmodo.com": [
            "kotaku.com"
        ],
        "glamour.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "gleam.io": [
            "businessinsider.com.au"
        ],
        "globalwebindex.net": [
            "reuters.com",
            "people.com",
            "ew.com"
        ],
        "gmossp-sp.jp": [
            "xrea.com",
            "goo.ne.jp"
        ],
        "go.com": [
            "starwars.com",
            "marvel.com"
        ],
        "golfdigest.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "gomoxie.solutions": [
            "norton.com"
        ],
        "goo.ne.jp": [
            "ocn.ne.jp"
        ],
        "google-analytics.com": [
            "twitter.com",
            "linkedin.com",
            "google.com"
        ],
        "google.com": [
            "linkedin.com",
            "googletagmanager.com",
            "pinterest.com"
        ],
        "googleadservices.com": [
            "matterport.com"
        ],
        "gq.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "gridsumdissector.com": [
            "www.gov.cn",
            "dzwww.com"
        ],
        "groupondata.com": [
            "groupon.com"
        ],
        "growingio.com": [
            "focus.cn"
        ],
        "gtags.net": [
            "ctrip.com",
            "sina.com.cn",
            "sina.cn"
        ],
        "gumgum.com": [
            "dailymotion.com",
            "thenextweb.com",
            "liveleak.com"
        ],
        "gwallet.com": [
            "adobe.com",
            "ox.ac.uk",
            "smithsonianmag.com"
        ],
        "gwmtracking.com": [
            "proofpoint.com",
            "norton.com"
        ],
        "haaretz.co.il": [
            "haaretz.com"
        ],
        "hatena.ne.jp": [
            "hatenablog.com",
            "cronolog.org"
        ],
        "heapanalytics.com": [
            "merriam-webster.com",
            "crunchbase.com",
            "aclu.org"
        ],
        "hearst3pcc.com": [
            "sfgate.com",
            "chron.com"
        ],
        "hearstnp.com": [
            "sfgate.com",
            "chron.com",
            "sfchronicle.com"
        ],
        "hexagon-analytics.com": [
            "flickr.com",
            "kickstarter.com",
            "scribd.com"
        ],
        "hgtv.com": [
            "discovery.com",
            "foodnetwork.com"
        ],
        "hive.co": [
            "complex.com"
        ],
        "homeaway.com": [
            "hotels.com"
        ],
        "hubspot.com": [
            "plesk.com",
            "disqus.com",
            "indiegogo.com"
        ],
        "huihui.cn": [
            "youdao.com"
        ],
        "hushly.com": [
            "matterport.com"
        ],
        "hypers.com.cn": [
            "qianlong.com"
        ],
        "i-mobile.co.jp": [
            "rakuten.co.jp"
        ],
        "i.ua": [
            "kharkov.ua"
        ],
        "iadvize.com": [
            "prestashop.com"
        ],
        "ibclick.stream": [
            "webmd.com",
            "medscape.com",
            "medicinenet.com"
        ],
        "ibillboard.com": [
            "home.pl"
        ],
        "ibt.com": [
            "ibtimes.co.uk"
        ],
        "ictr.cn": [
            "sina.com.cn"
        ],
        "id5-sync.com": [
            "dailymail.co.uk",
            "thesun.co.uk",
            "thetimes.co.uk"
        ],
        "idio.co": [
            "ibm.com",
            "intel.com",
            "adage.com"
        ],
        "iesnare.com": [
            "gopro.com"
        ],
        "ign.com": [
            "videojs.com"
        ],
        "igodigital.com": [
            "hp.com",
            "smh.com.au",
            "theage.com.au"
        ],
        "iheart.com": [
            "variety.com"
        ],
        "ijento.com": [
            "searchenginewatch.com"
        ],
        "im-apps.net": [
            "economist.com",
            "biglobe.ne.jp",
            "nifty.com"
        ],
        "imgur.com": [
            "stackexchange.com"
        ],
        "impact-ad.jp": [
            "economist.com",
            "yahoo.co.jp",
            "hatena.ne.jp"
        ],
        "impact.com": [
            "bestbuy.com"
        ],
        "imrworldwide.com": [
            "theguardian.com",
            "cnn.com",
            "bbc.com"
        ],
        "inc.com": [
            "fastcompany.com"
        ],
        "increasingly.co": [
            "motorola.com"
        ],
        "infinity-tracking.net": [
            "telegraph.co.uk",
            "gartner.com"
        ],
        "infolinks.com": [
            "inquisitr.com"
        ],
        "ingage.tech": [
            "inquisitr.com"
        ],
        "inq.com": [
            "shutterstock.com",
            "att.com",
            "ups.com"
        ],
        "insider.com": [
            "businessinsider.com.au"
        ],
        "insightexpressai.com": [
            "unsplash.com",
            "ign.com"
        ],
        "instagram.com": [
            "illinois.edu",
            "cam.ac.uk",
            "nypost.com"
        ],
        "insticator.com": [
            "washingtonexaminer.com",
            "inquisitr.com"
        ],
        "instinctiveads.com": [
            "variety.com",
            "rollingstone.com",
            "indiewire.com"
        ],
        "insurads.com": [
            "skyrock.com"
        ],
        "intelliad.de": [
            "t-online.de"
        ],
        "intellimize.co": [
            "tableau.com"
        ],
        "intellitxt.com": [
            "xda-developers.com"
        ],
        "intentiq.com": [
            "slashdot.org",
            "pcworld.com",
            "computerworld.com"
        ],
        "intentmedia.net": [
            "tripadvisor.com",
            "over-blog.com",
            "canalblog.com"
        ],
        "internetbrands.com": [
            "inhabitat.com"
        ],
        "investis.com": [
            "ge.com"
        ],
        "invoc.us": [
            "prweb.com"
        ],
        "ioam.de": [
            "spiegel.de",
            "xing.com",
            "welt.de"
        ],
        "ip-label.net": [
            "rtve.es"
        ],
        "iperceptions.com": [
            "adobe.com",
            "nasa.gov",
            "sky.com"
        ],
        "ipredictive.com": [
            "hulu.com"
        ],
        "irs01.com": [
            "thepaper.cn"
        ],
        "iteratehq.com": [
            "nytimes.com",
            "cnbc.com"
        ],
        "ixiaa.com": [
            "aaa.com"
        ],
        "izooto.com": [
            "indianexpress.com",
            "thinkprogress.org"
        ],
        "jalopnik.com": [
            "kotaku.com"
        ],
        "janrainsso.com": [
            "canada.com",
            "vancouversun.com",
            "financialpost.com"
        ],
        "jd.com": [
            "sohu.com"
        ],
        "jezebel.com": [
            "kotaku.com"
        ],
        "jrs5.com": [
            "consumerreports.org",
            "newegg.com"
        ],
        "jscache.com": [
            "tripadvisor.com"
        ],
        "jsrdn.com": [
            "thestar.com",
            "dallasnews.com",
            "nationalpost.com"
        ],
        "justpremium.com": [
            "salon.com",
            "techradar.com",
            "upi.com"
        ],
        "justuno.com": [
            "searchengineland.com",
            "observer.com"
        ],
        "jwplatform.com": [
            "rd.com",
            "timesofisrael.com",
            "nationalreview.com"
        ],
        "jwpltx.com": [
            "gizmodo.com",
            "inc.com",
            "variety.com",
            "mentalfloss.com"
        ],
        "kaipuyun.cn": [
            "mohurd.gov.cn"
        ],
        "kakao.com": [
            "daum.net"
        ],
        "kameleoon.eu": [
            "welt.de",
            "heise.de"
        ],
        "kampyle.com": [
            "frontier.com"
        ],
        "kanade-ad.net": [
            "rakuten.co.jp"
        ],
        "kargo.com": [
            "dailymail.co.uk",
            "xfinity.com"
        ],
        "kdata.fr": [
            "orange.fr"
        ],
        "kelkoogroup.net": [
            "lefigaro.fr"
        ],
        "keywee.co": [
            "nationalgeographic.com",
            "newyorker.com",
            "chicagotribune.com"
        ],
        "kinja.com": [
            "kotaku.com",
            "theonion.com"
        ],
        "klangoo.com": [
            "nationalpost.com",
            "financialpost.com"
        ],
        "knet.cn": [
            "eastday.com",
            "dayoo.com"
        ],
        "koddi.com": [
            "hilton.com",
            "wyndhamhotels.com"
        ],
        "kotaku.com": [
            "gizmodo.com"
        ],
        "krxd.net": [
            "theguardian.com",
            "cnn.com",
            "dropbox.com"
        ],
        "leadboxer.com": [
            "trendmicro.com"
        ],
        "leadintel.io": [
            "nme.com"
        ],
        "leadlander.com": [
            "panasonic.com",
            "squareup.com"
        ],
        "leju.com": [
            "sina.com.cn",
            "sina.cn"
        ],
        "lennyletter.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "lfstmedia.com": [
            "dailystar.co.uk"
        ],
        "liadm.com": [
            "adobe.com",
            "bloomberg.com",
            "economist.com"
        ],
        "liberapay.com": [
            "mariadb.org"
        ],
        "libsyn.com": [
            "washingtontimes.com"
        ],
        "lifehacker.com": [
            "kotaku.com"
        ],
        "ligadx.com": [
            "home.pl"
        ],
        "lightboxcdn.com": [
            "cnet.com",
            "zdnet.com",
            "gizmodo.com"
        ],
        "lijit.com": [
            "sourceforge.net",
            "express.co.uk",
            "matterport.com"
        ],
        "linkedin.com": [
            "adobe.com",
            "bitly.com",
            "godaddy.com"
        ],
        "linksynergy.com": [
            "alibabacloud.com",
            "pcworld.com",
            "nvidia.com"
        ],
        "list-manage.com": [
            "japantimes.co.jp"
        ],
        "listrakbi.com": [
            "denverpost.com"
        ],
        "literatumonline.com": [
            "thelancet.com",
            "cell.com"
        ],
        "livechatinc.com": [
            "ning.com",
            "wpengine.com",
            "templatemonster.com"
        ],
        "livejournal.net": [
            "livejournal.com"
        ],
        "liveperson.net": [
            "virginmedia.com",
            "microsoft.com",
            "talktalk.co.uk"
        ],
        "loc.gov": [
            "copyright.gov"
        ],
        "lockerdome.com": [
            "searchenginejournal.com",
            "psychcentral.com",
            "zerohedge.com"
        ],
        "logger.co.kr": [
            "dothome.co.kr"
        ],
        "loginradius.com": [
            "cbc.ca",
            "arte.tv"
        ],
        "logly.co.jp": [
            "nifty.com",
            "goo.ne.jp"
        ],
        "lookbookhq.com": [
            "cvent.com",
            "comodo.com"
        ],
        "loopme.me": [
            "nypost.com"
        ],
        "lp4.io": [
            "rt.com",
            "sueddeutsche.de"
        ],
        "lrcontent.com": [
            "cbc.ca",
            "arte.tv"
        ],
        "lwcal.com": [
            "rice.edu"
        ],
        "lww.com": [
            "ahajournals.org"
        ],
        "lytics.io": [
            "economist.com",
            "healthline.com",
            "adweek.com"
        ],
        "m6r.eu": [
            "statista.com",
            "t-online.de"
        ],
        "macromill.com": [
            "yahoo.co.jp",
            "asahi.com"
        ],
        "mail.ru": [
            "vk.com",
            "livejournal.com",
            "narod.ru"
        ],
        "mailchimp.com": [
            "boingboing.net",
            "japantimes.co.jp",
            "fas.org",
            "businessinsider.com.au"
        ],
        "mailmunch.co": [
            "euronews.com"
        ],
        "mantisadnetwork.com": [
            "salon.com",
            "encyclopedia.com"
        ],
        "mapixl.com": [
            "coursera.org"
        ],
        "marketlinc.com": [
            "teamviewer.com",
            "kaspersky.com",
            "eset.com"
        ],
        "marketo.com": [
            "bitly.com",
            "ieee.org",
            "bizjournals.com"
        ],
        "mastercard.com": [
            "mastercard.us"
        ],
        "matheranalytics.com": [
            "chicagotribune.com",
            "nypost.com",
            "theglobeandmail.com"
        ],
        "mathtag.com": [
            "microsoft.com",
            "sourceforge.net",
            "theguardian.com"
        ],
        "mavencoalition.io": [
            "hubpages.com",
            "biography.com"
        ],
        "mavrck.co": [
            "gopro.com"
        ],
        "maxymiser.net": [
            "orange.fr",
            "logitech.com",
            "hulu.com"
        ],
        "mcclatchy.com": [
            "miamiherald.com"
        ],
        "media.net": [
            "nytimes.com",
            "forbes.com",
            "msn.com"
        ],
        "media6degrees.com": [
            "bloomberg.com",
            "addthis.com",
            "hubspot.com"
        ],
        "mediacorp.sg": [
            "channelnewsasia.com"
        ],
        "mediaforge.com": [
            "consumerreports.org",
            "newegg.com"
        ],
        "mediaplex.com": [
            "dell.com",
            "lastpass.com",
            "ryanair.com"
        ],
        "mediarithmics.com": [
            "liberation.fr"
        ],
        "mediav.com": [
            "so.com",
            "ctrip.com",
            "163.com"
        ],
        "mediawallahscript.com": [
            "adobe.com",
            "sourceforge.net"
        ],
        "medtargetsystem.com": [
            "wired.com",
            "newyorker.com",
            "arstechnica.com"
        ],
        "metadsp.co.uk": [
            "nypost.com",
            "boingboing.net"
        ],
        "mfadsrvr.com": [
            "forbes.com",
            "thehill.com"
        ],
        "mg2connext.com": [
            "newsday.com"
        ],
        "mia-chat.com": [
            "grademiners.com",
            "expert-writers.net",
            "payforessay.net"
        ],
        "miaozhen.com": [
            "pconline.com.cn"
        ],
        "micpn.com": [
            "hilton.com",
            "barnesandnoble.com",
            "lenovo.com"
        ],
        "microad.jp": [
            "sakura.ne.jp",
            "rakuten.co.jp",
            "hatena.ne.jp"
        ],
        "microsoft.com": [
            "encyclopedia.com"
        ],
        "mirror.co.uk": [
            "dailystar.co.uk"
        ],
        "mktoresp.com": [
            "searchenginewatch.com"
        ],
        "ml314.com": [
            "sourceforge.net",
            "forbes.com",
            "businessinsider.com"
        ],
        "mmstat.com": [
            "alibabacloud.com",
            "sina.com.cn",
            "tianqi.com"
        ],
        "moatads.com": [
            "forbes.com",
            "bloomberg.com",
            "hollywoodreporter.com"
        ],
        "monetate.net": [
            "nationalgeographic.com",
            "marriott.com",
            "ticketmaster.com"
        ],
        "monsido.com": [
            "nsw.gov.au",
            "uga.edu",
            "utk.edu"
        ],
        "mookie1.com": [
            "photobucket.com",
            "uci.edu",
            "thetimes.co.uk"
        ],
        "mos.ru": [
            "livejournal.com"
        ],
        "motusmedia.co": [
            "fordham.edu"
        ],
        "mouseflow.com": [
            "nintendo.com"
        ],
        "mpnrs.com": [
            "heise.de"
        ],
        "mppglobal.com": [
            "thestar.com"
        ],
        "mrpfd.com": [
            "symantec.com",
            "hpe.com"
        ],
        "msgapp.com": [
            "post-gazette.com"
        ],
        "msn.com": [
            "wsj.com",
            "marketwatch.com"
        ],
        "mtvnservices.com": [
            "mtv.com",
            "cc.com"
        ],
        "musthird.com": [
            "airbnb.com"
        ],
        "mynativeplatform.com": [
            "thehill.com",
            "home.pl"
        ],
        "myvisualiq.net": [
            "soundcloud.com",
            "paypal.com",
            "spotify.com"
        ],
        "nanorep.co": [
            "lastpass.com"
        ],
        "narrative.io": [
            "slashdot.org"
        ],
        "nativendo.de": [
            "t-online.de"
        ],
        "navdmp.com": [
            "globo.com",
            "abril.com.br"
        ],
        "naver.com": [
            "unity.com",
            "dothome.co.kr",
            "cafe24.com"
        ],
        "naver.jp": [
            "line.me"
        ],
        "nba.net": [
            "nba.com"
        ],
        "nbc.co": [
            "nbc.com"
        ],
        "nbcuni.com": [
            "cnbc.com",
            "nbcnews.com",
            "today.com"
        ],
        "nc0.co": [
            "bestbuy.com"
        ],
        "neighbourly.co.nz": [
            "stuff.co.nz"
        ],
        "netmng.com": [
            "lenovo.com",
            "wyndhamhotels.com",
            "lowes.com"
        ],
        "netsalesmedia.pl": [
            "home.pl"
        ],
        "news.cn": [
            "xinhuanet.com"
        ],
        "newscgp.com": [
            "marketwatch.com",
            "nypost.com",
            "thesun.co.uk"
        ],
        "newsmax.com": [
            "thehill.com"
        ],
        "newsmaxfeednetwork.com": [
            "thehill.com"
        ],
        "newyorker.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "ngpvan.com": [
            "greenpeace.org",
            "ewg.org"
        ],
        "nicequest.com": [
            "elpais.com"
        ],
        "nine.com.au": [
            "smh.com.au",
            "theage.com.au",
            "businessinsider.com.au"
        ],
        "nokia.com": [
            "bell-labs.com"
        ],
        "nr-data.net": [
            "sourceforge.net",
            "wsj.com",
            "washingtonpost.com"
        ],
        "nscontext.eu": [
            "home.pl"
        ],
        "nuggad.net": [
            "t-online.de",
            "skyrock.com",
            "liberation.fr"
        ],
        "nxtck.com": [
            "consumerreports.org",
            "newegg.com"
        ],
        "o2online.de": [
            "messefrankfurt.com"
        ],
        "ojrq.net": [
            "lenovo.com",
            "office.com",
            "logitech.com"
        ],
        "ok.ru": [
            "narod.ru"
        ],
        "okt.to": [
            "anu.edu.au",
            "cvent.com",
            "sdsu.edu"
        ],
        "olark.com": [
            "texas.gov",
            "matterport.com"
        ],
        "olympicchannel.com": [
            "olympic.org"
        ],
        "omkt.co": [
            "prweb.com"
        ],
        "omnitagjs.com": [
            "mirror.co.uk",
            "liberation.fr",
            "gsmarena.com"
        ],
        "omny.fm": [
            "spiegel.de",
            "haaretz.com",
            "geekwire.com"
        ],
        "omtrdc.net": [
            "adobe.com",
            "virginmedia.com",
            "telegraph.co.uk"
        ],
        "onecount.net": [
            "foreignpolicy.com"
        ],
        "onsugar.com": [
            "popsugar.com"
        ],
        "onthe.io": [
            "indiatimes.com",
            "express.co.uk",
            "tass.ru"
        ],
        "ooyala.com": [
            "bizjournals.com",
            "channelnewsasia.com"
        ],
        "opecloud.com": [
            "scmp.com"
        ],
        "opentracker.net": [
            "trendmicro.com"
        ],
        "openx.net": [
            "adobe.com",
            "amazon.com",
            "nytimes.com"
        ],
        "opinionstage.com": [
            "nobelprize.org"
        ],
        "optaim.com": [
            "sohu.com"
        ],
        "optimahub.com": [
            "aaa.com"
        ],
        "optimix.cn": [
            "qianlong.com",
            "conac.cn"
        ],
        "optimizely.com": [
            "bbc.com",
            "microsoft.com",
            "cbsnews.com"
        ],
        "oraclecloud.com": [
            "java.com"
        ],
        "orangeads.fr": [
            "orange.fr"
        ],
        "otto.de": [
            "t-online.de"
        ],
        "outbrain.com": [
            "cnn.com",
            "issuu.com",
            "msn.com"
        ],
        "owneriq.net": [
            "barnesandnoble.com",
            "hp.com",
            "kaspersky.com"
        ],
        "paddle.com": [
            "snapwidget.com"
        ],
        "pages01.net": [
            "osu.edu"
        ],
        "pages02.net": [
            "prestashop.com"
        ],
        "pages03.net": [
            "smithsonianmag.com"
        ],
        "pages04.net": [
            "scientificamerican.com",
            "proquest.com"
        ],
        "pages06.net": [
            "ibtimes.co.uk"
        ],
        "pages07.net": [
            "asahi.com"
        ],
        "pages08.net": [
            "military.com"
        ],
        "pagesense.io": [
            "bmj.com",
            "zoho.com"
        ],
        "pardot.com": [
            "tandfonline.com",
            "prezi.com",
            "microfocus.com"
        ],
        "parsely.com": [
            "bloomberg.com",
            "huffpost.com",
            "time.com"
        ],
        "paypal.com": [
            "greenpeace.org",
            "paypal.me",
            "doxygen.nl",
            "iubenda.com"
        ],
        "paypalobjects.com": [
            "paypal.com",
            "paypal.me",
            "freetype.org"
        ],
        "pbbl.co": [
            "shutterstock.com",
            "frontier.com",
            "fool.com"
        ],
        "pendo.io": [
            "crunchbase.com"
        ],
        "perimeterx.net": [
            "bloomberg.com",
            "udemy.com",
            "crunchbase.com"
        ],
        "petametrics.com": [
            "telegraph.co.uk",
            "scmp.com",
            "thestar.com"
        ],
        "philips.co.uk": [
            "philips.com"
        ],
        "photobucket.com": [
            "tinypic.com"
        ],
        "pinterest.com": [
            "godaddy.com",
            "issuu.com",
            "wix.com"
        ],
        "pitchfork.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "piwik.pro": [
            "xs4all.nl"
        ],
        "placelocal.com": [
            "cbs.com",
            "gopro.com"
        ],
        "plista.com": [
            "faz.net",
            "canada.com",
            "libero.it"
        ],
        "po.st": [
            "smithsonianmag.com",
            "businessinsider.com.au",
            "business2community.com"
        ],
        "postrelease.com": [
            "reuters.com",
            "time.com",
            "independent.co.uk"
        ],
        "powerlinks.com": [
            "thehill.com",
            "space.com",
            "businessinsider.com.au"
        ],
        "prcdn.co": [
            "pressreader.com"
        ],
        "pressboard.ca": [
            "thestar.com"
        ],
        "prfct.co": [
            "theglobeandmail.com",
            "smugmug.com",
            "lifehack.org"
        ],
        "pro-market.net": [
            "sourceforge.net",
            "slashdot.org",
            "matterport.com"
        ],
        "prod-mng-proxy-connext.azurewebsites.net": [
            "mercurynews.com",
            "denverpost.com",
            "ocregister.com"
        ],
        "proofpoint.com": [
            "gulfnews.com"
        ],
        "proper.io": [
            "salon.com",
            "encyclopedia.com",
            "alternet.org"
        ],
        "provenpixel.com": [
            "shopify.com"
        ],
        "providesupport.com": [
            "jigsy.com"
        ],
        "pswec.com": [
            "medscape.com"
        ],
        "pub.network": [
            "snopes.com",
            "boingboing.net",
            "coindesk.com"
        ],
        "pubmatic.com": [
            "adobe.com",
            "amazon.com",
            "theguardian.com"
        ],
        "purch.com": [
            "tomshardware.com"
        ],
        "purechat.com": [
            "byu.edu"
        ],
        "pxi.pub": [
            "mentalfloss.com"
        ],
        "pymx5.com": [
            "nationalpost.com",
            "canada.com",
            "vancouversun.com"
        ],
        "qchannel03.cn": [
            "sina.cn"
        ],
        "qhupdate.com": [
            "so.com"
        ],
        "qnsr.com": [
            "serverwatch.com"
        ],
        "qq.com": [
            "dzwww.com",
            "url.cn",
            "focus.cn"
        ],
        "qsstats.com": [
            "serverwatch.com"
        ],
        "qualia.id": [
            "pcworld.com"
        ],
        "qualtrics.com": [
            "autodesk.com",
            "techrepublic.com",
            "homedepot.com",
            "medlineplus.gov",
            "cbs.com",
            "mastercard.us",
            "nintendo.com",
            "clinicaltrials.gov",
            "unity.com",
            "cnet.com",
            "realtor.com",
            "hgtv.com",
            "emerald.com",
            "seagate.com",
            "mayoclinic.org",
            "cms.gov"
        ],
        "quantserve.com": [
            "reddit.com",
            "soundcloud.com",
            "forbes.com"
        ],
        "quantummetric.com": [
            "lenovo.com",
            "xfinity.com"
        ],
        "queryly.com": [
            "fastcompany.com",
            "inc.com",
            "post-gazette.com"
        ],
        "quora.com": [
            "weebly.com",
            "bloomberg.com",
            "telegraph.co.uk"
        ],
        "quyaoya.com": [
            "sina.com.cn"
        ],
        "radiotime.com": [
            "tunein.com"
        ],
        "rakuten.co.jp": [
            "rakuten.com"
        ],
        "rambler.ru": [
            "livejournal.com",
            "ria.ru",
            "kharkov.ua"
        ],
        "randomhouse.com": [
            "penguinrandomhouse.com"
        ],
        "reachmax.cn": [
            "qianlong.com"
        ],
        "reactful.com": [
            "proofpoint.com"
        ],
        "reddit.com": [
            "webmd.com",
            "namecheap.com",
            "shutterstock.com",
            "cuny.edu"
        ],
        "redlink.com": [
            "jamanetwork.com"
        ],
        "redventures.io": [
            "bankrate.com"
        ],
        "regmedia.co.uk": [
            "theregister.co.uk"
        ],
        "relap.io": [
            "ria.ru"
        ],
        "report.download": [
            "business2community.com"
        ],
        "researchintel.com": [
            "intel.com"
        ],
        "researchnow.com": [
            "go.com",
            "disney.com",
            "starwars.com"
        ],
        "reson8.com": [
            "sfgate.com",
            "chron.com",
            "startribune.com"
        ],
        "responsetap.com": [
            "manchester.ac.uk"
        ],
        "revjet.com": [
            "businessinsider.com",
            "homedepot.com",
            "bankrate.com"
        ],
        "rezync.com": [
            "economist.com"
        ],
        "rfihub.com": [
            "forbes.com",
            "npr.org",
            "economist.com"
        ],
        "ria.ru": [
            "sputniknews.com"
        ],
        "richaudience.com": [
            "elpais.com"
        ],
        "richrelevance.com": [
            "hbr.org"
        ],
        "rightnowtech.com": [
            "oracle.com"
        ],
        "rkdms.com": [
            "adobe.com",
            "cnn.com",
            "washingtonpost.com"
        ],
        "rlcdn.com": [
            "adobe.com",
            "godaddy.com",
            "msn.com"
        ],
        "rnengage.com": [
            "oracle.com",
            "rightnow.com"
        ],
        "roomkey.com": [
            "hilton.com"
        ],
        "roymorgan.com": [
            "unsw.edu.au"
        ],
        "rtk.io": [
            "dailymotion.com",
            "startribune.com",
            "post-gazette.com"
        ],
        "rtmark.net": [
            "4shared.com"
        ],
        "rubiconproject.com": [
            "adobe.com",
            "amazon.com",
            "nytimes.com"
        ],
        "rutarget.ru": [
            "livejournal.com"
        ],
        "rvty.net": [
            "heise.de"
        ],
        "s3.amazonaws.com": [
            "variety.com",
            "rollingstone.com",
            "deadline.com"
        ],
        "sacbee.com": [
            "kansascity.com"
        ],
        "salecycle.com": [
            "talktalk.co.uk"
        ],
        "salesforceliveagent.com": [
            "marriott.com",
            "constantcontact.com",
            "teamviewer.com"
        ],
        "salesloft.com": [
            "wpengine.com",
            "techtarget.com",
            "upwork.com"
        ],
        "salesmanago.pl": [
            "home.pl"
        ],
        "samba.tv": [
            "theverge.com",
            "gizmodo.com",
            "vox.com"
        ],
        "sbc.com": [
            "att.com"
        ],
        "scarabresearch.com": [
            "tate.org.uk"
        ],
        "scholarlyiq.com": [
            "oup.com"
        ],
        "sciencedirect.com": [
            "thelancet.com",
            "cell.com"
        ],
        "scorecardresearch.com": [
            "linkedin.com",
            "yahoo.com",
            "tumblr.com"
        ],
        "scribblelive.com": [
            "cbslocal.com",
            "euronews.com",
            "startribune.com"
        ],
        "seaofads.com": [
            "washingtonexaminer.com"
        ],
        "securedvisit.com": [
            "cafepress.com",
            "tesla.com"
        ],
        "selectablemedia.com": [
            "people.com",
            "ew.com",
            "allrecipes.com"
        ],
        "self.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "sendtonews.com": [
            "sfgate.com",
            "chron.com"
        ],
        "sensic.net": [
            "channelnewsasia.com"
        ],
        "servebom.com": [
            "livescience.com",
            "techradar.com",
            "space.com"
        ],
        "serverbid.com": [
            "usatoday.com",
            "theverge.com",
            "vox.com"
        ],
        "serving-sys.com": [
            "dropbox.com",
            "npr.org",
            "news.com.au"
        ],
        "sessioncam.com": [
            "ama-assn.org",
            "manchester.ac.uk",
            "fitbit.com"
        ],
        "sf14g.com": [
            "panasonic.com"
        ],
        "sharethis.com": [
            "unicef.org",
            "bl.uk"
        ],
        "sharethrough.com": [
            "cnet.com",
            "time.com",
            "independent.co.uk"
        ],
        "siftscience.com": [
            "flickr.com",
            "kickstarter.com",
            "scribd.com"
        ],
        "simplereach.com": [
            "wired.com",
            "vanityfair.com",
            "gq.com"
        ],
        "simpli.fi": [
            "matterport.com",
            "rakuten.com",
            "tampabay.com"
        ],
        "sina.cn": [
            "sina.com.cn"
        ],
        "sina.com.cn": [
            "weibo.com",
            "sina.cn"
        ],
        "sinoptik.ua": [
            "kharkov.ua"
        ],
        "siteimproveanalytics.io": [
            "berkeley.edu",
            "washington.edu",
            "mailchimp.com"
        ],
        "sitelock.com": [
            "joomla.org"
        ],
        "sitescout.com": [
            "forbes.com",
            "msn.com",
            "tinyurl.com"
        ],
        "skimresources.com": [
            "businessinsider.com",
            "spotify.com",
            "wired.com"
        ],
        "skplanet.com": [
            "dothome.co.kr"
        ],
        "sl.pt": [
            "sapo.pt"
        ],
        "slashdotmedia.com": [
            "sourceforge.net",
            "slashdot.org"
        ],
        "sleeknote.com": [
            "mashable.com",
            "pcmag.com"
        ],
        "smadex.com": [
            "realtor.com"
        ],
        "smart-traffik.com": [
            "orange.fr"
        ],
        "smartadserver.com": [
            "imgur.com",
            "elpais.com",
            "freepik.com"
        ],
        "smithsonian.museum": [
            "si.edu",
            "smithsonianmag.com"
        ],
        "smrtb.com": [
            "searchenginejournal.com"
        ],
        "snapchat.com": [
            "spotify.com",
            "wired.com",
            "vice.com"
        ],
        "snssdk.com": [
            "toutiao.com"
        ],
        "so.com": [
            "360.cn"
        ],
        "socdm.com": [
            "hatena.ne.jp",
            "rakuten.co.jp",
            "boingboing.net"
        ],
        "sociomantic.com": [
            "home.pl"
        ],
        "sogou.com": [
            "soso.com"
        ],
        "sojern.com": [
            "marriott.com",
            "airbnb.com",
            "metmuseum.org"
        ],
        "solarwinds.com": [
            "pingdom.com"
        ],
        "sonobi.com": [
            "forbes.com",
            "usatoday.com",
            "theverge.com"
        ],
        "soundcloud.com": [
            "harvard.edu",
            "bmj.com",
            "spiegel.de"
        ],
        "spectate.com": [
            "emory.edu"
        ],
        "sphdigital.com": [
            "straitstimes.com"
        ],
        "sphereup.com": [
            "jpost.com"
        ],
        "spiceworks.com": [
            "hp.com",
            "slack.com",
            "seagate.com"
        ],
        "splinternews.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "spotx.tv": [
            "dailymail.co.uk",
            "rollingstone.com",
            "accuweather.com"
        ],
        "spotxchange.com": [
            "dailymail.co.uk",
            "dailymotion.com",
            "npr.org"
        ],
        "springserve.com": [
            "rediff.com"
        ],
        "sprinklr.com": [
            "autodesk.com"
        ],
        "srx.com.sg": [
            "straitstimes.com"
        ],
        "stack-sonar.com": [
            "entrepreneur.com",
            "slashdot.org",
            "thenextweb.com"
        ],
        "stackadapt.com": [
            "dailymotion.com",
            "shopify.com",
            "nypost.com"
        ],
        "statcounter.com": [
            "hugedomains.com",
            "dropcatch.com",
            "freepik.com"
        ],
        "staticworld.net": [
            "cio.com"
        ],
        "steelcentral.net": [
            "wireshark.org"
        ],
        "steelhousemedia.com": [
            "prezi.com"
        ],
        "stickyadstv.com": [
            "nbc.com",
            "skyrock.com",
            "matterport.com"
        ],
        "storygize.net": [
            "autodesk.com"
        ],
        "streamtheworld.com": [
            "spreaker.com"
        ],
        "stripe.com": [
            "statista.com",
            "newsweek.com",
            "mixcloud.com",
            "smashballoon.com",
            "newatlas.com",
            "gnome.org",
            "documentcloud.org"
        ],
        "stylight.net": [
            "redbubble.com"
        ],
        "summerhamster.com": [
            "cnn.com",
            "zdnet.com",
            "marketwatch.com"
        ],
        "sumo.com": [
            "cdbaby.com",
            "insidehighered.com"
        ],
        "sundaysky.com": [
            "accuweather.com"
        ],
        "suning.com": [
            "sohu.com"
        ],
        "supplyframe.com": [
            "arduino.cc",
            "ti.com"
        ],
        "survata.com": [
            "tripadvisor.com"
        ],
        "swiftype.com": [
            "adage.com",
            "deadline.com",
            "rd.com"
        ],
        "symantec.com": [
            "norton.com"
        ],
        "syr.edu": [
            "syracuse.edu"
        ],
        "syuh.net": [
            "squarespace.com"
        ],
        "t-x.io": [
            "ticketmaster.com"
        ],
        "taboola.com": [
            "weebly.com",
            "issuu.com",
            "msn.com"
        ],
        "tagcommander.com": [
            "hotels.com"
        ],
        "tailtarget.com": [
            "uol.com.br",
            "globo.com",
            "abril.com.br"
        ],
        "tamgrt.com": [
            "hotels.com",
            "wyndhamhotels.com"
        ],
        "tanx.com": [
            "sina.com.cn",
            "sohu.com"
        ],
        "taobao.com": [
            "sohu.com",
            "sina.com.cn"
        ],
        "tapad.com": [
            "adobe.com",
            "sourceforge.net",
            "soundcloud.com"
        ],
        "targetspot.com": [
            "spreaker.com"
        ],
        "tawk.to": [
            "apapers.net",
            "essayswriting.org"
        ],
        "taylorandfrancis.com": [
            "tandfonline.com"
        ],
        "tchibo.de": [
            "t-online.de"
        ],
        "teads.tv": [
            "time.com",
            "marriott.com",
            "talktalk.co.uk"
        ],
        "tealiumiq.com": [
            "ibm.com",
            "cnet.com",
            "samsung.com"
        ],
        "techtarget.com": [
            "cloudflare.com",
            "trendmicro.com",
            "domaintools.com"
        ],
        "techweb.com": [
            "informationweek.com"
        ],
        "teenvogue.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "tercept.com": [
            "ndtv.com"
        ],
        "terminus.services": [
            "wpengine.com",
            "microfocus.com",
            "unity.com"
        ],
        "the-ozone-project.com": [
            "dailystar.co.uk"
        ],
        "theadex.com": [
            "t-online.de",
            "messefrankfurt.com"
        ],
        "thebrighttag.com": [
            "adobe.com",
            "playstation.com",
            "ea.com"
        ],
        "theglobeandmail.ca": [
            "theglobeandmail.com"
        ],
        "theguardian.com": [
            "videojs.com"
        ],
        "theinventory.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "them.us": [
            "wired.com",
            "vanityfair.com"
        ],
        "themarker.com": [
            "haaretz.com"
        ],
        "theonion.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "theroot.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "thetakeout.com": [
            "gizmodo.com",
            "kotaku.com"
        ],
        "thrtle.com": [
            "sourceforge.net"
        ],
        "thunderhead.com": [
            "ubisoft.com"
        ],
        "ti.com.cn": [
            "ti.com"
        ],
        "tianqi.com": [
            "qianlong.com"
        ],
        "tianqistatic.com": [
            "tianqi.com"
        ],
        "tij.co.jp": [
            "ti.com"
        ],
        "timecommerce.net": [
            "people.com",
            "ew.com",
            "marthastewart.com"
        ],
        "tinypass.com": [
            "reuters.com",
            "bloomberg.com",
            "businessinsider.com"
        ],
        "tiqcdn.com": [
            "marketwatch.com",
            "hpe.com"
        ],
        "tns-counter.ru": [
            "vk.com",
            "livejournal.com",
            "rt.com"
        ],
        "toast.com": [
            "dothome.co.kr"
        ],
        "top100.ru": [
            "livejournal.com",
            "ria.ru",
            "rambler.ru"
        ],
        "tradedoubler.com": [
            "elmundo.es"
        ],
        "tradingview.com": [
            "entrepreneur.com",
            "investopedia.com"
        ],
        "trafficgate.net": [
            "rakuten.co.jp"
        ],
        "travelsmarter.net": [
            "tripadvisor.com"
        ],
        "traversedlp.com": [
            "people.com"
        ],
        "trb.com": [
            "chicagotribune.com",
            "baltimoresun.com",
            "orlandosentinel.com"
        ],
        "trbo.com": [
            "t-online.de"
        ],
        "treasuredata.com": [
            "rakuten.co.jp",
            "asahi.com",
            "nifty.com"
        ],
        "tremorhub.com": [
            "livescience.com",
            "variety.com",
            "rollingstone.com"
        ],
        "tribalfusion.com": [
            "adobe.com",
            "dailymotion.com",
            "marriott.com"
        ],
        "tribl.io": [
            "prnewswire.com",
            "nasdaq.com",
            "zimbra.com"
        ],
        "trkn.us": [
            "squarespace.com",
            "usps.com",
            "uh.edu"
        ],
        "trumba.com": [
            "ucdavis.edu"
        ],
        "truoptik.com": [
            "slashdot.org"
        ],
        "trustarc.com": [
            "proximus.be"
        ],
        "trvl-px.com": [
            "hotels.com",
            "expedia.com"
        ],
        "turn.com": [
            "sourceforge.net",
            "tinyurl.com",
            "hp.com"
        ],
        "turner.com": [
            "nba.com"
        ],
        "tvpixel.com": [
            "vmware.com"
        ],
        "tvsquared.com": [
            "godaddy.com",
            "jimdo.com",
            "economist.com"
        ],
        "twimg.com": [
            "epfl.ch",
            "ahajournals.org"
        ],
        "twitter.com": [
            "adobe.com",
            "amazon.com",
            "godaddy.com"
        ],
        "tynt.com": [
            "dailymotion.com",
            "pcmag.com",
            "startribune.com"
        ],
        "typekit.net": [
            "adobe.com",
            "techcrunch.com",
            "nypost.com",
            "brookings.edu"
        ],
        "uc.se": [
            "jalbum.net"
        ],
        "uciservice.com": [
            "hotels.com",
            "expedia.com"
        ],
        "udimg.com": [
            "urbandictionary.com"
        ],
        "ugdturner.com": [
            "cnn.com",
            "nba.com"
        ],
        "undertone.com": [
            "photobucket.com",
            "lastpass.com",
            "vcu.edu"
        ],
        "unicc.org": [
            "ohchr.org"
        ],
        "unrulymedia.com": [
            "nypost.com",
            "boingboing.net"
        ],
        "uplynk.com": [
            "yahoo.com"
        ],
        "urbandictionary.store": [
            "urbandictionary.com"
        ],
        "usabilla.com": [
            "sciencedirect.com",
            "ticketmaster.com"
        ],
        "usergram.info": [
            "ocn.ne.jp"
        ],
        "userreport.com": [
            "t-online.de"
        ],
        "uservoice.com": [
            "scoop.it"
        ],
        "usocial.pro": [
            "narod.ru"
        ],
        "ustream.tv": [
            "ibm.com"
        ],
        "vanityfair.com": [
            "wired.com"
        ],
        "veinteractive.com": [
            "prweb.com"
        ],
        "verizon.com": [
            "yahoo.com"
        ],
        "verticalhealth.net": [
            "psychcentral.com"
        ],
        "vhb.de": [
            "handelsblatt.com"
        ],
        "viafoura.co": [
            "cbc.ca",
            "irishtimes.com",
            "nationalpost.com"
        ],
        "vidible.tv": [
            "huffpost.com",
            "aol.com",
            "autoblog.com"
        ],
        "viglink.com": [
            "cnet.com",
            "zdnet.com",
            "thedailybeast.com"
        ],
        "vilynx.com": [
            "today.com",
            "nbc.com",
            "tmz.com"
        ],
        "vindicosuite.com": [
            "marriott.com",
            "people.com",
            "ew.com"
        ],
        "virt-tools.org": [
            "xmlsoft.org"
        ],
        "visitor-track.com": [
            "redcross.org",
            "zimbra.com"
        ],
        "visualwebsiteoptimizer.com": [
            "plesk.com",
            "oreilly.com",
            "zend.com"
        ],
        "vk.com": [
            "narod.ru"
        ],
        "vmmpxl.com": [
            "ncsu.edu"
        ],
        "vogue.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "volvelle.tech": [
            "prweb.com"
        ],
        "voxmedia.com": [
            "theverge.com",
            "vox.com",
            "suntimes.com",
            "polygon.com",
            "sbnation.com",
            "eater.com"
        ],
        "vrbo.com": [
            "hotels.com"
        ],
        "vrtzads.com": [
            "thehindu.com"
        ],
        "vuture.net": [
            "mckinsey.com"
        ],
        "vzew.net": [
            "lenovo.com"
        ],
        "w55c.net": [
            "forbes.com",
            "hp.com",
            "pbs.org"
        ],
        "wbtrk.net": [
            "repubblica.it",
            "bild.de",
            "goethe.de"
        ],
        "wcfbc.net": [
            "repubblica.it",
            "bild.de",
            "goethe.de"
        ],
        "wdsvc.net": [
            "alz.org"
        ],
        "weather.com": [
            "wunderground.com"
        ],
        "weborama.fr": [
            "messefrankfurt.com"
        ],
        "webpush.jp": [
            "asahi.com"
        ],
        "webs.com": [
            "freewebs.com"
        ],
        "webterren.com": [
            "chinadaily.com.cn",
            "ce.cn",
            "dzwww.com"
        ],
        "webtrekk.net": [
            "springer.com",
            "goethe.de",
            "messefrankfurt.com"
        ],
        "webtrendslive.com": [
            "senate.gov",
            "pitt.edu",
            "nyc.gov"
        ],
        "webvisor.org": [
            "kharkov.ua"
        ],
        "weibo.com": [
            "sina.com.cn"
        ],
        "weicaixun.com.cn": [
            "sina.com.cn"
        ],
        "welt.de": [
            "bild.de"
        ],
        "wired.com": [
            "vanityfair.com"
        ],
        "wishabi.com": [
            "baltimoresun.com",
            "nationalpost.com",
            "globalnews.ca"
        ],
        "wishpond.com": [
            "discovermagazine.com"
        ],
        "wistia.com": [
            "calendly.com",
            "photoshelter.com"
        ],
        "wistia.net": [
            "nielsen.com",
            "wistia.com"
        ],
        "withcubed.com": [
            "telegraph.co.uk"
        ],
        "wix.com": [
            "deviantart.com"
        ],
        "wkxppshj-qx.global.ssl.fastly.net": [
            "upwork.com"
        ],
        "wmagazine.com": [
            "wired.com",
            "vanityfair.com"
        ],
        "wnyc.org": [
            "newyorker.com"
        ],
        "wolfram.com": [
            "wolframalpha.com"
        ],
        "wordpress.com": [
            "gravatar.com",
            "time.com",
            "akismet.com"
        ],
        "wp.com": [
            "akismet.com"
        ],
        "wrating.com": [
            "jrj.com.cn"
        ],
        "wsod.com": [
            "cnbc.com",
            "ft.com"
        ],
        "wt-eu02.net": [
            "libero.it",
            "messefrankfurt.com"
        ],
        "wt-safetag.com": [
            "zeit.de",
            "goethe.de"
        ],
        "xg4ken.com": [
            "barnesandnoble.com",
            "bitnami.com",
            "vmware.com"
        ],
        "xinhuanet.com": [
            "news.cn"
        ],
        "xiti.com": [
            "dw.com",
            "france24.com",
            "skyrock.com"
        ],
        "xlisting.jp": [
            "rakuten.co.jp",
            "goo.ne.jp",
            "ocn.ne.jp"
        ],
        "xplosion.de": [
            "spiegel.de",
            "sueddeutsche.de",
            "t-online.de"
        ],
        "xs4all.net": [
            "xs4all.nl"
        ],
        "xspadvertising.com": [
            "sourceforge.net",
            "forbes.com",
            "deloitte.com"
        ],
        "xxxlutz.de": [
            "t-online.de"
        ],
        "yadro.ru": [
            "rt.com",
            "mail.ru",
            "narod.ru"
        ],
        "yahoo.co.jp": [
            "dropbox.com",
            "marriott.com",
            "shutterstock.com"
        ],
        "yahoo.com": [
            "amazon.com",
            "tumblr.com",
            "godaddy.com"
        ],
        "yandex.ru": [
            "opera.com",
            "livejournal.com",
            "ning.com",
            "templatemonster.com",
            "tass.ru"
        ],
        "yandex.ua": [
            "kharkov.ua"
        ],
        "yastatic.net": [
            "liveinternet.ru",
            "ria.ru",
            "tass.ru"
        ],
        "yieldify.com": [
            "logitech.com"
        ],
        "yieldlab.net": [
            "statista.com",
            "spiegel.de",
            "welt.de"
        ],
        "yieldoptimizer.com": [
            "tripadvisor.com",
            "marriott.com",
            "hilton.com"
        ],
        "yimg.com": [
            "godaddy.com",
            "dropbox.com",
            "msn.com",
            "seekingalpha.com"
        ],
        "youtube-nocookie.com": [
            "tmz.com",
            "uscourts.gov"
        ],
        "youtube.com": [
            "linkedin.com",
            "godaddy.com",
            "apache.org"
        ],
        "youvisit.com": [
            "osu.edu",
            "fsu.edu"
        ],
        "zdbb.net": [
            "mashable.com",
            "pcmag.com",
            "ign.com"
        ],
        "zeddit.com": [
            "time.com"
        ],
        "zedo.com": [
            "thehindu.com"
        ],
        "zemanta.com": [
            "forbes.com",
            "dailymotion.com"
        ],
        "zendesk.com": [
            "zoom.us",
            "in.gov",
            "bartleby.com"
        ],
        "zengenti.com": [
            "nottingham.ac.uk"
        ],
        "zeotap.com": [
            "orange.fr"
        ],
        "zergnet.com": [
            "imdb.com",
            "marketwatch.com",
            "pcmag.com"
        ],
        "zg-api.com": [
            "zillow.com"
        ],
        "zhaopin.cn": [
            "zhaopin.com"
        ],
        "ziffdavis.com": [
            "extremetech.com"
        ],
        "ziftsolutions.com": [
            "plesk.com"
        ],
        "zlongad.com": [
            "sina.cn"
        ],
        "zoho.com": [
            "gigaom.com"
        ],
        "zoho.com.au": [
            "zoho.com"
        ],
        "zoho.in": [
            "zoho.com"
        ],
        "zohomeetups.com": [
            "zoho.com"
        ],
        "zoomph.com": [
            "uga.edu"
        ],
        "zorosrv.com": [
            "ria.ru"
        ],
        "zprk.io": [
            "smh.com.au",
            "news.com.au",
            "theage.com.au"
        ],
        "zynbit.com": [
            "parallels.com"
        ]
    },
    "version": "2019.10.07"
};
