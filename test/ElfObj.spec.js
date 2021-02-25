import {ElfObj} from '../src/ElfObj'


/*
 * Tests for ElfObj
 */
describe('ElfObj', function() {
    it('getSection', function() {
        const elf = new ElfObj();

        const text = elf.getSection('text');
        expect(text).not.toBeNull();

        expect(text.name).toBe('text');

        const data = elf.getSection('data');
        expect(data).not.toBeNull();

        expect(data.name).toBe('data');

        const text2 = elf.getSection('text');
        expect(text2).toEqual(text);
    });

});

