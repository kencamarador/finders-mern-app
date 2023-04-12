import { useState } from "react"
import { useJobsContext } from "../hooks/useJobsContext"
import styled from 'styled-components';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

const SearchBar = () => {

    return(
      
        <Box style={{ backgroundColor: "#FFFFFF", color: "black" }}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
        
        
      >
        <Typography variant="h4" gutterBottom style={{ marginLeft: 18, marginTop: 18, paddingTop: 30  }}> 
         <div className="searchTitle"><span>Search for Job</span></div>
        </Typography>
        <div>
          
          <TextField

            id="outlined-required"
            label="Search"
          />
          <TextField
            select
            id="outlined-required"
            label="Sort By"
          />

        

        </div>
        
      </Box>
    );
      }
  
  
  export default SearchBar