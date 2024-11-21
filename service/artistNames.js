const DB = require('./database');

class ArtistNames {
    constructor() {
        this.host = 'https://collectionapi.metmuseum.org';
        this.objectIDs = null;
        this.artists = null;
        this.initialized = false;
    }

    async init() {
        const response = await fetch(`${this.host}/public/collection/v1/objects`);
        const data = await response.json();
        this.objectIDs = data.objectIDs;
        const artistsData = await DB.getAllArtistNames()
        this.artists = new Set(artistsData)
        this.initialized = true;
    }

    async getName(userName) {
        if (!this.initialized) {
            await this.init();
        }

        const user = await DB.getUser(userName);
        if (user) {
            return user.artistName;
        } else {
            let artistName;
            do {
                let i = Math.floor(Math.random() * this.objectIDs.length);
                let response = await fetch(`${this.host}/public/collection/v1/objects/${this.objectIDs[i]}`);
                let data = await response.json();
                artistName = data.artistDisplayName;
            } while (!artistName || artistName.startsWith('Anonymous') || artistName.startsWith('Unknown') || this.artists.has(artistName));
            return artistName;
        }
    }
}

let artistNames = new ArtistNames();
module.exports = artistNames;
