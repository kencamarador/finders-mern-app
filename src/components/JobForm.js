import { useState } from "react"
import { useJobsContext } from "../hooks/useJobsContext"
import styled from 'styled-components';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import DragFile from "./DragFile";
import { useAuthContext } from "../hooks/useAuthContext";




const JobForm = () => {
    const { dispatch } = useJobsContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [pay, setPay] = useState('')
    const [contactEmail, setcontactEmail] = useState('')
    const [contactNumber, setcontactNumber] = useState('')
    const [photo, setPhoto] = useState()
    // const [user_id, setUser_id] = useState('')
    const [error, setError] = useState(null)
    const [selectedFile, setSelectedFile] = useState();
	  const [isFilePicked, setIsFilePicked] = useState(false);


    const provinces = [
      { value: 'BC', label: 'British Columbia' },
      { value: 'AB', label: 'Alberta' },
      { value: 'SK', label: 'Saskatchewan' },
      { value: 'MB', label: 'Manitoba' },
      { value: 'ON', label: 'Ontario' },
      { value: 'QC', label: 'Quebec' },
      { value: 'NB', label: 'New Brunswick' },
      { value: 'NS', label: 'Nova Scotia' },
      { value: 'PE', label: 'Prince Edward Island' },
      { value: 'NL', label: 'Newfoundland and Labrador' },
      { value: 'YT', label: 'Yukon' },
      { value: 'NT', label: 'Northwest Territories' },
      { value: 'NU', label: 'Nunavut' },
    ];
    
    const handleAttachmentChange = async (e) => {
      if(e.target.files){
        setPhoto(e.target.files[0]);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()  //prevent from refreshing the page

      if (!user) {
        setError('You must be logged in')
        return
      }
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('city', city);
      formData.append('province', province);
      formData.append('pay', pay);
      formData.append('contactEmail', contactEmail);
      formData.append('contactNumber', contactNumber);
      formData.append('photo', photo);
      // formData.append('user_id', user_id);
  
      console.log('Data being sent:', formData); 
      const response = await fetch('/api/jobs/create', {
          method: 'POST',
          body: formData,  //use FormData to encode the form data. This is a must for photo uploads..
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
      })
      const json = await response.json()
  
      if(!response.ok){
          setError(json.error)
  
      }
      if(response.ok){ //reset the form once submitted
          setTitle('')
          setDescription('')
          setCity('')
          setProvince('')
          setPay('')
          setcontactEmail('')
          setcontactNumber('')
          setPhoto()
          setIsFilePicked(false);
          setError(null)
          console.log('New Job Added', json)
          dispatch({type: 'CREATE_JOB', payload: json})
      }
      
  }
    return(
      
      <Box style={{ backgroundColor: "#FFFFFF", color: "black" }}
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 2, width: '39ch' },
  }}
  noValidate
  autoComplete="off"
>
  <Typography variant="h4" gutterBottom style={{ marginLeft: 18, marginTop: 18, paddingTop: 30  }}> 
   Add Job
  </Typography>
  <div>
    <TextField
      required
      id="outlined-required"
      label="Position"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />
    <TextField
      required
      id="outlined-required"
      label="City"
      onChange={(e) => setCity(e.target.value)}
      value={city}
    />
    <TextField
      required
      select
      id="outlined-required"
      label="Province"
      onChange={(e) => setProvince(e.target.value)}
      value={province}
    >
      {provinces.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      required
      id="outlined-required"
      label="Details"
      onChange={(e) => setDescription(e.target.value)}
      value={description}
    />
    <TextField
      required
      id="outlined-required"
      label="Pay"
      type="number"
      onChange={(e) => setPay(e.target.value)}
      value={pay}
    />
    <TextField
      required
      id="outlined-required"
      label="Phone Number"
      type="number"
      onChange={(e) => setcontactNumber(e.target.value)}
      value={contactNumber}
    />
    <TextField
      required
      id="outlined-required"
      label="Email"
      type="email"
      onChange={(e) => setcontactEmail(e.target.value)}
      value={contactEmail}
    /> 
    <input type="file" name="attachment" onChange={handleAttachmentChange} />
    <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#0A5'}}>Add</Button>
    {error && <div className="error">{error}</div>}
    
    {/* <DragFile onChange={handleAttachmentChange}/> */}
  </div>
</Box>
  );
    }


export default JobForm
