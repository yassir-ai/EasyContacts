const { spawn } = require('child_process');
const { join } = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiArrays = require('chai-arrays');
const chaiThings = require('chai-things');
const witch = require('witch');
const chaiSubset = require('chai-subset');
const ChaiUUID = require('chai-uuid');
const { env } = require('process');
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);
chai.use(chaiArrays);
chai.use(chaiThings);
chai.use(chaiSubset);
chai.use(ChaiUUID);

let projectPath = ""
if (process.env.APP_PATH) {
    projectPath = process.env.APP_PATH
} else {
    projectPath = join(__dirname, '../../../', 'packages/express-middleware')
}
const scriptPath = join(projectPath, 'server.js');


function wait() {
    return new Promise((resolve) => {
        setTimeout(() => { 
            resolve()
        }, 3000);
    })
}

function startServer() {
    const ps = spawn(
        "/usr/local/bin/node", [`${scriptPath}`],  
        {
            env: {
                ...process.env.PATH,
                BACKEND_PORT: 10201,
                JWT_SECRET: "qwertyuiopasdfghjklzxcvbnm123456",
                NODE_ENV: 'production',
                SUBJECT: process.env.SUBJECT,
                DB_PATH: process.env.DB_PATH
            },
            shell: true
        }
    )

    ps.stdout.setEncoding('utf8');
    ps.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });

    ps.stderr.setEncoding('utf8');
    ps.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    return ps;
}

const jwt_user1 = jwt.sign(
    {
        sub: '0e7de9a9-7a2e-4b5a-b42d-3df2a9c0455e'
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' },
);

const jwt_user2 = jwt.sign(
    {
        sub: '4302b97f-b429-4648-8b51-73645e6fd269'
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' },
);

const subject = process.env.SUBJECT
const PORT = 10201
const server = `http://localhost:${PORT}`

function request() {
    const r = chai.request(server);
    return r
}

let psServer
describe('API', () => {
    before(function (done) {
        this.timeout(10201)
        psServer = startServer()
        wait().then(() => { 
            done();}
        )
    })

    after(function(done) {
        psServer.kill()
        done()
    });

    describe('Get All', () => {
        it ('it should return 401 without jwt', (done) => {
            request()
                .get(`/${subject}/`).then((res) => {
                    chai.expect(res).to.have.status(401);
                    done()
                }).catch(done)
        })

        it('it should be return 2 elements with user 1', (done) => {
            request()
                .get(`/${subject}/`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.array();
                    chai.expect(res.body).to.have.lengthOf(2)
                    chai.expect(res.body).to.containSubset(
                        JSON.parse(`{{{stringify userone }}}`)
                    )
                    done()
                }).catch(done)
        })
    })

    describe('Get One', () => {
        it ('it should return 401 without jwt', (done) => {
            request()
                .get(`/${subject}/51a7b6cd-c3d2-4ee0-bf09-9f340e2a156e`).then((res) => {
                    chai.expect(res).to.have.status(401);
                    done()
                }).catch(done)
        })

        it('it should return 404', done => {
            request()
                .get(`/${subject}/51a7b6cd-c3d2-4ee0-bf09-9f340e2a156e`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .then((res) => {
                    chai.expect(res).to.have.status(404);
                    done()
                }).catch(done)
        })

        it('it should be return the element by id', (done) => {
            request()
                .get(`/${subject}/ad1afbd2-77d2-404e-bbca-3f352f7f09a2`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.containSubset(
                        JSON.parse(`{{{stringify item1 }}}`)
                    )
                    done()
                }).catch(done)
        })


    })

    describe('Post', () => {
        it('it should return 401 without jwt', (done) => {
            request()
                .get(`/${subject}/51a7b6cd-c3d2-4ee0-bf09-9f340e2a156e`).then((res) => {
                    chai.expect(res).to.have.status(401);
                    done()
                }).catch(done)
        })

        {{#each post}}
        it('it should return 422 when {{ this.name }}', (done) => {
            request()
                .post(`/${subject}/`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .set('Content-type', 'application/json')
                .send('{{{stringify this.payload }}}')
                .then((res) => {
                    chai.expect(res).to.have.status(422);
                    done()
                }).catch(done)
        })
        {{/each}}

        it(`it should return 201 when create a valid ${subject}`, (done) => {
            request()
                .post(`/${subject}/`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .set('Content-type', 'application/json')
                .send('{{{ stringify createBody }}}')
                .then((res) => {
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body).to.containSubset(
                        JSON.parse(`{{{stringify createBody }}}`)
                    )
                    chai.expect(res.body.uuid).to.be.a.uuid('v4') 
                    done()
                }).catch(done)
        })
    })

    describe('Put', () => {
        it ('it should return 401 without jwt', (done) => {
            request()
                .put(`/${subject}/ad1afbd2-77d2-404e-bbca-3f352f7f09a2`).then((res) => {
                    chai.expect(res).to.have.status(401);
                    done()
                }).catch(done)
        })

        {{#each put}}
        it('it should return 422 when {{ this.name }}', (done) => {
            request()
                .put(`/${subject}/ad1afbd2-77d2-404e-bbca-3f352f7f09a2`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .set('Content-type', 'application/json')
                .send('{{{stringify this.payload }}}')
                .then((res) => {
                    chai.expect(res).to.have.status(422);
                    done()
                }).catch(done)
        })
        {{/each}}
    })

    describe('Delete', () => {
        it ('it should return 401 without jwt', (done) => {
            request()
                .delete(`/${subject}/51a7b6cd-c3d2-4ee0-bf09-9f340e2a156e`).then((res) => {
                    chai.expect(res).to.have.status(401);
                    done()
                }).catch(done)
        })

        it ('it should be return 404 when iteme to delete doesn\'t exist', (done) => {
            request()
                .delete(`/${subject}/51a7b6cd-c3d2-4ee0-bf09-9f340e2a156e`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .then((res) => {
                    chai.expect(res).to.have.status(404);
                    done()
                })
                .catch(done)
        })

        it ('it should be return 204 when iteme to delete exist', (done) => {
            request()
                .delete(`/${subject}/ad1afbd2-77d2-404e-bbca-3f352f7f09a2`)
                .set('Authorization', `Bearer ${jwt_user1}`)
                .then((res) => {
                    chai.expect(res).to.have.status(204);
                    done()
                })
                .catch(done)
        })

    })
})