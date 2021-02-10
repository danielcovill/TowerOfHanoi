const Disc = require('./Disc');

module.exports = class Board {
    _pinLeft = [];
    _pinCenter = [];
    _pinRight = [];
    _discCount = 0;

    constructor(discCount) {
        if(isNaN(discCount)) {
            throw 'diskCount must be a number';
        }
        this._discCount = discCount;
        for (let i = discCount; i > 0; i--) {
            this._pinLeft.push(new Disc(i));
        }
    }

    moveDisk(fromPin, toPin) {

    }

    // 'Draws' the board to the terminal
    toString() {
        let result = '\n';
        const maxHeight = Math.max(this._pinLeft.length, this._pinCenter.length, this._pinRight.length);
        for (let i = maxHeight - 1; i >= 0; i--) {
            const pinLeftDiscSize = this._pinLeft[i] && this._pinLeft[i].size || 0;
            const pinCenterDiscSize = this._pinCenter[i] && this._pinCenter[i].size || 0;
            const pinRightDiscSize = this._pinRight[i] && this._pinRight[i].size || 0;
            let boardRow = '-'.repeat(pinLeftDiscSize).padStart(this._discCount) + '|' + '-'.repeat(pinLeftDiscSize).padEnd(this._discCount);
            boardRow = boardRow.concat('-'.repeat(pinCenterDiscSize).padStart(this._discCount) + '|' + '-'.repeat(pinCenterDiscSize).padEnd(this._discCount));
            boardRow = boardRow.concat('-'.repeat(pinRightDiscSize).padStart(this._discCount) + '|' + '-'.repeat(pinRightDiscSize).padEnd(this._discCount));
            result = result.concat(boardRow + '\n');
        }
        return result;
    }
}