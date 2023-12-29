export const Team = class Team {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.score = data.score ?? 0;
        this.color = data.color;
    }
}