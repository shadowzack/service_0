var EventEmitter = require('events');
const CONFIG = require("../config").events;
const MAX_VOTES = 10;


global.LOG = ""; //print log 

class Election extends EventEmitter {

    constructor(subject) {
        super();
        this.votes = 0;
        this.topic = 0;
        this.subject = subject;

        this.on(CONFIG.RESET, () => {
            this.subject.votes = 0;
            console.log(`${this.subject.topic} Reset`);
            AddToLOG(`${this.subject.topic} Reset`);
            console.log(`RESET::: ${subject.topic}, Votes: ${subject.votes}`);

        });
        this.on(CONFIG.INC, () => {
            if (this.subject.votes < MAX_VOTES) {
                this.subject.votes++;
                console.log(`${this.subject.topic} Incrementing votes by 1`);
                AddToLOG(`${this.subject.topic} Incrementing votes by 1`);
            } else {
                console.log(`${this.subject.topic} cannot Incremented ::: 10 is the maximum number of votes`);
                AddToLOG(`${this.subject.topic} cannot Incremented ::: 10 is the maximum number of votes`);
                this.emit(CONFIG.MAX_CANNOT_INC, this.subject);
            }
            console.log(`INC::: ${subject.topic}, Votes: ${subject.votes}`);
        });


        this.on(CONFIG.ALL, () => {
            console.log(`${this.subject.topic}, Votes: ${this.subject.votes}`);
            AddToLOG(`${this.subject.topic}, Votes: ${this.subject.votes}`);
        });


    };

    getAll() {
        this.emit(CONFIG.ALL);
    };

    reset() {
        this.emit(CONFIG.RESET);
    };

    increment() {
        this.emit(CONFIG.INC);
    };
    getSubject() {
        return this.subject;
    }
    getTopic() {
        return this.topic;
    }
    getVotes() {
        return this.votes;
    }

}
var AddToLOG = (string) => {
    LOG += `${string}  <br>`;
};

module.exports = Election;