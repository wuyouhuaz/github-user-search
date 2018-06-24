/*监听点击回到顶部*/
let top = document.getElementById('backToTop');  //回到顶部
function backToTop() {
    window
        .addEventListener('scroll', function () {
            if (document.documentElement.scrollTop >= 200) {
                top.hidden = false;
                top
                    .classList
                    .add('tools-top');
            } else {
                top.hidden = true;
            }
        });
    top.addEventListener('click', function () {
        window.scrollTo(0, 0);
    });
}
module.exports = {
    backToTop,
}