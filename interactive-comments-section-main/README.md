# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![Design preview for the Interactive comments section coding challenge](./design/desktop-preview.jpg)

### Links

- Solution URL: [GitHub Repo](https://github.com/mauricevalerio/frontendmentor-challenges/tree/main/interactive-comments-section-main)
- Live Site URL: [Interactive Comments Section](https://interactive-social-media-comments.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- React hooks useContext, useState, useEffect
- React Child Props
- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [JavaScript Time Ago](https://www.npmjs.com/package/javascript-time-ago) - NPM package to calculate how long the comment was created in seconds, minutes, hours, days, months, and years.

### What I learned

Learned [React Bootstrap](https://react-bootstrap.netlify.app/). Used React Bootstrap components such as Form, Button, ButtonGroup, Modals.

```React Bootstrap
<Modal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="gray-text">
          Are you sure you want to delete this comment? 
          This will remove the comment and can't be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary" className="text-uppercase">no, cancel</Button>
        <Button onClick={() => handleDeleteComment(id)} variant="danger" className="text-uppercase">yes, delete</Button>
      </Modal.Footer>
    </Modal>

    <Form
    autoComplete="off"
    noValidate
    validated={validated}
    onSubmit={handleCommentSubmit}
    >
        {screenWidth <= 768 ?
            <Form.Group>
                <Form.Control 
                as="textarea" 
                placeholder="Add a comment...."
                onChange={handleChangeComment}
                value={currentUserComment}
                name="currentUserComment"
                className="w-100 d-block rounded form-control textarea"
                required/>
            </Form.Group>
        :
            null}

        <div className={`d-flex pt-2 ${!isEditToggled ? "justify-content-between" : "justify-content-end"} ${screenWidth > 768 ? "align-items-start" : ""}`}>
                    
            {!isEditToggled && <img 
            src={image.webp} 
            alt={`Circular profile picture of ${username}`}
            className="profile-picture"/>}

            {screenWidth > 768 ?
                <div className='flex-grow-1 mx-2'>
                    <Form.Group>
                        <Form.Control 
                        as="textarea" 
                        placeholder="Add a comment...."
                        onChange={handleChangeComment}
                        value={currentUserComment}
                        name="currentUserComment"
                        className="w-100 d-block rounded form-control textarea"
                        required/>
                    </Form.Group>
                </div>
            :
                null
            }

            <Button 
            type="submit"
            className={`blue-bg text-uppercase text-white ${isEditToggled ? "align-self-end" : ""}`}>
            {buttonFormText()}
            </Button>
        </div>
    </Form>
```

### Continued development

Further improvements would be to pull data from an API and dynamically change the current user.

## Author

- Website - [Maurice Valerio](https://mauricevalerio.dev/)
- Frontend Mentor - [@mauricevalerio](https://www.frontendmentor.io/profile/mauricevalerio)
