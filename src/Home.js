import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Button, Input, TextField } from '@material-ui/core';
import Footer from './Footer'
import App from './App';
import logo from './noodles.png';
import noodles from './noodles2.jpg'
import './home.css';
import './font.css';

function Home() {

    const font = "'Open Sans', sans-serif";

    return (
        <div className="home">
            
            <div className="home__header"> 
                <Link to="/">
                    <img
                        className="home__headerImage"
                        src={logo}
                        alt=""
                    />
                </Link>

            </div> 

            <div className="home__column">
                <div className="home__text">
                    <span className="home__span" style={{fontFamily: font}}>
                        <h1>Welcome to Noodlegram</h1>
                        <p>Noodlegram is the ultimate repository for noodle related restaurant content across Canada. 
                        Each post contains information about the restaurant, price and rating. Please sign up/log in to share your noodle post!</p>
                    
                        <Button className="home__button" component={Link} to="/App" 
                        
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#878787",
                            color: "white",
                            fontFamily: font,
                            padding: "8px 25px",
                            fontSize: "18px"
                        }}>
                            Enter
                        </Button>                    
                        
                    </span>


                    
                    
                </div>

                

                <div className="home__right"> 
                    <img
                        className="home__image"
                        src={noodles}
                        alt=""
                    />
                </div>
            </div>

            

            {/* <div className="home__footer">
                <p className="home__footerText">Made with ❤️ in Canada</p>
            </div> */}

            <Footer/>
        </div>
    )
}

export default Home;