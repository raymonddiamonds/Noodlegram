# Shopify Internship Challenge - Noodlegram

This is my code for the [Shopify Summer 2021 Internship application](https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit).

[Noodlegram](https://image-repo-efa7d.web.app/) is deployed here: https://image-repo-efa7d.web.app/

## Usage:



To run this web app locally on your machine, it will require the following prerequisites:

- A [Firebase](https://firebase.google.com/) account

To run the code, follow these steps:

1. `https://github.com/raymonddiamonds/Noodlegram.git` will copy the code here to your local machine
2. `cd src/` will go into the directory where the code is stored
3. `npm i` will install all required dependencies
4. `npm start` will start the web app locally!

Before it works, you'll need to specify the authentication required by Firebase
Create a file `src/Firebase.js` with the following contents:

```
const firebaseApp = firebase.initializeApp({
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "image-repo-efa7d.firebaseapp.com",
    projectId: "image-repo-efa7d",
    storageBucket: "image-repo-efa7d.appspot.com",
    messagingSenderId: "xxxxxxxxxx",
    appId: "1:xxxxxxxxx:web:1xxxxxxxcccxxxxxxxx"
})

module.exports = keys;
```

This will begin an instance of the server on `http://localhost:3000/` by default. You can test the endpoint using [Postman](https://www.getpostman.com).

To run tests, run `npm run-script test`, and make sure you're in the `src` directory.

To access documentation, perform steps 1 through 4 and visit `http://localhost:5000/api-docs` which was generated through `express-swagger-generator`.

Here's a brief description of the scope of this project:

## Scope

- This is a secure web app for photo storage purposes with the ability to create users
- Users can upload one photo at a time
- Users can specify details associate with the photo
- Users can comment on each others photos
- Users can get a list of all uploaded photos
- Users can filter photos by passing in a query parameter

As we can see, there are two classes we can use to model this project:

1. User

```
username: String
email: String
password: String
date: Date
```

2. Post (photo)

```
username: User
imageUrl: String
caption: String
restaurant: String
price: String
rating: String
date: Date
```

- the username field represents the User who uploaded the post
- the imageUrl field represents the URL that the photo can be accessed from
- the caption field represents the caption/text associated with the post
- the restaurant field represents the restaurant name associated with the post
- the price field represents the price point (specified by 3 price ranges) associated with the restaurant
- the rating field represents the rating (specified by 3 rating choices) associated with the restaurant
- date is an auto-generated `Date` that will be assigned when the photo is uploaded

## Testing

- To be updated

## Improvements and Future Prospects

- Profile
  - An additional feature would be to have individual `User` profiles and retrieve all photos uploaded by an individual user 
- Bulk operations
  - To perform bulk operations, namely add or delete, you could call the single deletion API numerous times, or create a similar endpoint but use `Promise.all` to wait for all requests to complete
- React.js
  - Modularize components further so that the app can be run more efficiently
- Documentation
  - Currently documentation was auto-generated through a third party extension, which enforces their style guide, but also imposes a lot of restrictions
