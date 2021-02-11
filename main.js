require('prototype.spawn')();
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer')
const roleWallRepairer = require('role.wallRepairer');

module.exports.loop = function () {

    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        } else if (creep.memory.role === 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
    }

    const towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    });
    for (let tower of towers) {
        const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            tower.attack(target);
        }
    }

    const minimumNumberOfHarvesters = 5;
    const minimumNumberOfUpgraders = 1;
    const minimumNumberOfBuilders = 1;
    const minimumNumberOfRepairers = 2;
    const minimumNumberOfWallRepairers = 1;

    const numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    const numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
    const numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role === 'builder');
    const numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'repairer');
    const numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairer');

    const energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    let spawnResult = undefined;

    console.log('harvesters: ', numberOfHarvesters + '/' + minimumNumberOfHarvesters);
    console.log('upgraders: ', numberOfUpgraders + '/' + minimumNumberOfUpgraders);
    console.log('repairers: ', numberOfRepairers + '/' + minimumNumberOfRepairers);
    console.log('wallRepairer: ', numberOfWallRepairers + '/' + minimumNumberOfWallRepairers);
    console.log('builders: ', numberOfBuilders + '/' + minimumNumberOfBuilders);
    console.log('energy: ', energy);
    console.log('-------------------');

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        spawnResult = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
        // if spawning failed and we have no harvesters left
        if (spawnResult === ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters === 0) {
            // spawn one with what is available
            spawnResult = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        spawnResult = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        spawnResult = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        spawnResult = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        spawnResult = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    } else {
        // else try to spawn a builder
        spawnResult = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }

    if (spawnResult === 0) {
        console.log("Spawned new creep: " + spawnResult);
    }


}