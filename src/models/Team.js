export const Team = class Team {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.score = data.score;
        this.color = data.color;
    }
}