import Button from '@mui/material/Button';
import PostAPI from '../services/post.js'
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function DeleteButton(props) {
    const rsvpPost = () => {
        PostAPI.likePost(props.id)
        .then((response) => {
            console.log(response);
        })
        .catch((response) => console.log(response));
    }

    return (
    <div>
        <Button variant="outlined" endIcon={<SendIcon />} onClick={rsvpPost}>
        RSVP
        </Button>
    </div>
    );
}
