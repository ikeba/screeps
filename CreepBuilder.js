const BaseCreep = require("./BaseCreep");

class CreepBuilder extends BaseCreep {
    constructor(creep) {
        super(creep);
    }

    work(creep) {
        super.work();
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
            console.log('lets go upgrade controller');
            require('./CreepUpgrader').work(creep);
        }
    }
}

module.exports = CreepBuilder;
