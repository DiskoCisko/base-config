import { Question } from '@models/Question.js';

export const Theme = class Theme {
    constructor(data = {}) {
        this.name = data.name;
        this.questions = (data.questions ?? []).map((question) => new Question(question));
        this.isComplete = data.isComplete;
    }
}