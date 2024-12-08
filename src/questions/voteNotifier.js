class VoteMessage {
    constructor(from, classCode, uniqueID, votes) {
        this.from = from;
        this.classCode = classCode;
        this.uniqueID = uniqueID;
        this.votes = votes;
        this.type = 'vote';
    }
}

class VoteNotifier {
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onmessage = async (msg) => {
          try {
            const vote = JSON.parse(await msg.data.text());
            this.receiveVote(vote);
          } catch {}
        };
    }

    broadcastVote(from, classCode, uniqueID, votes) {
        const voteMessage = new VoteMessage(from, classCode, uniqueID, votes);
        this.socket.send(JSON.stringify(voteMessage));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveVote(voteMessage) {
        this.handlers.forEach((handler) => {
            handler(voteMessage);
        });
    }
}

const voteNotifier = new VoteNotifier();
export { voteNotifier };
