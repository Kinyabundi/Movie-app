import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../Context/UserAuthContext';

//import Header from './Header';
const Home = () => {
 
  const {user, logOut} = useUserAuth();
 // console.log(user);
 const navigate = useNavigate();
 function continueWatching(){
  console.log("loading");
  navigate("/")
 }
 const handleMovies = () => {
   continueWatching();
 }
 const handleLogOut = async () =>{
  try{
    await logOut();
    navigate("/")
  } catch (err) {
    console.log(err.message);
  }
 };
  return ( 
    <>
   
    <div className="p-4 box mt-3 text-center">Hello Welcome,
     <br/> 
     {user && user.email}
     </div>
    <div className="d-grid gap-2">
        <Button variant="primary" onClick = {handleMovies}>Continue Watching</Button>
        <Button variant="primary" onClick = {handleLogOut}>Log Out</Button>
    </div>
    </>
  )
}

export default Home