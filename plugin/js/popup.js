var cookieList = [];

jQuery(document).ready(function () {
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
