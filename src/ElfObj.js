import {Section} from './Section';

/**
 * Local representation of an Executable and Linkable Format (ELF)
 * for binary machine code. Used as the output for build tools and
 * input to emulation.
 * @constructor
 */
export const ElfObj = function(size, bigEndian) {

    // Bit size for the destination system
    this.size = size !== undefined ? size : 64;
    this.bigEndian = bigEndian !== undefined ? bigEndian : false;

    // The sections for the file
    const section = {};

    this.getSection = (name) => {
        // Does it exist?
        if(!section.hasOwnProperty(name)) {
            // Create the section
            section[name] = new Section(name);
        }

        // Return it
        return section[name];
    }

    this.load = (data, sectionName) => {
        sectionName = sectionName === undefined ? 'text' : sectionName;
        const section = this.getSection(sectionName);
        section.load(data);
        return section;
    }
}