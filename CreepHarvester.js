const BaseCreep = require("./BaseCreep");

class CreepHarvester extends BaseCreep {
    constructor(creep) {
        super(creep);
        console.log(`Hello, I'm ${this.name}`);
    }
}

module.exports = CreepHarvester;