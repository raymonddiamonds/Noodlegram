import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input, TextField } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Footer from './Footer';

// ASSETS:
import logo from './noodles.png';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]); 
  const [searchPosts, setSearchPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [openUpload, setOpenUpload] = useState(false);

  useEffect(() => {
    //LISTENER: listens for any authentication change
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // logged in
        console.log(authUser);
        setUser(authUser);  // wil keep person logged in even when page is refreshed

      } else {
        // logged out
        setUser(null);
      }
    }) 

    return () => {
      // perform clean up action before useEffect is called again
      unsubscribe();
    }
  }, [user, username]);

  // useEffect: runs piece of code based on a specific condition

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // onSnapshot is a listener. If a 'document' is added, it'll update and refire
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,   
        post: doc.data()  // this is post details
      })))
    }) 
  }, []) //when posts changes,  

  const smartSearch = (text) => {
    setSearch(text);

    const filteredPosts = [];

    if(text.length >= 3) {
      console.log("smart search" + JSON.stringify(posts))
      // smart setSearch

      for(var i=0; i<posts.length; i++) {
        const obj = posts[i];
        console.log(JSON.stringify(obj))
        var restaurantArr = obj.post.restaurant.split(' ');
        var captionArr = obj.post.caption.split(' ');
        var concatArr = restaurantArr.concat(captionArr);
        
        for(var j=0; j<concatArr.length; j++){
          var word = concatArr[j].toLowerCase();
          if(word.startsWith(text) ) {

            // FOUND WORD
            filteredPosts.push(obj);
            break;
          }
        };
      };
      setSearchPosts(filteredPosts);
      console.log(JSON.stringify(filteredPosts))

    }
  }

  const signUp = (event) => {
    event.preventDefault(); // prevent refresh 

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message)) // backend validation for ie. email

    setOpen(false); // close modal after - conditional rendering
  }

  const signIn = (event) => {
    event.preventDefault(); //no refresh
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  const style = {
    height: "0",
    width: '400',
    marginTop: '0px',
    marginBottom: "0px",
    marginLeft: "10px",
    padding: "0px"
  }

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type = 'password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type = 'password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>


      <Modal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          {user?.displayName ?(
            <ImageUpload username={user.displayName} />
          ) : (
            <h3>Sorry you need to login to upload</h3>
          )}
        </div>
      </Modal>
      
      <div className="app__header"> 
          <Link to="/">
            <img
              className="app__headerImage"
              src={logo}
              alt=""
            />
          </Link>
          
          { user ?
            (
            <input type="search" className="app__searchBarLoggedIn" placeholder='Search restaurant, caption...' value={search} onChange={(e) => smartSearch(e.target.value.toLowerCase())}/>
            )
            : (
            <input type="search" className="app__searchBar" placeholder='Search restaurant, caption...' value={search} onChange={(e) => smartSearch(e.target.value.toLowerCase())}/>
            )
          }
 
          {/* {<TextField className="app__textfield" label="Search noodles..." margin="normal" variant="outlined" style={style}/>} */}


        {user ?  (
          <div className="app__logedInContainer">
            <Button onClick={() => setOpenUpload(true)}>Upload</Button>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
            ) : (
            <div className="app__loginContainer">
              <Button onClick={() => setOpenUpload(true)}>Upload</Button>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

      </div> 

      <div className="app__posts">
            <div className="app_postsLeft">
              {search.length >= 3 ? searchPosts.length > 0 ?
                searchPosts.map(({id, post}) => (
                  <Post key={id} postId={id} user={user} username={post.username} restaurant={post.restaurant} price={post.price} rating={post.rating} caption={post.caption} imageUrl={post.imageUrl} />
                ))
              :
               <p>Zero Results</p>
              
              :

                posts.map(({id, post}) => (
                  <Post key={id} postId={id} user={user} username={post.username} restaurant={post.restaurant} price={post.price} rating={post.rating} caption={post.caption} imageUrl={post.imageUrl} />
                ))
              
              }
            </div>


      </div>

      {/* <div className="app__footer">
          <p>Made with ❤️ in Canada</p>
      </div> */}

      <Footer></Footer>


      {/* {user?.displayName ?(
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )} */}

    </div>
      
  );
}

export default App;
