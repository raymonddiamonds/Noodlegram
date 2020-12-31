import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase";
import { db, storage } from './firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = () => {
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
            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleSubmit}>
                 Upload
            </Button>
        </div>
    )
}

export default ImageUpload
