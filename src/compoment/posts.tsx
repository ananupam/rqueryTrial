import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
import Post from './post'

async function fetchPosts(){
    const {data} = await axios.get('http://localhost:3000/posts')    
    console.log(data)
    console.log("data print: fetchPost")
    return data

}

function Posts(){
    const {data, error, isError, isLoading } = useQuery('posts', fetchPosts) 
    // first argument is a string to cache and track the query result
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        if (error instanceof Error) {
            // ✅ TypeScript knows err is Error
            console.log(error.message);
          } else {
            console.log('Unexpected error', error);
          }
    }

    return(
        <div className='container'>
            <Post/>
        <h1>Posts</h1>
        {
            [data].map((post:any, index:any) => {
                return <li key={index}>{post.title}</li>
            })
        }

        </div>
    )
}

export default Posts