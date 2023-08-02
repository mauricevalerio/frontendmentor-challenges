const menuIcon = document.getElementById("menu-icon") as HTMLImageElement
const nav = document.getElementById("nav") as HTMLMenuElement

const showNav = (): void => {
    nav.classList.toggle("toggle-nav")
}

const toggleMenu = (): void => {
    let src: string = menuIcon.src
    src = src.includes("hamburger") ? "./images/icon-close.svg" : "./images/icon-hamburger.svg"
    menuIcon.setAttribute("src", src)
    showNav()
}

menuIcon.addEventListener("click", toggleMenu)
