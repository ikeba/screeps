const roleBuilder = require("./role.builder");

module.exports = {
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
            const walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            let target = undefined;

            target = _.sortBy(walls, 'hits')[0];

            // loop with increasing percentages
            // for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
            //     // find a wall with less than percentage hits
            //     for (let wall of walls) {
            //         console.log(wall.hits, wall.hitsMax);
            //         if (wall.hits / wall.hitsMax < percentage) {
            //             target = wall;
            //             break;
            //         }
            //     }
            //
            //     // if there is one
            //     if (target) {
            //         // break the loop
            //         break;
            //     }
            // }

            // if we find a wall that has to be repaired
            if (target) {
                // try to repair it, if not in range
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
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