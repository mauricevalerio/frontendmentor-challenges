# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![Design preview for the IP address tracker coding challenge](./design/desktop-preview.jpg)

### Links

- Solution URL: [GitHub Repo](https://github.com/mauricevalerio/frontendmentor-challenges/tree/main/ip-address-tracker)
- Live Site URL: [IP Address Tracker](https://trackingip.netlify.app/)

## My process

### Built with

- Semantic HTML5
- Flexbox
- Mobile-first workflow
- [Bulma](https://bulma.io/) - CSS Framework
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) - JS library
- [IP Geolocation API by IPify](https://geo.ipify.org/)
- [LeafletJS](https://leafletjs.com/)

### What I learned

Learned and practice TypeScript React and played with the Bulma CSS Framework.

To see how you can add code snippets, see below:

```TypeScript + React
const Map: React.FC<MapProps> = ({ lat, lng })

onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputIp(e.target.value)}
```

### Useful resources

- [Re-render React Leaflet Map component](https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes) - This helped me re-render the map when the input is changed.

## Author

- Website - [Maurice Valerio](https://www.mauricevalerio.dev/)
- Frontend Mentor - [@mauricevalerio](https://www.frontendmentor.io/profile/mauricevalerio)


