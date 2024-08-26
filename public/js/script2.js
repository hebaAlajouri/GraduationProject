// script.js
let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar'); // Corrected selector

menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times');
    navbar.classList.toggle('active'); // Toggle the 'active' class on the navbar
};