import React, { useEffect, useState } from 'react'

import './Feed.css'
import StoryReel from './StoryReel/StoryReel'
import MessageSender from './MessageSender/MessageSender'
import Post from './Post/Post'
import db from '../firebase'

function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() }))));

    }, [])

    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />

            {posts.map(({ id, post }) =>
                <Post
                    key={id}
                    profilePic={post.profilePic}
                    message={post.message}
                    timestamp={post.timestamp}
                    username={post.username}
                    image={post.image}
                />
            )}

            {/* <Post
                profilePic={`https://lh3.googleusercontent.com/ogw/ADGmqu8bb-01SYM3FshpOuIaXK64PF3WEjfYcIhGikCx=s32-c-mo`}
                message={`hello i am here`}
                timestamp={`2 pm wednesday`}
                username={`Manjodh`}
                image={`https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`}
            /> */}

        </div>
    )
}

export default Feed
