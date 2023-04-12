import { useEffect, useState } from "react"
import * as React from 'react';
import styled from "styled-components";
import { Divider } from "@mui/material";
import Avatar from '@mui/material/Avatar';
//components
import JobDetails from '../components/JobDetails'
import { useJobsContext } from "../hooks/useJobsContext"
import SearchBar from "../components/SearchBar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LocationMap from "../components/LocationMap";
import { borderRadius } from "@mui/system";
import { useAuthContext } from "../hooks/useAuthContext";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState(null);
    const [loaded, setLoaded] = useState(false);

    const {user} = useAuthContext()
    const handleOpen = (job) => {
        setSelectedJob(job);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedJob(null);
        setOpen(false);
    };

    const {jobs, dispatch} = useJobsContext()

    useEffect(() => {
        const fetchJobs = async() => {
            const response = await fetch('/api/jobs/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_JOB', payload: json})
            }
        }
        setLoaded(true);
        if (user){
            fetchJobs()
        }
        
        
    }, [dispatch, user])  //Render once
    if (!loaded) {
        return <div>Loading...</div>;
      }
    return(
        <>
        
            <SearchBar />
           
            <Wrapper>
                <div className="jobs">
                    {jobs && jobs.map((job) => ( //if there are any jobs, then re-run the map
                        <div key={job._id}>
                            <div className="link-container" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} onClick={() => handleOpen(job)}>
                                <JobDetails key={job._id} job={job} />
                                
                                
                            </div>
                        </div>
                    ))}
                </div>
        
            </Wrapper>
            {selectedJob && (
                <Modal style={{ borderRadius: '50px'}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                > 
                    
                    <Box sx={style} style={{width: '420px'}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2, mb: -2.5, fontWeight: 'bold', fontSize: 26}}>
                            {selectedJob.title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, fontSize: 16 }}>
                            C${selectedJob.pay}/hour
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500 }}>
                            Details
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 'Regular' }}>
                            {selectedJob.description}
                        </Typography>
                        <LocationMap city={selectedJob.city} province={selectedJob.province} />
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: -2.5, fontSize: 14 }}>
                            {selectedJob.city}, {selectedJob.province}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 12 }}>
                            Location is approximate
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 2, mt: 2 }}/>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 16}}>
                            Job Poster Information
                        </Typography>
       
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar sx={{ mt: 1.5 }}/>
                        <Typography id="modal-modal-description" sx={{ mt: 1.5, ml: 1.5, fontWeight: 'Regular' }}>
                        {selectedJob.contactEmail}
                        </Typography>
                        </Box>


 

                    </Box>
                </Modal>
            )}
        </>
    )
}

const Wrapper = styled.div`
  .jobs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .link-container{
    margin-bottom: 5
  }
`;

export default Home
