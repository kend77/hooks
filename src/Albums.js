import React from "react"

function Albums(props) {
	const { albums } = props;
	return (
		<div>
			{albums.map((album) => {
				const { name, images, index} = album;
				const [,artwork] = images;
				return (
					<React.Fragment key={name + index}>
						<h3>{name}</h3>
						<img src={artwork.url} alt="" />
					</React.Fragment>
				)
			})}
		</div>
	)
}

export default Albums;
