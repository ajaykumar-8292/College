// ================================
// College Management System
// script.js
// ================================

// Sticky Header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "#0b5ed7";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
    } else {
        header.style.background = "#0d6efd";
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,.1)";
    }
});







// Dashboard Counter Animation
const counters = document.querySelectorAll(".card h1");

counters.forEach(counter => {

    const target = parseInt(counter.innerText);

    if (isNaN(target)) return;

    let count = 0;

    const speed = Math.ceil(target / 80);

    const updateCounter = () => {

        count += speed;

        if (count < target) {
            counter.innerText = count;
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target;
        }

    };

    updateCounter();

});

// Smooth Scroll
document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function(e){

        const href = this.getAttribute("href");

        if(href.startsWith("#")){

            e.preventDefault();

            document.querySelector(href).scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// Feature Card Animation
const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

});

document.querySelectorAll(".box").forEach(box=>{

    box.style.opacity="0";
    box.style.transform="translateY(50px)";
    box.style.transition=".7s";

    observer.observe(box);

});

// Button Hover Effect
document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});



// Welcome Message
window.addEventListener("load",()=>{

    console.log("College Management System Loaded Successfully");

});


// ================================
// Hamburger Menu
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });

    const menuLinks = navMenu.querySelectorAll("a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });

});