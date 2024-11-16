class ArtistNames {
    constructor() {
        this.host = 'https://collectionapi.metmuseum.org';
        this.objectIDs = null;
        this.users = {};
        this.artists = new Set();
        this.initialized = false;
    }

    async init() {
        const response = await fetch(`${this.host}/public/collection/v1/objects`);
        const data = await response.json();
        this.objectIDs = data.objectIDs;
        this.initialized = true;
    }

    async getName(userName) {
        if (!this.objectIDs) {
            throw new Error('ArtistNames not initialized. Call init() first.');
        }

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
