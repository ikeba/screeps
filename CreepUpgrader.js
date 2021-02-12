const BaseCreep = require("./BaseCreep");

class CreepUpgrader extends BaseCreep {
    constructor(creep) {
        super(creep);
    }

    work(creep) {
        super.work();
        console.log('--- upgrader work ---');
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(this.gameObject.room.controller);
        }
    }
}

module.exports = CreepUpgrader;
