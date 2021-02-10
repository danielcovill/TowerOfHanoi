module.exports = class Disc {
    constructor(size) {
        if(isNaN(size)) {
            throw "Size must be a number";
        }
        this.size = size;
    }
}