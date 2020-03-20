const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ root: {} })
  .write()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const config = JSON.parse(fs.readFileSync('config.json'));

app.use((req, res, next) => {

    var contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') === -1) {
        return res.status(401).json({ message: "invalid content type" })
    }

    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        return res.status(401).json({ message: 'missing authorization header' });
    }

    const token =  req.headers.authorization.split(' ')[1];
    if(token !== config.token) {
        return res.status(401).json({ message: 'bad authorization token' });
    }

    next();

})
  
app.get('/', (req, res) => {
    res.json(db.get('root').value())
})

app.put('/', (req, res) => {
    db.set('root', req.body).write()
    res.status(200).send()
})

app.listen(process.env.PORT || 5050)
