"use strict";
const menuIcon = document.getElementById("menu-icon");
const nav = document.getElementById("nav");
const showNav = () => {
    nav.classList.toggle("toggle-nav");
};
const toggleMenu = () => {
    let src = menuIcon.src;
    src = src.includes("hamburger") ? "./images/icon-close.svg" : "./images/icon-hamburger.svg";
    menuIcon.setAttribute("src", src);
    showNav();
};
menuIcon.addEventListener("click", toggleMenu);
