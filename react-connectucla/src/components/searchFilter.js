import React from 'react'


export default function FilterBar({tag, tags, handleTagChange, addTags, removeTag}){


    return(
    <>
        <form onSubmit = {addTags}>
            <div>
                <input value = {tag} onChange = {handleTagChange}/>
                <button type = "submit">Add Tag</button>
            </div>
        </form>
        <>
            <ul>
                {tags.map(tag => (
                <>
                    <li key = {tag}>{tag}</li>
                    <button onClick = {(event) => (removeTag(event.target.id))} id = {tag}>Remove Tag</button>
                </>
                ))}
            </ul>
        </>
    </>
    )
}