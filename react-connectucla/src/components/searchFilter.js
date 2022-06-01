import React from 'react'


export default function FilterBar({tag, tags, handleTagChange, addTags, removeTag}){


    return(
    <div>
        <form onSubmit = {addTags}>
            <div>
                <input value = {tag} onChange = {handleTagChange}/>
                <button type = "submit">Add Tag</button>
            </div>
        </form>
        <div>
            <ul>
                {tags.map(tag => (
                <div key = {tag}>
                    <li>{tag}</li>
                    <button onClick = {(event) => (removeTag(event.target.id))} id = {tag}>Remove Tag</button>
                </div>
                ))}
            </ul>
        </div>
    </div>
    )
}