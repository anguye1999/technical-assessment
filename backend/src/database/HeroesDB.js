import { Hero } from "../types/Hero.js";

export class HeroesDB {
    static instance = undefined;
    heroes = []; // Database array

    /**
     * Gets an instance of the database
     * 
     * @returns {HeroesDB} An instance of HeroesDB
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new HeroesDB();
        }
        return this.instance;
    }

    /**
     * Gets all the heroes in the database
     * 
     * @returns {Hero[]} An array of heroes
     */
    getHeroes() {
        return this.heroes;
    }

    /**
     * Gets a hero with a specific id
     * 
     * @param {string} id 
     * @returns {Hero} A hero with the specified id
     */
    getHero(id) {
        return this.heroes.find(hero => hero.id === id);
    }

    /**
     * Create a hero to the database
     * 
     * @param {Hero} hero The hero to add to the database
     */
    createHero(hero) {
        this.heroes.push(hero);
    }

    /**
     * Updates a hero by id in the database
     * 
     * @param {string} id The id of the hero to update
     * @param {Partial<Hero>} heroUpdates A partial hero object
     */
    updateHero(id, heroUpdates) {
        const hero = this.getHero(id);
        this.deleteHero(id);
        hero.updateHero(heroUpdates);
        this.createHero(hero);
    }

    /**
     * Deletes a hero by id in the database
     * 
     * @param {string} id The id of the hero to delete
     */
    deleteHero(id) {
        const index = this.heroes.findIndex(hero => hero.id === id);
        if (index >= 0) {
            this.heroes.splice(index, 1);
        }
    }
}