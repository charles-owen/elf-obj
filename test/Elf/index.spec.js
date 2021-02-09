import {ElfObj} from '../..';

/*
 * Simple sanity check to ensure index.js exports the Assembler okay.
 */
describe('index', function() {
    it('Construct', function() {
        const elf = new ElfObj();
    });

});

