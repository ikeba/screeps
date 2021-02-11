const roleBuilder = require("./role.builder");
const roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working && creep.store.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full


        else if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
            });

            // if we find one
            if (structure) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to get energy
        else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleRepairer;