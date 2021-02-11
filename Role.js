module.exports = class Role {
    static get roles() {
        return {
            HARVESTER: 'harvester',
            BUILDER: 'builder',
            REPAIRER: 'repairer',
            UPGRADER: 'upgrader',
            WALL_REPAIRER: 'wallRepairer'
        }
    }

    static getModuleByRole(role) {
        console.log('role', role);
        switch (role) {
            case Role.roles.HARVESTER: return require('./CreepHarvester');
            case Role.roles.BUILDER: return require('./CreepBuilder');
            case Role.roles.REPAIRER: return require('./CreepRepairer');
            case Role.roles.UPGRADER: return require('./CreepUpgrader');
            case Role.roles.WALL_REPAIRER: return require('./CreepWallRepairer');
            default: return require('./BaseCreep');
        }
    }
}