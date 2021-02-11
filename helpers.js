function isTargetOccupied(target) {

}

function findEnergySource(creep) {
    return creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
}

module.exports = {
    findEnergySource,
    isTargetOccupied
}