var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send('Analysis')
})

router.get('/tours', (req, res) => {
    
})


router.get('/tours/{id}', (req, res) => {
    
})

router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router;    