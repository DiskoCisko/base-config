export const Question = class Question {
    constructor(data = {}) {
        this.text = data.text;
        this.answer = data.answer;
        this.score = data.score;
        this.isComplete = data.isComplete;
        this.isUnlucky = data.isUnlucky;
        this.isBlocked = data.isBlocked;
        this.entity = this.entity;
        this.type = this.type;
    }
}