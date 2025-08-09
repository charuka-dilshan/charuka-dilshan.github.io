
// JavaScript to add a background to the navbar when scrolling
const nav = document.getElementById('navbar-nav');
window.onscroll = function () {
    if (window.scrollY > 50) {
        nav.classList.add("navbar-scrolled");
    } else {
        nav.classList.remove("navbar-scrolled");
    }
};

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#03050b",
  "#091021",
  "#0e1d37",
  "#132b4e",
  "#183b64",
  "#1c4d7a",
  "#206190",
  "#2476a6",
  "#278ebc",
  "#2aa7d3",
  "#2dc3e9",
  "#2fe0ff",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;

//   circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;

  console.log(coords.x);
  console.log(coords.y);
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    console.log(x);
    console.log(y);

    const nextCircle = circles[index + 1] || circles[0];

    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

