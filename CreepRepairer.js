const BaseCreep = require("./BaseCreep");

class CreepRepairer extends BaseCreep {
    constructor(creep) {
        super(creep);
    }

    work(creep) {
        const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
        });

        if (structure) {
            if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }
        // if we can't fine one
        else {
            // look for construction sites
            require('./CreepBuilder').work(creep);
        }
    }
}

module.exports = CreepRepairer;
