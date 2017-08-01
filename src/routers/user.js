var express = require('express')
var router = express.Router()
var db = require('../storage/db')

router.get('/me', function (req, res) {
    if (req.user) {
      return res.send(req.user);
    }
    console.log("sending 401")

    return res.sendStatus(401);
    
})

router.get('/:id', function (req, res) {

    if (req.user) {

    }

    db.getUser()
    res.send(req.user)

})


router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router;