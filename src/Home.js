import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, TextField } from '@material-ui/core';
import App from './App';
import logo from './noodles.png';
import noodles from './noodles2.jpg'
import './home.css';

function Home() {

    return (
        <div className="home">
            
            <div className="home__header"> 

                <img
                    className="home__headerImage"
                    src={logo}
                    alt=""
                />

                <h2>Noodlegram</h2>
            </div> 

            <div className="home__content">
                <div className="home__text">
                    <h1>Welcome to Noodlegram</h1>
                    <p>Noodlegram is the best selection of noodle pictures from across Canada. 
                    Each noodle picture contains information about the restaurant, price point and ratings. Please sign up/log in to share your noodle pictures!</p>
                </div>
                <img
                    className="home__image"
                    src={noodles}
                    alt=""
                />
                {/* <button type="submit" >Enter</button> */}
            </div>

            <div className="home__footer">
                <h4>Made with ❤️ in Canada</h4>
            </div>

        </div>
    )
}

export default Home;