const supertest = require('supertest');
const app = require('../../server/app');

describe('message', () => {
    
    it(
        'message/',
        async () => {
            const response = await supertest(app).post('/message').send({jobName: 'add-tree-test', payload: {treeId: '0101010101'}});
            expect(response.status).toBe(200); // eslint-disable-line
            expect(response.body.job.name).toEqual('add-tree-test'); // eslint-disable-line
            expect(response.body.job.data).toMatchObject({ // eslint-disable-line
                treeId: '0101010101'
            }) 
        },
        1000 * 30
    )
})