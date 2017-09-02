var express = require('express')
var router = express.Router()
var db = require('../storage/db')
var tourRouter;

router.get('/me', function (req, res) {
    console.log("sending back")
    console.log(req.user.displayName)
    return res.status(200).send(req.user);
})

// router.get('/{id}', function (req, res) {


//     if (req.user) {

//     }

//     db.getUser()
//     res.send(req.user)
// })


// router.use('/{id}/tours', tourRouter);

// router.use('/{id}/alerts', tourRouter);

router.get('*', (req, res) => {
    res.sendStatus(404);
})



module.exports = router;