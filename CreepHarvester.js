const BaseCreep = require("./BaseCreep");

class CreepHarvester extends BaseCreep {
    constructor(creep) {
        super(creep);
    }

    work(creep) {
        super.work();
        console.log('--- start harvester work ---');
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length > 0) {
            const target = creep.pos.findClosestByRange(targets);
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            //roleUpgrader.run(creep);
        }
    }
}

module.exports = CreepHarvester;
