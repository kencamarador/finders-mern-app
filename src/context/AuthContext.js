import { createContext, useReducer, useEffect } from "react";


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // must pass json string as an object to use in our javascript app
            if(user){ // if user is in local storage, then dispatch the action. If no user, then don't dispatch, value is null
                dispatch({ type: 'LOGIN', payload: user })
            }
    }, []) // only run once when the react app initally renders

    console.log('AuthContext state: ', state)


    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}