import express from 'express';
import { QuestsDB } from '../../database/QuestsDB.js';
import { Quest } from '../../types/Quest.js';
import { HeroesDB } from '../../database/HeroesDB.js';

/**
 * Returns the Quests Module express router
 * @returns {express.Router}
 */
export function questsRouter() {
    const router = express.Router();

    /**
     * Get all quests
     */
    router.get('/heroes/:heroId/quests', (req, res) => {
        const heroId = req.params.heroId;
        const hero = HeroesDB.getInstance().getHero(heroId);
    
        // check if hero exists
        // return 404 if does not exist
        if (!hero) {
            res.sendStatus(404);
        }
        res.send(QuestsDB.getInstance().getQuests());
    });

    /**
     * Gets a single quest by id
     */
    router.get('/heroes/:heroId/quests/:questId', (req, res) => {
        const heroId = req.params.heroId;
        const hero = HeroesDB.getInstance().getHero(heroId);
    
        // check if hero exists
        // return 404 if does not exist
        if (!hero) {
            res.sendStatus(404);
        }
        
        const questId = req.params.questId;
        const quest = QuestsDB.getInstance().getQuest(questId);
        
        if (!quest) {
            res.sendStatus(404);
        } 

        if (quest.heroId === hero.id) {
            res.send(quest);
        }
    });

    /**
     * Creates a quest
     */
    router.post('/heroes/:heroId/quests', (req, res) => {
        const heroId = req.params.heroId;
        const hero = HeroesDB.getInstance().getHero(heroId);
    
        // check if hero exists
        // return 404 if does not exist
        if (!hero) {
            res.sendStatus(404);
        }
        const body = req.body;
        const quest = new Quest(body);
        QuestsDB.getInstance().createQuest(quest);
        res.sendStatus(201);
    });

    /**
     * Updates a quest by id
     */
    router.patch('/heroes/:heroId/quests/:questId', (req, res) => {
        const heroId = req.params.heroId;
        const hero = HeroesDB.getInstance().getHero(heroId);
    
        // check if hero exists
        // return 404 if does not exist
        if (!hero) {
            res.sendStatus(404);
        }
        
        const questId = req.params.questId;
        const quest = QuestsDB.getInstance().getQuest(questId);
        
        if (!quest) {
            res.sendStatus(404);
        } 

        const body = req.body;
        if (hero.id !== quest.heroId) {
            res.sendStatus(400);
        }
        else {
            QuestsDB.getInstance().updateQuest(quest.id, body);
            res.sendStatus(204);
        }
    });

    /**
     * Deletes a quest by id
     */
    router.delete('/heroes/:heroId/quests/:questId', (req, res) => {
        const heroId = req.params.heroId;
        const hero = HeroesDB.getInstance().getHero(heroId);

        // check if hero exists
        // return 404 if does not exist
        if (!hero) {
            res.sendStatus(404);
        }
        
        const questId = req.params.questId;
        const quest = QuestsDB.getInstance().getQuest(questId);
        
        if (!quest) {
            res.sendStatus(404);
        } 

        if (quest.heroId !== hero.id) {
            res.sendStatus(400);
        } else {
            QuestsDB.getInstance().deleteQuest(quest.id);
            res.sendStatus(204);
        }
    });

    return router;
}