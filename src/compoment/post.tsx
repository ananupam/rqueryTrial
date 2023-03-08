import React, {Fragment, useState} from 'react'
import { useMutation } from 'react-query'

import axios from 'axios'

interface PostData {
    id: number;
    title: string;
    description: string;
  }
  interface PostResponse {
    id: number;
  }
  

export default function Post(){
    const [title,setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [message, setMessage] = useState<PostResponse>({ id: 0 })

    const {isLoading, isError, error, mutate} = useMutation<PostResponse, unknown, PostData>(createPost, {retry: 3})


    async function createPost(data: PostData): Promise<PostResponse> {
        
        
            const response = await axios.post<PostResponse>('http://localhost:3000/posts',data)
            setMessage(response.data)
            return response.data;
    
    }
    
    
    return(
        <Fragment>
            <div className='post'>
                <h1> Create Post</h1>
                <label>Title</label>
                <input type="text"value={title} onChange={e=>setTitle(e.target.value)}/>
                <label>Description</label>
                <input type="description"value={description} onChange={e=>setDescription(e.target.value)}/>
                <button onClick={()=>{mutate({id: Date.now(),title, description})}}>Update</button>

                <p> Created a new Post ID: {message && message.id}</p>
                <div style={{color: 'gray', background: '#234'}}>
                {isLoading ? 'Saving...' : ''}
                {isError ? (error as Error).message : ''}
    
      </div>
            </div>
        </Fragment>
    )
}
