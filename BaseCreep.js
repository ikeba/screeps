const BaseObject = require('./BaseObject');
const MODES = require("./Modes");

class BaseCreep extends BaseObject {
    /**
     *
     * @param {Creep} creep
     */
    constructor(creep) {
        super({
            gameObject: creep
        });
        this.name = creep.name;
        this.role = creep.memory.role;
        this.mode = creep.memory.mode;

        this.work();

        //this.printDebugInformation();
    }

    work() {
        if (this.isFullEnergy && this.mode !== MODES.MODE_GIVE_ENERGY) {
            this.mode = MODES.MODE_GIVE_ENERGY;
        } else if (this.isEmptyEnergy && this.mode === MODES.MODE_GIVE_ENERGY) {
            this.mode = MODES.MODE_TAKE_ENERGY;
        }
        console.log('MODE: ', this.mode);

    }

    get isFullEnergy() {
        return this.gameObject.store.energy === this.gameObject.store.getCapacity();
    }

    get isEmptyEnergy() {
        return this.gameObject.store.energy === 0;
    }

    printDebugInformation() {
        console.log(JSON.stringify(this));
    }
}

module.exports = BaseCreep;