import { supertestSetup } from "../../test/SupertestSetup";

// Heroes module already initialized in function so no need to send
// router function
const request = supertestSetup(undefined);
let ID = '';

describe('Heroes Module', () => {
    beforeAll(async () => {
        // Get a hero id to use for getting/updating/deleting
        await request.post('/heroes')
            .send({
                name: 'He Man',
                class: 'Barbarian',
                level: 50,
            });
        const res = await request.get('/heroes');
        ID = res.body[0].id;
    });

    describe('GET /heroes', () => {
        it('should return a 200 for all heroes', done => {
            request.get('/heroes')
                .expect(200, done);
        });
    });

    describe('GET /heroes/:id', () => {
        it('should return a 200 for a found hero', done => {
            request.get(`/heroes/${ID}`)
                .expect(200, done);
        });
        it('should return a 404 for not found hero', done => {
            request.get('/heroes/abc')
                .expect(404, done);
        });
    });

    describe('POST /heroes', () => {
        it('should return a 201 for complete hero', done => {
            request.post('/heroes')
                .send({
                    name: 'John Doe',
                    class: 'Mage',
                    level: 100,
                })
                .expect(201, done);
        });
    });

    describe('PATCH /heroes/:id', () => {
        it('should return a 204 for a updated hero', done => {
            request.patch(`/heroes/${ID}`)
                .send({
                    name: 'Jane Doe'
                })
                .expect(204, done);
        });
        it('should return a 404 for a not found hero', done => {
            request.patch(`/heroes/abc`)
                .send({
                    class: 'Rogue'
                })
                .expect(404, done);
        });
    });

    describe('DELETE /heroes/:id', () => {
        it('should return a 204 for a deleted hero', done => {
            request.delete(`/heroes/${ID}`)
                .expect(204, done);
        });
        it('should return a 404 for a not found hero', done => {
            request.delete(`/heroes/${ID}`)
                .expect(404, done);
        });
    });
});
