const roleUpgrader = require("./role.upgrader");
const roleBuilder = {
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
            const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found

            if (constructionSite) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                // go upgrading the controller
                console.log('creep ' + creep.name + ' has nothing to do and goes to update controller');
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to get energy
        else {
            console.log('creep ' + creep.name + ' need energy');
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;