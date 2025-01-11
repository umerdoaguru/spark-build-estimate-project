const express = require('express');
const {   createUser,
    getuser_profilebyid,
    getuser_profile,

    deleteuser_profile,
    updateuser_profile,
    createUserSelection,
    getSelectionbyid,
    getuser_Selection,
    updateuser_Selection,
    deleteuser_Selection,} = require('../controllers/UserEnrolled');
const upload = require('../config/multerConfig');
const router = express.Router();


router.post('/user-profile',createUser); 
router.get("/user-profile/:id", getuser_profilebyid);
router.get("/user-profile", getuser_profile);
router.put("/user-profile/:id", updateuser_profile);
router.delete("/user-profile/:id", deleteuser_profile);
router.post('/user-selection',createUserSelection); 
router.get("/user-selection/:id", getSelectionbyid);
router.get("/user-selection", getuser_Selection);
router.put("/user-selection/:id", updateuser_Selection);
router.delete("/user-selection/:id", deleteuser_Selection);



module.exports = router;