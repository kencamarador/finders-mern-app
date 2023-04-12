import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useJobsContext } from '../hooks/useJobsContext';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/useAuthContext';

const JobDetailsProfile = ({ job }) => {
    const { dispatch } = useJobsContext()
    const { user } = useAuthContext()
 
    const handleClick = async () => {
        if(!user){
            return //no request because no user.
        }
        const response = await fetch('/api/jobs/' + job._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_JOB', payload: json})
        }
    }
    return (
        <Wrapper>
        
            <div className="jobListing">
            <img src={job.photo}></img>
                <div className='jobText'>
                     
                     <p className='title'>{job.title}</p>
                     <h4>${job.pay}/hour</h4>
                     {/* <p className='location'>{job.city}, {job.province}</p> */}
                     <Button sx={{mt: 2, mr: 1, bgcolor: 'background.paper'}}variant="outlined" startIcon={<EditIcon />}>Edit Listing</Button>
                     <Button sx={{mt: 2}}variant="contained" onClick={handleClick} startIcon={<DeleteIcon />}>Delete Listing</Button>

                 </div>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`



.jobListing {
    display: flex;
    margin-top: 6px;
    border-radius: 10px;
    border: 2px solid rgb(255, 255, 255);
    background-color: #f6f1f1a5;
}



.jobText {
    height: 120px;
    margin-left: 15px;
    
}

.title {
    font-weight: 600;
    margin-bottom: -20px;
}

h4 {
    font-weight: 300;
}


img{
    height: 130px;
    border-radius: 5px;
    margin: 10px;
}




  

`

export default JobDetailsProfile