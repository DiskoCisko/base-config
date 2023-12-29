export const Question = class Question {
    constructor(data = {}) {
        this.text = data.text ?? '';
        this.title = data.title ?? '';
        this.answer = data.answer ?? '';
        this.score = data.score ?? 0;
        this.isComplete = data.isComplete ?? false;
        this.fortuna = data.fortuna ?? false;
        this.isBlocked = data.isBlocked ?? false;
        this.entity = data.entity ?? '';
        this.type = data.type ?? '';
        this.color = data.color ?? '#087C56';
    }
}