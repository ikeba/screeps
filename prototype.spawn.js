module.exports = function () {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function (energy, role) {
            const numberOfParts = Math.floor(energy / 200);
            // create a balanced body as big as possible with the given energy
            const name = `${role}-${Math.random().toString(36).slice(-3)}-${numberOfParts}`;
            const body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.spawnCreep(body, name, {memory: {role, working: false}});
        };
};