/**
 * An assembler target section.
 * @constructor
 */
export const Section = function(name) {
    /// Section name (does not include leading '.'
    this.name = name;

    /// Program counter in the section
    this.pc = 0;

    /// The section binary data
    this.data = [];

    /// Source map that maps from a
    /// line in source code to a location
    /// in memory.
    this.sourceMap = {};

    /// The symbols associated with this object
    /// Name maps to object with attributes:
    /// name, value, global
    const symbols = {}

    /// Starting address of the section as loaded into memory
    let startingAddress = 0;

    this.relocate = (start) => {
        startingAddress = start;

        for(const line in this.sourceMap) {
            this.sourceMap[line].addr += start;
        }
    }

    /**
     * Add a byte of data to the section
     * @param byte
     */
    this.add = (byte) => {
        this.data.push(byte);
        this.pc++;
    }

    /**
     * Add source mapping. Maps a program counter
     * location in this section to a line in the program.
     * @param line Program line (starting at 1)
     * @param len Length of data at that location
     * @param pc Program counter. Optional. If not supplied, use current PC
     */
    this.addSourceMapping = (line, len, pc) => {
        if(pc === undefined) {
            pc = this.pc;
        }

        this.sourceMap[line] = {
            addr: pc,
            len: len
        }
    }

    /**
     * Add a symbol for this section
     * @param name Symbol name
     * @param value Symbol value
     * @param glbl Global?
     */
    this.addSymbol = (name, value, glbl) => {
        symbols[name] = {
            name: name,
            value: value,
            global: glbl
        }
    }

    /**
     * Get a symbol from the section symbol table
     * @param name Name of symbol
     * @returns {*}
     */
    this.getSymbol = (name) => {
        if(symbols.hasOwnProperty(name)) {
            return symbols[name];
        }

        return null;
    }

    this.getSymbols = () => {
        let result = [];
        for(let symbol in symbols) {
            result.push(symbols[symbol]);
        }

        return result;
    }


    this.load = (data) => {
        const lines = data.split(/\n/);

        // Just append if no supplied addresses
        let pc = this.data.length;

        for(const line of lines) {
            const items = line.split(/\s/);

            for(const item of items) {
                const match = item.match(/^([0-9a-fA-F]+):/);
                if(match !== null) {
                    pc = parseInt(match[1], 16);

                    while(pc > this.data.length) {
                        this.data.push(0);
                    }
                } else {
                    const byte = parseInt(item, 16);
                    if(pc === this.data.length) {
                        this.data.push(byte);
                    } else {
                        this.data[pc] = byte;
                    }

                    pc++;
                }
            }
        }
    }


}