# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Links

- Solution URL: [GitHub Repo](https://github.com/mauricevalerio/frontendmentor-challenges/tree/main/age-calculator)
- Live Site URL: [How Young Are You](https://howyoungareyou.netlify.app/)

## My process

### Built with

- HTML5
- CSS3
- Flexbox
- [React](https://reactjs.org/) - JS library

### What I learned

I learned to integrate a new package [React Hook Forms](https://www.react-hook-form.com/) to simplify form validation in React.

To see how you can add code snippets, see below:

```React Hook Form
<input 
    id="day"
    name="day"
    type="number"
    className={errors.day || invalidDateMsg ? "validation-error-border" : ""} 
    placeholder="Day" {...register("day", 
    {
    required: {
        value: true,
        message: "This field is required"
    }, 
    max: {
        value: 31,
        message: "Must be a valid day"
    }, 
    min: {
        value: 1,
        message: "Must be a valid day"
    }
    })}
    />
```

### Useful resources

- [Date Computation](http://www.java2s.com/Tutorial/JavaScript/0240__Date/Getyearmonthanddayfromdatedifference.htm) - This helped me compute the exact age by month, day, year.

## Author

- Website - [Maurice Valerio](https://mauricevalerio.dev)
- Frontend Mentor - [@mauricevalerio](https://www.frontendmentor.io/profile/mauricevalerio)