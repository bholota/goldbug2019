
function getUrlVars() {
    var d = [], c;
    var a = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
    for (var b = 0; b < a.length; b++) {
        c = a[b].split("=");
        d.push(c[0]);
        d[c[0]] = c[1]
    }
    return d
}
