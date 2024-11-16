class ArtistNames {
    constructor() {
        // TODO: If a request is made too quickly after the service starts, it fails because of this fetch
        this.host = 'https://collectionapi.metmuseum.org';
        fetch(`${this.host}/public/collection/v1/objects`)
            .then(response => response.json())
            .then(data => {
                this.objectIDs = data.objectIDs;
            });
        this.users = {};
        this.artists = new Set();
    }
    async getName(userName) {
        const user = this.users[userName];
        if (user) {
            return user.artistName;
        } else {
            let artistName;
            do {
                let i = Math.floor(Math.random() * this.objectIDs.length);
                let response = await fetch(`${this.host}/public/collection/v1/objects/${this.objectIDs[i]}`);
                let data = await response.json();
                artistName = data.artistDisplayName;
            } while (!artistName || artistName.startsWith('Anonymous') || this.artists.has(artistName));
            this.artists.add(artistName);
            this.users[userName] = { artistName };
            return artistName;
        }
    }
}

let artistNames = new ArtistNames();
module.exports = artistNames;
