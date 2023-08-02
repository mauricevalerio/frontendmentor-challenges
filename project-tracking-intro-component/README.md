# Frontend Mentor - Project tracking intro component solution

This is a solution to the [Project tracking intro component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/project-tracking-intro-component-5d289097500fcb331a67d80e). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Create the background shape using code

### Screenshot

![Design preview for the Project tracking intro component coding challenge](./design/desktop-preview.jpg)

### Links

- Solution URL: [GitHub Repo](https://github.com/mauricevalerio/frontendmentor-challenges)
- Live Site URL: [Project Tracking Intro](https://project-tracker-intro.netlify.app/)

## My process

### Built with

- Semantic HTML5
- CSS
- Flexbox
- [SASS](https://sass-lang.com/)
- Mobile-first workflow

### What I learned

Learned and practiced the basics of SASS such as: variables, nesting, partials, modules, mixins, extends/inheritance

To see how you can add code snippets, see below:

```variables
$primary-red-color: hsl(0, 100%, 68%)
```
```mixins
@mixin cta($background, $size, $padding, $border-radius, $font-weight)
    color: #fff
    display: inline-block
    text-transform: uppercase
    margin-right: 1rem
    background: $background
    font-size: $size
    padding: $padding
    border-radius: $border-radius
    font-weight: $font-weight
```
```extends/inheritance
%reset
    box-sizing: border-box
    margin: 0
    padding: 0
    text-decoration: none
    list-style-type: none
```

## Author

- Website - [Maurice Valerio](https://www.mauricevalerio.dev/)
- Frontend Mentor - [@mauricevalerio](https://www.frontendmentor.io/profile/mauricevalerio)