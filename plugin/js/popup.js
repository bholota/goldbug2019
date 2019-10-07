var cookieList = [];
// aktywny tab lub undefined
var tab = undefined;

function initHeatmap() {
    function generateData(count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = (i + 1).toString();
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }


    var options = {
        chart: {
            height: 350,
            type: 'heatmap',
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,

                colorScale: {
                    ranges: [{
                        from: -30,
                        to: 5,
                        name: 'low',
                        color: '#00A100'
                    },
                    {
                        from: 6,
                        to: 20,
                        name: 'medium',
                        color: '#128FD9'
                    },
                    {
                        from: 21,
                        to: 45,
                        name: 'high',
                        color: '#FFB200'
                    },
                    {
                        from: 46,
                        to: 55,
                        name: 'extreme',
                        color: '#FF0000'
                    }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            name: 'Jan',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Feb',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Mar',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Apr',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'May',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Jun',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Jul',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Aug',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        },
        {
            name: 'Sep',
            data: generateData(20, {
                min: -30,
                max: 55
            })
        }
        ],
        title: {
            text: 'HeatMap Chart with Color Range'
        },

    }

    var chart = new ApexCharts(
        document.querySelector(".heatmap"),
        options
    );

    chart.render();
}
function chartInit() {
    var options = {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                            return 249
                        }
                    }
                }
            }
        },
        series: [44, 55, 67, 83],
        labels: ['Other', 'Sources', 'Warnings', 'Critical'],

    }

    var chart = new ApexCharts(
        document.querySelector(".chart"),
        options
    );

    chart.render();
}

function reduceDomain(acc, cur) {
    if (cur.length === 0) {
        return acc;
    }
    if (cur[0] in acc === false) {
        acc[cur[0]] = [];
    }
    acc[cur[0]].push(cur.slice(1, cur.length - 1));
    return acc;
}

function initSpringy() {
    /*
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        if (tab === undefined) {
            alert('notab ');
            return;
        }
        console.log(tab);
        const tabId = tab.id;
        const root = new URL(tab.url);
        const urls = root.host.split('.').reverse().map((val, idx, arr) => { return arr.slice(0, idx + 1).reverse().join('.'); });
        chrome.storage.sync.get(['requests'], (data) => {
            console.log(data);
            if (data.requests === undefined) {
                return;
            }
            const requests = data.requests.filter((req) => req.tabId === tabId);
            var map = requests.reduce((acc, req) => {
                acc = reduceDomain(acc, req.domain.slice(1, 2));
                return acc;
            }, {});
            const keys = Object.keys(map);

            map = keys.map(key => {
                map[key] = reduceDomain(map[key], {});
            });
            console.log(map);
        });
    });
    */
    var url = new URL(tab.url);
    url = `${url.hostname}${url.pathname}`;
    var graphJSON = {
        "nodes": [
            "api.google.com",
            "maps.google.com",
            "imgur.com",
            "reddit.com",
            "twitter.com",
            "media.twitter.com",
            "api.facebook.com",
            "media.facebook.com",
            "social.facebook.com"
        ],
        "edges": [
            [url, "google.com", { color: 'red', weight: 3 }],
            ["google.com", "api.google.com", { color: 'green' }],
            ["google.com", "maps.google.com", { color: 'green' }],
            ["google.com", "tracking.google.com", { color: 'red', weight: 3 }],
            [url, "imgur.com", { color: 'green' }],
            [url, "reddit.com", { color: 'green' }],
            [url, "twitter.com", { color: 'green' }],
            ["twitter.com", "media.twitter.com", { color: 'green' }],
            [url, "facebook.com", { color: 'red', weight: 3 }],
            ["facebook.com", 'api.facebook.com', { color: 'green' }],
            ["facebook.com", 'track.facebook.com', { color: 'red', weight: 3 }],
            ["facebook.com", 'media.facebook.com', { color: 'green' }],
            ["facebook.com", 'social.facebook.com', { color: 'green' }]
        ]
    };

    jQuery(function () {
        var graph = new Springy.Graph();
        graph.addNode(new Springy.Node(url, {
            label: url, color: 'blue', font: '24px Verdana, sans-serif' }));
        graph.addNode(new Springy.Node("facebook.com", {
            label: "facebook.com", color: 'orange',
            font: '24px Verdana, sans-serif'
        }));
        graph.addNode(new Springy.Node("track.facebook.com", {
            label: "track.facebook.com", color: 'red',
            font: '24px Verdana, sans-serif'
        }));
        graph.addNode(new Springy.Node("google.com", {
            label: "google.com", color: 'orange',
            font: '24px Verdana, sans-serif'

        }));
        graph.addNode(new Springy.Node("tracking.google.com", {
            label: "tracking.google.com", color: 'red',
            font: '24px Verdana, sans-serif'
        }));
        graph.loadJSON(graphJSON);

        var springy = jQuery('.graph canvas').springy({
            graph: graph
        });
    });
}
jQuery(document).ready(function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tab = tabs[0];
        if (tab === undefined) {
       //     alert('notab ');
            return;
        }
        initSpringy();
    });
    chartInit();
    initHeatmap();
    test();
    let body = $('body').css('display', 'none');
    setTimeout(() => {
        body.css('display', '');
    }, 100);
});
function test() {
    chrome.cookies.getAll({ 'session': true }, function(cookies) {
        cookieList = cookies
    });

}
