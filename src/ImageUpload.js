import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase";
import { db, storage } from './firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [restaurant, setRestaurant] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = () => {
        if(image === null || restaurant.length === 0 || price.length === 0 || rating.length === 0 || caption.length === 0) {
            alert("Please fill out missing inputs");
            return;
        }
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => { //keep track of the async process - how long is the upload taking
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error function
                console.log(error);
            },
            () => {
                // Complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            restaurant: restaurant,
                            price: price,
                            rating: rating,
                            caption: caption, 
                            imageUrl: url,
                            username: username
                        });

                        // reset after upload
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div className="imageupload">
            {/* Caption Input */}
            {/* File picker */}
            {/* Submit/post button */}

            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder='Enter a restaurant' onChange={event => setRestaurant(event.target.value)} value={restaurant}/>

            <select value={price} onChange={event => setPrice(event.target.value)}>
                <option hidden value="">Select a price</option>
                <option value="💲 Inexpensive">💲 Inexpensive</option>
                <option value="💲💲 Moderately Priced">💲💲 Moderately Priced</option>
                <option value="💲💲💲 Expensive">💲💲💲 Expensive</option>
            </select>

            <select value={rating} onChange={event => setRating(event.target.value)}>
                <option hidden value="">Select a rating</option>
                <option value="💛 Okay">💛 Okay</option>
                <option value="💛💛 Yummy">💛💛 Yummy</option>
                <option value="💛💛💛 Super Yummy">💛💛💛 Super Yummy</option>
            </select>

            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleSubmit}>
                 Upload
            </Button>
        </div>
    )
}

export default ImageUpload
