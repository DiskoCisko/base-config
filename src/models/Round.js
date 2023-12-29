import { Theme } from '@models/Theme.js';

export const Round = class Round {
    constructor(data = {}) {
        this.name = data.name;
        this.themes = (data.themes ?? []).map((theme) => new Theme(theme));
        this.isLast = data.isLast;
        this.isComplete = data.isComplete;
        this.isBlocked = data.isBlocked;
        this.key = data.key;
    }
}