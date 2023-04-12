import { useEffect } from "react"
import JobForm from "../components/JobForm"


//components
import JobDetails from '../components/JobDetails'
import { useJobsContext } from "../hooks/useJobsContext"



const AddJob = () => {
    const { dispatch } = useJobsContext()

    useEffect(() => {
        const fetchJobs = async() => {
            const response = await fetch('/api/jobs')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_JOB', payload: json})


            }
        }

        fetchJobs()
    }, [])  //Render once
    return(
            <div className="add-jobs">
            <JobForm />
            </div>
    )
}

export default AddJob