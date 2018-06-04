const router = require('express').Router();

const Friend = require('./friendModel');

router 
    .route('/')
    .get((req, res) => { Friend.find()
        .then(friends =>{
        res.status(200).json(friends)
    })
    .catch(err => res.status(500),json({errorMessage: "The friends information could not be retrieved."}))
})
.post((req, res) => {
    const {firstName, lastName, age} = req.body;
    const newFriend = new Friend({firstName, lastName, age})
    if (!firstName || !lastName || !age){
        return res.status(400).json({errorMessage: "Please provide firstName, lastName and age for the friend."})
    }
    res.status(200).json(friends)
    .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." }))
})


module.exports = router;