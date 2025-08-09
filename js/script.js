
// JavaScript to add a background to the navbar when scrolling
const nav = document.getElementById('navbar-nav');
window.onscroll = function () {
    if (window.scrollY > 50) {
        nav.classList.add("navbar-scrolled");
    } else {
        nav.classList.remove("navbar-scrolled");
    }
};
