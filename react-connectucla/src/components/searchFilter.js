import React from 'react'
import Button from '@mui/material/Button'

export default function FilterBar({tag, tags, handleTagChange, addTags, removeTag}){


    return(
    <div>
        <form onSubmit = {addTags}>
            <div>
                <input value = {tag} onChange = {handleTagChange} placeholder= "filter events by tags"
                style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '35px'}}
                />
                <Button 
                variant="contained" type = "submit">Add Tag</Button>
            </div>
        </form>
        <div>
            <ul>
                {tags.map(tag => (
                <div>
                    <li key = {tag}>{tag}</li>
                    <Button variant="contained" onClick = {(event) => (removeTag(event.target.id))} id = {tag}>Remove Tag</Button>
                </div>
                ))}
            </ul>
        </div>
    </div>
    )
}
