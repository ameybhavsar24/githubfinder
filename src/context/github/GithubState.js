import React, {useReducer} from 'react'
import axios from 'axios'

import GithubContext from './githubContext'
import GithubReducer from './githubReducer'

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    FIRST_USERS
} from '../types'

const GithubState = props =>{
    const initialState ={
        users:[],
        user:{},
        repos:[],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Get First 30 Gihtub Users
    const firstUsers = async () =>{
        setLoading()
        const res = await axios
        .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({
            type: FIRST_USERS,
            payload: res.data
        })
    }

    // Search Users
    const searchUsers = async (text)=>{
        console.log(text) 
        setLoading()
        const res = await axios
        .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
      }

    // Get User

    // Get Repos

    // Clear Users
    const clearUsers = () => dispatch({type: CLEAR_USERS})

    // Set Loading
    const setLoading = () => dispatch(
        {
            type: SET_LOADING
        }
    )

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            firstUsers
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState