const router = require('express').Router();

const Friend = require('./friendModel');

router 
    .route('/')
    .get((req, res) => {
        Friend.find().then(response =>{
            res.status(200).json({response})
        })
    .catch(err => res.status(500).json({errorMessage: "The friends information could not be retrieved."}))
})
    .post((req, res) => {
        const {firstName, lastName, age} = req.body;
        const friend = new Friend({firstName, lastName, age})
            if (!firstName || !lastName || !age){
                 return res.status(400).json({errorMessage: "Please provide firstName, lastName and age for the friend."})
    } 
    res.status(200).json(friend)
    .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." }))
})
router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params;
        Friend.findById(id).then(foundFriend => {
            console.log(foundFriend);
            if(foundFriend === null){
                res.status(404).json({errorMessage: 'sorry, no friends for you..'})
                return;
            }
            res.status(200).json(foundFriend);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'no friend in the db'})
        });
    })
    .delete((req, res) => {
        const {id} = req.params;
        Friend.findByIdAndRemove(id)
         .then(destroyFriend => {
             console.log(destroyFriend)
             if(destroyFriend === null){
                 res.status(404).json({errorMessage: "there is no frienemy to to destroy "});
                 return;
             }
             res.status(200).json({success: 'Freindship destroyed', resource: destroyFriend})
         })
         .catch(err => {
            res.status(500).json({errorMessage: 'no friend in the db to destroy'})
         });
    })
    .put((req, res ) => {
        const {id} = req.params;
        const updated = ({firstName, lastName, age} = req.body);
        Friend.findByIdAndUpdate(id, updated, {new: true})
            .then(friendUpdated => {
                if(friendUpdated === null){
                    res.status.json({errorMessage: "No friend to update with that id"})
                    return;
                }
                res.status(200).json({success: "Friend updated like new", resource: friendUpdated})
            })
            .catch(err => {
                res.status(500).json({errorMessage: 'no friend in the system to update'})
            });
    })
module.exports = router;