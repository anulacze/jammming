import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const isAlreadyInPlaylistTracks = this.state.playlistTracks.some(element => {
      return element.id === track.id;
    })
    if (!isAlreadyInPlaylistTracks) {
      const newPlaylist = [...this.state.playlistTracks, track];
      this.setState({playlistTracks: newPlaylist})
    }
  }

  removeTrack(track) {
    const filteredTab = this.state.playlistTracks.filter(element => {
      return element.id !== track.id;
    })
    this.setState({playlistTracks: filteredTab})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(element => element.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.updatePlaylistName('New Playlist');
      this.setState({playlistTracks: []});
    })
  }

  search(term) {
    Spotify.search(term).then((tablicaObiektow) => {
      this.setState({searchResults: tablicaObiektow});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              nazwaPlaylisty={this.state.playlistName} 
              pozycjePlaylisty={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;

