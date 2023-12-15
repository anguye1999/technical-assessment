import { v4 as uuid } from 'uuid';

export class Quest {
    /**
     * Creates a new quest object
     * 
     * @param {*} args 
     */ 
    constructor(args) {
        this.id = uuid();
        this.name = args.name || 'Some Quest';
        this.descript = args.descript || 'Some description';
        this.heroId = args.heroId || 1234; 
    }

    /**
    * Updates the quest class with new update values
    * 
    * @param {Partial<Quest>} args
    */
    updateQuest(args) {
        if (args.name) {
          this.name = args.name;
        }
        if (args.descript) {
          this.descript = args.descript;
        }
        if (args.heroId) {
          this.heroId = args.heroId;
        }
    }
}