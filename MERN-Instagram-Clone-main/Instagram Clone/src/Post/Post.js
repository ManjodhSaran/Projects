import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'

import './Post.css'
import axios from '../axios';

const Post = ({ postId, user, username, caption, image, userImage, comments }) => {

    const [comment, setComment] = useState("");

    const postComment = (e) => {
        e.preventDefault();

        axios.post(`/upload/${postId}`, {
            text: comment,
            username: user.displayName
        })
        setComment("")
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" src={userImage} alt="" />
                <h4>{username}</h4>
            </div>

            <img className="post__image" src={image} alt={username} />

            <div className="post__info">
                <h4>{username}</h4>
                <p>{caption}</p>
            </div>

            <div className="post__comments">
                {comments?.map(comment =>
                    <div className="post__comment">
                        <p><strong>{comment.username}</strong>  {comment.text}</p>
                    </div>
                )}

                {user && (
                    <form>
                        <input
                            className="post__input"
                            placeholder="Add a comment..."
                            type="text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <button
                            className="post__button"
                            type="submit"
                            disabled={!comment}
                            onClick={postComment}
                        >
                            Post
                    </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Post
