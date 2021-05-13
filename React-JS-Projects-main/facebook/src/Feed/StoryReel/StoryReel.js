import React, { useEffect, useState } from 'react'

import './StoryReel.css'
import Story from './Story/Story'
import db from '../../firebase';

function StoryReel() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        db.collection("posts")
            .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() }))));

    }, [])

    return (
        <div className="storyReel">
            {posts.map(({ id, post }) =>
                <Story
                    image={post.image}
                    profileSrc={post.profilePic}
                    title={post.username} />
            )}
        </div>
    )
}

export default StoryReel
