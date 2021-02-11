const roleUpgrader = require("./role.upgrader");
const {findEnergySource} = require("./helpers");
const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        findEnergySource(creep);


        if (creep.memory.working === true && creep.store.energy === 0) {
            // creep just transferred all energy and need to find a source
            creep.memory.working = false;
            creep.memory.moving = false;
        } else if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
            // creep is full and can find target to transfer energy
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            // source was find
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
                roleUpgrader.run(creep);
            }
        } else {
            // moving is true when creep defined it's source
            const source = findEnergySource(creep);
            if (creep.memory.moving) {
                if (source !== creep.memory.movingTarget) {
                    delete creep.memory.movingTarget;
                    creep.memory.moving = false;
                }
            } else {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.memory.moving = true;
                    creep.memory.movingTarget = source;
                }
            }
        }
    }
};

module.exports = roleHarvester;