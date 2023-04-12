import { createContext, useReducer } from 'react'
import { useJobsContext } from '../hooks/useJobsContext'

export const JobsContext = createContext()
export const jobsReducer = (state, action) => {
    switch (action.type){
    case 'SET_JOB':
        return{
            jobs: action.payload
        
        }
    case 'CREATE_JOB':
        return{
            jobs: [action.payload, ...state.jobs]
        }
    case 'DELETE_JOB':
            return{
                jobs: state.jobs.filter((j) => j._id !== action.payload._id) //if ID and the job ID that were planning to delete is not equal, then don't keep in array
            }
    default: 
    return state
    }
    
}
export const JobsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(jobsReducer, {
        workouts: null
    })

        return (
        <JobsContext.Provider value ={{...state, dispatch}}>
            { children }
        </JobsContext.Provider>
    )
}