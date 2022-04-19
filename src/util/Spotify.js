let token;
const client_id = 'dd0a41ef2d254a1ca4797a2b97d3c0bb';
const redirect_uri = 'http://localhost:3000/';
const scope = 'playlist-modify-public';
const urlBase = 'https://api.spotify.com/v1';

export const Spotify = {
    getAccessToken() {
        if (token !== undefined) {
            return token;
        }
        
        const currentHash = window.location.hash.substring(1);
        const tabOfParams = currentHash.split('&');
        const obj = {};

        tabOfParams.forEach(param => {
            const [key, value] = param.split('=');
            obj[key] = value;
        });
        token = obj.access_token;

        if (token === undefined) {
            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            //url += '&state=' + encodeURIComponent(state);

            window.location.href = url;
            return;
        }

        const expire = obj.expires_in;
        window.setTimeout(() => token = '', expire * 1000);
        window.history.pushState('Access Token', null, '/');


        return token;
    },

    async search(searchTerm) {
        const response = await fetch(
            `${urlBase}/search?type=track&q=${searchTerm}`, 
            { headers: { Authorization: `Bearer ${this.getAccessToken()}` } }
        );
        const data = await response.json();
        return data.tracks.items.map(element => {
            return {
                id: element.id,
                name: element.name,
                artist: element.artists[0].name,
                album: element.album.name,
                uri: element.uri
            }
        });
    },

    savePlaylist(name, arrayOfTracks) {
        if (!name || !arrayOfTracks) {
            return;
        }

        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        return fetch(`${urlBase}/me`, { headers })
        .then(response => response.json())
        .then(data => fetch(`${urlBase}/users/${data.id}/playlists`,
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        "name": name,
                        "public": true
                      })
                }
            ))
        .then(response => response.json())
        .then(data => fetch(`${urlBase}/playlists/${data.id}/tracks`,
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                            "uris": arrayOfTracks
                        })
                }
            )
        )
    }
};
