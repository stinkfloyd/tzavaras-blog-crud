const chai = require(`chai`)
const app = require(`../app.js`)
const path = require(`path`)
const fs = require(`fs`)
const { expect } = chai

chai.use(require(`chai-http`))

describe(`app.js`, () => {
  it(`responds to a get at / with public/index.html`, (done) => {
      chai.request(app)
        .get(`/`)
        .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.text).to.equal(fs.readFileSync(path.join(__dirname, `../public`, `index.html`), `utf-8`))
            done()
        })
  })

  it(`responds to a get at /blogs with ALL RECORDS`, (done) => {
      chai.request(app)
        .get(`/blogs`)
        .end((err, res) => {
            expect(res.status).to.equal(200)
	        expect(res.text).to.equal(`ALL RECORDS`)
            done()
      })
  })

  it(`responds to a get at /blogs/id with ONE RECORD`, (done) => {
      chai.request(app)
        .get(`/blogs/1`)
        .end((err, res) => {
            expect(res.status).to.equal(200)
	        expect(res.text).to.equal(`ONE RECORD`)
            done()
      })
  })

  it(`responds to a post at /blogs with CREATED RECORD`, (done) => {
      chai.request(app)
        .post(`/blogs`)
        .end((err, res) => {
            expect(res.status).to.equal(201)
	        expect(res.text).to.equal(`CREATED RECORD`)
            done()
      })
  })

  it(`responds to a put at /blogs/id with UPDATED RECORD`, (done) => {
      chai.request(app)
        .put(`/blogs/1`)
        .end((err, res) => {
            expect(res.status).to.equal(200)
	        expect(res.text).to.equal(`UPDATED RECORD`)
            done()
      })
  })

  it(`responds to a delete at /blogs/id with DELETED RECORD`, (done) => {
      chai.request(app)
        .delete(`/blogs/1`)
        .end((err, res) => {
            expect(res.status).to.equal(200)
	        expect(res.text).to.equal(`DELETED RECORD`)
            done()
      })
  })
})
