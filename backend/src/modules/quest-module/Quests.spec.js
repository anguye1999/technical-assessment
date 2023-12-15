import { supertestSetup } from "../../test/SupertestSetup";

// router function
const request = supertestSetup(undefined);
let h_ID = '';
let q_ID = '';
//---
let h2_ID = '';
let q2_ID = '';
describe('Quests Module', () => {
    beforeAll(async () => {
        // Create a hero
        await request.post('/heroes')
        .send({
            name: 'He Man',
            class: 'Barbarian',
            level: 50,
        });
        const res1 = await request.get('/heroes');
        h_ID = res1.body[0].id;

        // Get a quest id to use for getting/updating/deleting
        await request.post(`/heroes/${h_ID}/quests`)
            .send({
                name: 'Some Quest',
                descript: 'Some description',
                heroId: h_ID,
            });
        const res = await request.get(`/heroes/${h_ID}/quests`);
        q_ID = res.body[0].id;

        // ---- Separate the below
        
        await request.post('/heroes')
        .send({
            name: 'Andy Man',
            class: 'Priest',
            level: 60,
        });
        const res2 = await request.get('/heroes');
        h2_ID = res2.body[1].id;

        // Get a quest id to use for getting/updating/deleting
        await request.post(`/heroes/${h2_ID}/quests`)
            .send({
                name: 'Priest Quest',
                descript: 'Priest description',
                heroId: h2_ID,
            });
            
        const res3 = await request.get(`/heroes/${h2_ID}/quests`);
        q2_ID = res3.body[1].id;
    });

    //Get for all quests 
    describe('GET /heroes/:id/quests', () => {
        it('should return a 200 for a found quest', done => {
            request.get(`/heroes/${h_ID}/quests`)
                .expect(200, done);
        });
        it('should return a 404 for not found quest', done => {
            request.get(`/heroes/abc/quests`)
                .expect(404, done);
        });
    });

    //Get a single quest
    describe('Get /heroes/:heroId/quest/questId:', () => {
        it('should return a 200 for a found quest', done => {
            request.get(`/heroes/${h_ID}/quests/${q_ID}`)
                .expect(200, done);
        });    
        
        it('should return a 404 for not found quest', done => {
            request.get(`/heroes/${h_ID}/quests/abc`)
                .expect(404, done);
        });
    }); 

    // Create one quest
    describe('POST /heroes/:id/quests', () => {
        it('should return a 201 for complete quest', done => {
            request.post(`/heroes/${h_ID}/quests`)
                .send({
                    name: 'Another Quest',
                    descript: 'Another description',
                    heroId: h_ID,
                })
                .expect(201, done);
        });
        it('should return a 404 for no hero found with given ID', done =>{
            request.post(`/heroes/abc/quests`)
                .send({
                    name: 'Another Quest',
                    descript: 'Another description',
                    heroId: 'abc',
                })
                .expect(404, done);
        })
    });
    // Update a quest
    describe('PATCH /heroes/:heroId/quests/:questId', () => {
        it('should return a 204 for an updated quest', done => {
            request.patch(`/heroes/${h_ID}/quests/${q_ID}`)
                .send({
                    name: 'Some Quest'
                })
                .expect(204, done);
        });
        it('should return a 400 for Route hero ID does not match Quest hero ID', done => {
            request.patch(`/heroes/${h_ID}/quests/${q2_ID}`)
                .send({
                    descript: 'Some description'
                })
                .expect(400, done);
        });
        it('should return a 404 for a not found quest', done => {
            request.patch(`/heroes/${h_ID}/quests/abc`)
                .send({
                    descript: 'Some description'
                })
                .expect(404, done);
        });
        it('should return a 404 for a not found hero', done => {
            request.patch(`/heroes/abc/quests/${q_ID}`)
                .send({
                    descript: 'Some description'
                })
                .expect(404, done);
        });
        
    });

    //Delete a quest
    describe('DELETE /heroes/:heroId/quests/:questId', () => {
        it('should return a 204 for a deleted quest', done => {
            request.delete(`/heroes/${h_ID}/quests/${q_ID}`)
                .expect(204, done);
        });
        it('should return a 400 for Route hero ID does not match Quest hero ID in database', done => {
            request.delete(`/heroes/${h_ID}/quests/${q2_ID}`)
                .expect(400, done);
        });
        it('should return a 404 for a not found quest', done => {
            request.delete(`/heroes/abc/quests/${q_ID}`)
                .expect(404, done);
        });
        it('should return a 404 for a not found hero', done => {
            request.delete(`/heroes/${h_ID}/quests/abc`)
                .expect(404, done);
        });
    });
});

