// ==============================
// College Management System
// dashboard.js
// ==============================

// Welcome Message
window.addEventListener("load", () => {
    console.log("Admin Dashboard Loaded Successfully");
});

// ==============================
// Card Counter Animation
// ==============================

const counters = document.querySelectorAll(".card h1");

counters.forEach(counter => {

    const text = counter.innerText;

    // Skip values like ₹12L
    if (text.includes("₹") || text.includes("L")) return;

    const target = parseInt(text);

    if (isNaN(target)) return;

    let count = 0;
    const speed = Math.ceil(target / 100);

    function updateCounter(){

        count += speed;

        if(count < target){

            counter.innerText = count;

            requestAnimationFrame(updateCounter);

        }else{

            counter.innerText = target;

        }

    }

    updateCounter();

});

// ==============================
// Sidebar Active Menu
// ==============================

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(i=>i.classList.remove("active"));

        item.classList.add("active");

    });

});

// ==============================
// Table Row Highlight
// ==============================

const rows = document.querySelectorAll("tbody tr");

rows.forEach(row=>{

    row.addEventListener("click",()=>{

        rows.forEach(r=>r.style.background="");

        row.style.background="#eaf3ff";

    });

});

// ==============================
// Card Hover Effect
// ==============================

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

// ==============================
// Current Date
// ==============================

const today = new Date();

console.log(
    "Today : " + today.toLocaleDateString()
);