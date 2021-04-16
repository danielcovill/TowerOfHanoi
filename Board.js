import Disc from './Disc.js';

export default class Board {
    pinLeft = { name: "left", discs: [] };
    pinCenter = { name: "center", discs: [] };
    pinRight = { name: "right", discs: [] };
    _discCount = 0;
    _stateChangeCallback;
    _moveFrequency = 5;

    constructor(discs, stateChangeCallback) {
        this._stateChangeCallback = stateChangeCallback;
        if (isNaN(discs)) {
            throw 'diskCount must be a number';
        }
        this._discCount = discs;
    }

    setDiscs(doneCallback, discCount = this._discCount) {
        if (discCount <= 0) {
            doneCallback();
        } else {
            this.pinLeft.discs.push(new Disc(discCount));
            this._stateChangeCallback(this.getState());
            setTimeout(() => {
                this.setDiscs(doneCallback, discCount - 1);
            }, this._moveFrequency);
        }
    }

    movePileIterative(fromPin, toPin) {
        const movesRequired = Math.pow(2, this._discCount) - 1;
        let sparePin;
        if (fromPin !== this.pinLeft && toPin !== this.pinLeft) {
            sparePin = this.pinLeft;
        } else if (fromPin !== this.pinRight && toPin !== this.pinRight) {
            sparePin = this.pinRight
        } else if (fromPin !== this.pinCenter && toPin !== this.pinCenter) {
            sparePin = this.pinCenter;
        } else {
            throw "Invalid pin specified";
        }

        let destinationPin;
        let auxPin;
        if (this._discCount % 2 === 0) {
            destinationPin = sparePin;
            auxPin = toPin;
        } else {
            destinationPin = toPin;
            auxPin = sparePin;
        }
        setTimeout(() => {
            this.moveIteration(1, movesRequired, fromPin, auxPin, destinationPin);
        }, this._moveFrequency);
    }
    
    moveIteration(iteration, movesRequired, fromPin, auxPin, destinationPin) {
        let fromSize;
        let toSize;
        switch (iteration % 3) {
            case 1:
                fromSize = fromPin.discs[fromPin.discs.length - 1]?.size;
                toSize = destinationPin.discs[destinationPin.discs.length - 1]?.size;
                if (fromSize == toSize) throw "Bad pin state";
                if (toSize === undefined || fromSize < toSize) {
                    this.moveDisc(fromPin, destinationPin);
                } else {
                    this.moveDisc(destinationPin, fromPin);
                }
                break;
            case 2:
                fromSize = fromPin.discs[fromPin.discs.length - 1]?.size;
                toSize = auxPin.discs[auxPin.discs.length - 1]?.size;
                if (fromSize == toSize) throw "Bad pin state";
                if (toSize === undefined || fromSize < toSize) {
                    this.moveDisc(fromPin, auxPin);
                } else {
                    this.moveDisc(auxPin, fromPin);
                }
                break;
            case 0:
                fromSize = auxPin.discs[auxPin.discs.length - 1]?.size;
                toSize = destinationPin.discs[destinationPin.discs.length - 1]?.size;
                if (fromSize == toSize) throw "Bad pin state";
                if (toSize === undefined || fromSize < toSize) {
                    this.moveDisc(auxPin, destinationPin);
                } else {
                    this.moveDisc(destinationPin, auxPin);
                }
                break;
            default:
                throw "Unexpected movement";
        }
        if (iteration < movesRequired) {
            setTimeout(() => {
                this.moveIteration(++iteration, movesRequired, fromPin, auxPin, destinationPin);
            }, this._moveFrequency);
        }
    }

    movePileRecursive(fromPin, toPin, depth = fromPin.discs.length) {
        // if depth is zero, we're not moving anything
        if (depth === 0) {
            return;
        }
        // if both pins are the same, we messed up
        if (fromPin === toPin) {
            throw "Attempted to move to/from the same pin";
        }

        // if either pin hasn't been specified, we messed up
        if (!fromPin || !toPin) {
            throw "No pin selected";
        }

        // if the from pin is empty, there's nothing to do
        if (fromPin.discs.length === 0) {
            throw "Invalid pin selection, source pin is empty";
        }

        //figure out which pin is the spare
        let sparePin;
        if (fromPin !== this.pinLeft && toPin !== this.pinLeft) {
            sparePin = this.pinLeft;
        } else if (fromPin !== this.pinRight && toPin !== this.pinRight) {
            sparePin = this.pinRight
        } else if (fromPin !== this.pinCenter && toPin !== this.pinCenter) {
            sparePin = this.pinCenter;
        } else {
            throw "Invalid pin specified";
        }

        // move the fromPin pile to the sparePin except the last disc
        this.movePileRecursive(fromPin, sparePin, depth - 1);
        // move the last disk of fromPin to the finalPin
        this.moveDisc(fromPin, toPin);
        // if there's anything left on the sparePin, move the entire pile to the finalPin
        this.movePileRecursive(sparePin, toPin, depth - 1);

    }

    moveDisc(fromPin, toPin) {
        if (fromPin.discs.length === 0 || (toPin.discs.length > 0 && fromPin.discs[fromPin.discs.length - 1].size > toPin.discs[toPin.discs.length - 1].size)) {
            throw "Invalid move";
        } else {
            toPin.discs.push(fromPin.discs.pop());
            this._stateChangeCallback(this.getState());
        }
    }

    toString() {
        let result = '\n';
        for (let i = this._discCount - 1; i >= 0; i--) {
            const pinLeftDiscSize = this.pinLeft.discs[i] && this.pinLeft.discs[i].size || 0;
            const pinLeftPipeChar = pinLeftDiscSize > 0 ? '+' : '|';
            const pinCenterDiscSize = this.pinCenter.discs[i] && this.pinCenter.discs[i].size || 0;
            const pinCenterPipeChar = pinCenterDiscSize > 0 ? '+' : '|';
            const pinRightDiscSize = this.pinRight.discs[i] && this.pinRight.discs[i].size || 0;
            const pinRightPipeChar = pinRightDiscSize > 0 ? '+' : '|';

            let boardRow = '-'.repeat(pinLeftDiscSize).padStart(this._discCount) + pinLeftPipeChar + '-'.repeat(pinLeftDiscSize).padEnd(this._discCount);
            boardRow = boardRow.concat('-'.repeat(pinCenterDiscSize).padStart(this._discCount) + pinCenterPipeChar + '-'.repeat(pinCenterDiscSize).padEnd(this._discCount));
            boardRow = boardRow.concat('-'.repeat(pinRightDiscSize).padStart(this._discCount) + pinRightPipeChar + '-'.repeat(pinRightDiscSize).padEnd(this._discCount));
            result = result.concat(boardRow + '\n');
        }
        return result;
    }

    getState() {
        let result = {
            pinLeft: this.pinLeft.discs.map(disc => disc.size),
            pinCenter: this.pinCenter.discs.map(disc => disc.size),
            pinRight: this.pinRight.discs.map(disc => disc.size),
            discCount: this._discCount
        }
        return result;
    }
}