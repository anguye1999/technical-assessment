import { v4 as uuid } from 'uuid';

export class Hero {
    /**
     * Creates a new hero object
     * 
     * @param {*} args An object containing hero properties
     */
    constructor(args) {
        this.id = uuid();
        this.name = args.name || 'John Doe';
        this.class = args.class || 'Mage';
        this.level = args.level || 100;
    }

    /**
     * Updates the hero class with new update values
     * 
     * @param {Partial<Hero>} args The partial hero object
     */
    updateHero(args) {
        if (args.name) {
            this.name = args.name;
        }
        if (args.class) {
            this.class = args.class;
        }
        if (args.level) {
            this.level = args.level;
        }
    }
}