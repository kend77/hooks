import React, {useState, useEffect} from 'react';
import Albums from './Albums';
import "./App.css"

import { ACCESS_TOKEN } from './secrets';

function BetterApp() {
	const album = useInput("");
	const fetchedAlbums = useFetchAlbums(album);

	const title = fetchedAlbums.albums.length === 0 ? "Search Albums" : `Albums Found: ${fetchedAlbums.albums.length}`
	useDocumentTitle(title);

	return (
		<div className="App">
			<form className="form" onSubmit={fetchedAlbums.handleSubmit}>
				<input className="album-input" {...album} />
				<h2>{fetchedAlbums.albums.length === 0 ? "No Albums" : `You found ${fetchedAlbums.albums.length} album(s)`}</h2>
			</form>
			{fetchedAlbums.albums.length ?
			<Albums key={fetchedAlbums.albums} albums={fetchedAlbums.albums} /> : null
			}
		</div>
	)
}

function searchForAlbum(query) {
	query = query.replace(" ", "%20")
	const albumUrl = `https://api.spotify.com/v1/search?q=${query}&type=album`
	return fetch(albumUrl, {
	headers: {
		"Authorization": "Bearer " + ACCESS_TOKEN
		}
	})
	.then(res => res.json())
	.then(data => {
		return data.albums.items
	})
	.catch(console.error)
}


function useInput(initialValue) {
	const [value, setValue] = useState(initialValue);
	function handleChange(e) {
		e.preventDefault();
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange,
	}
}


function useFetchAlbums(query) {
	const [albums, setAlbums] = useState([]);
	function handleSubmit(e) {
		e.preventDefault();
		searchForAlbum(query.value)
		.then(results => setAlbums(results))
	}
	return { albums, handleSubmit }
}
const useDocumentTitle = (title) => {
	useEffect(() => {
		document.title = title
	}, [title])
}
export default BetterApp;
