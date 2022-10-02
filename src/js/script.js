$(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
        $(".navbar").addClass("nav-scrolled");
    } else {
        $(".navbar").removeClass("nav-scrolled");
    }
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("transparent-navbar").style.top = "0";
    } else {
        document.getElementById("transparent-navbar").style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
}