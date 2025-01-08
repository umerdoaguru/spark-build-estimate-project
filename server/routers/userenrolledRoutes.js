const express = require('express');
const {   createUser,
    getuser_profilebyid,
    getuser_profile,

    deleteuser_profile,
    updateuser_profile,} = require('../controllers/UserEnrolled');
const router = express.Router();


router.post('/user-profile',createUser); 
router.get("/user-profile/:id", getuser_profilebyid);
router.get("/user-profile", getuser_profile);
router.put("/user-profile/:id", updateuser_profile);
router.delete("/user-profile/:id", deleteuser_profile);



module.exports = router;