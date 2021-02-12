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

        this._mode = creep.memory.mode;
        this._target = creep.memory.target;


        console.log(`--- Creep [${this.name}] ---`);
        console.log(`Role ${this.role}`);

        this.determineMode();

        console.log(`Mode ${this.mode}`);

        if (this.mode === MODES.MODE_GIVE_ENERGY) {
            this.work(this.gameObject);
        } else {
            this.charge();
        }


        //this.printDebugInformation();
    }

    determineMode() {
        if (this.mode === MODES.MODE_GIVE_ENERGY && this.isEmptyEnergy) {
            // Energy is empty, creep finished to give energy, need to find source.
            this.mode = MODES.MODE_TAKE_ENERGY;
            return;
        } else if (this.mode === MODES.MODE_TAKE_ENERGY && this.isFullEnergy) {
            // Energy is full, need to find target to spend.
            this.mode = MODES.MODE_GIVE_ENERGY;
            return;
        }

        if (this.mode !== MODES.MODE_GIVE_ENERGY) {
            this.mode = MODES.MODE_TAKE_ENERGY;
        }
    }

    work() {

    }

    charge() {
        console.log('- charging -');
        if (!this.target) {
            const target = this.gameObject.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (this.gameObject.harvest(target) === ERR_NOT_IN_RANGE) {
                this.gameObject.moveTo(target);
            }
        }
    }

    get isFullEnergy() {
        return this.gameObject.store.energy === this.gameObject.store.getCapacity();
    }

    get isEmptyEnergy() {
        return this.gameObject.store.energy === 0;
    }

    set mode(mode) {
        this._mode = mode;
        this.gameObject.memory.mode = mode;
    }

    get mode() {
        return this._mode;
    }

    set target(target) {
        this._target = target;
        this.gameObject.memory.target = target;
    }

    get target() {
        return this._target;
    }

    printDebugInformation() {
        console.log(JSON.stringify(this));
    }
}

module.exports = BaseCreep;
