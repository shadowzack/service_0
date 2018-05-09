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
    };

    getAll() {
        console.log(`${this.subject.topic}, Votes: ${this.subject.votes}`);
        AddToLOG(`${this.subject.topic}, Votes: ${this.subject.votes}`);
    };

    reset() {
        this.subject.votes = 0;
        console.log(`${this.subject.topic} Reset`);
        AddToLOG(`${this.subject.topic} Reset`);
        this.emit(CONFIG.RESET, this.subject);
    };

    increment() {
        if (this.subject.votes < MAX_VOTES) {
            this.subject.votes++;
            console.log(`${this.subject.topic} Incrementing votes by 1`);
            AddToLOG(`${this.subject.topic} Incrementing votes by 1`);
            this.emit(CONFIG.INC, this.subject);
        } else {
            console.log(`${this.subject.topic} cannot Incremented ::: 10 is the maximum number of votes`);
            AddToLOG(`${this.subject.topic} cannot Incremented ::: 10 is the maximum number of votes`);
            this.emit(CONFIG.MAX_CANNOT_INC, this.subject);
        }
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

module.exports = (subject) => {

    var topic = new Election(subject);

    topic.increment();
    topic.getAll();
    topic.reset();
    topic.increment();
    topic.increment();
    topic.getAll();
    topic.increment();
    topic.getAll();

/*   you can check for cannot Incremented message
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.getAll();
    topic.increment();
    */
    topic.on(CONFIG.INC, (subject) => {
        console.log(`INC::: ${subject.topic}, Votes: ${subject.votes}`);
    });
    topic.on(CONFIG.RESET, (subject) => {
        console.log(`RESET::: ${subject.topic}, Votes: ${subject.votes}`);
    });
};