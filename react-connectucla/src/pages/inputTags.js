import "./inputTags.css"
import React from "react"

const TagsInput = (props) => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value.trim() !== "") {
			setTags([...tags, event.target.value.trim()]);
			props.selectedTags([...tags, event.target.value.trim()]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyPress={(event) => event.key === " " ? addTags(event) : null}
				placeholder="Press the spacebar to add tags"
			/>
		</div>
	);
};
export default TagsInput;