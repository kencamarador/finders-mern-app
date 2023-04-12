import { useEffect, useState } from "react"
import * as React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
//components
import { useJobsContext } from "../hooks/useJobsContext"
import SearchBar from "../components/SearchBar";
import JobDetailsProfile from "../components/JobDetailsProfile";

const Profile = () => {
    
const {jobs, dispatch} = useJobsContext()
const {user} = useAuthContext()
const [loaded, setLoaded] = useState(false);
useEffect(() => {
  const fetchJobs = async() => {
      const response = await fetch('/api/jobs/profile', {
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
  
}, [dispatch, user]) 
if (!loaded) {
  return <div>Loading...</div>;
} //Render once

    return(

        <>
        <Search>
        <SearchBar />
        </Search>
        <Wrapper>
            
            <div className="jobs">
                {jobs && jobs.map((job) => ( //only if there is a "job" then run then map through the jobs
              
                    <JobDetailsProfile key={job._id} job={job} />
                    
                    
                ))}

            </div>
        </Wrapper>
        
        
        </>
    )
}
const Wrapper = styled.div`
  .jobs {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border-radius: 5px;
    justify-content: flex-start;
    gap: 10px;
  }
`;

const Search = styled.div`
  .searchTitle span {
    display: none;
  }
  .searchTitle:after{
    content: 'Your Listings';

  }
  
`
export default Profile