const express = require('express');
const { createcategories,getcategoriesbyid,
    getcategories,
    updatecategories,
    deletecategories,createsubcategories,
    getsubcategoriesbyid,
    getsubcategories,
    updatesubcategories,
    deletesubcategories,  createitems,
    getitemsbyid,
    getitems,
    updateitems,
    deleteitems,
    getuserbyid,
    getuser,
    updateuser,
    deleteuser,
    createDiscount,
    getDiscountbyid,
    getDiscount,
    updateDiscount,
    deleteDiscount} = require('../controllers/Admincontroller');
const upload = require('../config/multerConfig');
const { getuser_profilebyid, getSelectionbyuserid } = require('../controllers/UserEnrolled');

const authenticateAdmin = require('../Middleware/authenticateAdmin');
const router = express.Router();

// Routes for form operations
router.post('/categories',authenticateAdmin,createcategories);
router.get("/categories/:id",authenticateAdmin, getcategoriesbyid);
router.get("/categories",authenticateAdmin, getcategories);
router.put("/categories/:category_id",authenticateAdmin, updatecategories);
router.delete("/categories/:category_id",authenticateAdmin, deletecategories);
router.post('/subcategories',authenticateAdmin,createsubcategories);
router.get("/subcategories/:id",authenticateAdmin, getsubcategoriesbyid);
router.get("/subcategories",authenticateAdmin, getsubcategories);
router.put("/subcategories/:subcategory_id",authenticateAdmin, updatesubcategories);
router.delete("/subcategories/:subcategory_id",authenticateAdmin, deletesubcategories);
router.post('/items',authenticateAdmin,upload.single('image_items'),createitems);
router.get("/items/:id",authenticateAdmin, getitemsbyid);
router.get("/items",authenticateAdmin, getitems);
router.put("/items/:item_id",authenticateAdmin,upload.single('image_items'), updateitems);
router.delete("/items/:item_id",authenticateAdmin, deleteitems);
router.get("/user/:id",authenticateAdmin, getuserbyid);
router.get("/user",authenticateAdmin, getuser);
router.put("/user/:id",authenticateAdmin, updateuser);
router.delete("/user/:id",authenticateAdmin, deleteuser);
router.post('/discount',authenticateAdmin,createDiscount);
router.get("/discount/:id",authenticateAdmin, getDiscountbyid);
router.get("/discount",authenticateAdmin,getDiscount);
router.put("/discount/:id",authenticateAdmin, updateDiscount);
router.delete("/discount/:id",authenticateAdmin, deleteDiscount);
router.get("/user-selection-by-userid-data/:id",authenticateAdmin, getSelectionbyuserid);    


router.get("/user-profile-data/:id",authenticateAdmin, getuser_profilebyid);

module.exports = router;