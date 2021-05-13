import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import firebase from 'firebase'

import './Post.css'
import { db } from '../firebase';
const Post = ({ postId, user, username, caption, image, userImage }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()));
            })
    }, [postId]);


    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setComment("")
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" src={userImage} alt="" />
                <h4>{username}</h4>
            </div>

            <img className="post__image" src={image} />

            <div className="post__info">
                <h4>{username}</h4>
                <p>{caption}</p>
            </div>

            <div className="post__comments">
                {/* <p>comments</p> */}
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
