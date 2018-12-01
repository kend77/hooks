import React, { Component } from 'react';
import './App.css';

import Albums from "./Albums"

const ACCESS_TOKEN = "BQDgVA-cpcYQTeNzs1kw4o-YPdOtj-BdgJKhg6qJNc_TDb7eOc19bt24nHHzQm2YC_jg0Yq6Cyj-yYEIBLAUgD6pFfTPNIRN53I7VVbp5_GGL7RmaQm2CToDYbLXl8QxT02UK4SLGPZnTORiX5nsJ3_8Gw5I7Mw3QpFtq7wCJhcLa5RWkNHjDynsx_w4IqMlGwP4i_HTgOIg41YFGGeuegC25y550Fru6DrxLdh-5SkFakjJ18o-NSx4fimwwBN6-2jX5-z5a0t-ziyhwVQVcwFB"
class App extends Component {
	state = {
		query: "",
		albums: []
	}
	handleChange (e) {
		e.preventDefault();
		this.setState({ query: e.target.value})
	}
	searchForAlbum (e) {
		e.preventDefault();
		const query = this.state.query.replace(" ", "%20")
		const albumUrl = `https://api.spotify.com/v1/search?q=${query}&type=album`
		console.log(albumUrl)
		fetch(albumUrl, {
			headers: {
				"Authorization": "Bearer " + ACCESS_TOKEN
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.albums.items)
			this.setState({albums: data.albums.items});
		})
	}

	render() {
	return (
		<div className="App">
			<form onSubmit={this.searchForAlbum}>
				<input value={this.state.query} onChange={this.handleChange} />
				<h2>{this.state.albums.length === 0 ? "No Albums" : `You found ${this.state.albums.length} album(s)`}</h2>
			</form>
			<div>
				<Albums albums={this.state.albums} />
			</div>
		</div>
	);
	}
}

export default App;
