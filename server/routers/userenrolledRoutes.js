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
    deleteuser_Selection,
    getUserRecommendationById,
    updateOnlyUserFianlAmount,
    getSelectionbyuserid,} = require('../controllers/UserEnrolled');
const upload = require('../config/multerConfig');
const authenticateUser = require('../Middleware/authenticateUser');
const { getcategories, getcategoriesbyid, getsubcategoriesbyid, getitemsbyid, getDiscount } = require('../controllers/Admincontroller');

const router = express.Router();


router.post('/user-profile',authenticateUser,createUser); 
router.get("/user-profile/:id",authenticateUser,getuser_profilebyid,);
router.get("/user-profile",authenticateUser, getuser_profile);
router.put("/user-profile/:id",authenticateUser, updateuser_profile);
router.delete("/user-profile/:id",authenticateUser, deleteuser_profile);
router.post('/user-selection',authenticateUser,createUserSelection); 
router.get("/user-selection/:id",authenticateUser, getSelectionbyid);    
router.get("/user-selection-by-userid/:id",authenticateUser, getSelectionbyuserid);    


router.get("/user-selection",authenticateUser, getuser_Selection);
router.put("/user-selection/:id",authenticateUser, updateuser_Selection);
router.delete("/user-selection/:id",authenticateUser, deleteuser_Selection);

router.get("/user-recommendation/:id",authenticateUser, getUserRecommendationById);

router.put("/user-final-amount/:id",authenticateUser, updateOnlyUserFianlAmount);

router.get('/categories-data',authenticateUser,getcategories);
router.get("/categories-data/:id",authenticateUser, getcategoriesbyid);
router.get("/subcategories-data/:id",authenticateUser, getsubcategoriesbyid);
router.get("/items-data/:id",authenticateUser, getitemsbyid);
router.get("/discount-data",authenticateUser,getDiscount);



module.exports = router;