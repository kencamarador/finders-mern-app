import React from 'react'
import Logo from '../components/Logo';
import main from '../components/main.svg';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext'


function Landing(){
    const { user } = useAuthContext()
    return(
        <>
        <Navbar />
        <Wrapper>
        

        
        <div className='container'>
        <div className='info'>
        <h1>
              Task <span>Searching</span>
        </h1>
            <p>Join Finder and connect with reliable helpers or earn extra income on the side. Sign up today and start connecting with our community!</p>
         {!user && (
            <div>
              <span>
            <Button
            sx={{ mt: 2, ml: 1, backgroundColor: '#0A5', width: 220, fontSize: 20 }}
            variant="contained"
            component={Link}
            to="/login"
            >

            Login/Register
            </Button>
            </span>
            </div>
          )}
          {user && (
            <div>
            <Button
            sx={{ mt: 2, ml: 1, backgroundColor: '#0A5', width: 220, fontSize: 20 }}
            variant="contained"
            component={Link}
            to="/"
            >

            View Listings
            </Button>
            </div>
          )} 
        </div>
        <img src= {main} className='main-page-picture'/>
        </div>

        </Wrapper>
        
        </>

        
    )
}

const Wrapper = styled.main`
nav{
    display: flex;
    margin-top: 23px;
    margin-left: 48px;
    
}

.main-page-picture{
    width: 40%;
    margin-top: -350px;
    margin-left: 800px;
    display: block;
    object-fit: cover;

}



.container {
    
    margin: 0 auto;
  }

.info{

    margin-left: 50px;
    width: 600px;

}

h1{
    font-weight: 700;
    font-size: 65px;
    span{
   
    color: #0A5;
    }
}

p{
    margin-left: 10px;
}

.btn{
    margin-left: 10px;
    
}

.info{
    margin-top: 10rem;
}
@media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }


`


export default Landing