# Frontend Mentor - Newsletter sign-up form with success message solution

This is a solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3FC1AZbNrv). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

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

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Design preview for the Newsletter sign-up form with success message coding challenge](./design/desktop-preview.jpg)

### Links

- Solution URL: [GitHub Repo](https://github.com/mauricevalerio/frontendmentor-challenges/tree/main/newsletter-sign-up-with-success-message-main)
- Live Site URL: [Newsletter Sign Up](https://newsletter-spammer.netlify.app/)

## My process

### Built with

- Semantic HTML5
- [Tailwind CSS](https://tailwindcss.com/)
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/)

### What I learned

Practiced and learned TypeScript such as declaring types on components and props as well as useState hook.

```Components
type FormType = {
    email: string,
    handleEmailChange: (e: any) => void,
    handleSubmit: (e: any) => void,
    isError: boolean,
}
export default function Form({ email, handleEmailChange, handleSubmit, isError }: FormType) {}
```
```Props
export default function Success(props: { email: string, clearEmail: () => void, toggleHasSubmitted: () => void }) {}
```
```useState
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
```

## Author

- Website - [Maurice Valerio](https://mauricevalerio.dev/)
- Frontend Mentor - [@mauricevalerio](https://www.frontendmentor.io/profile/mauricevalerio)
