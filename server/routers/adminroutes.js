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
const router = express.Router();

// Routes for form operations
router.post('/categories',createcategories);
router.get("/categories/:id", getcategoriesbyid);
router.get("/categories", getcategories);
router.put("/categories/:category_id", updatecategories);
router.delete("/categories/:category_id", deletecategories);
router.post('/subcategories',createsubcategories);
router.get("/subcategories/:id", getsubcategoriesbyid);
router.get("/subcategories", getsubcategories);
router.put("/subcategories/:subcategory_id", updatesubcategories);
router.delete("/subcategories/:subcategory_id", deletesubcategories);
router.post('/items',upload.single('image_items'),createitems);
router.get("/items/:id", getitemsbyid);
router.get("/items", getitems);
router.put("/items/:item_id",upload.single('image_items'), updateitems);
router.delete("/items/:item_id", deleteitems);
router.get("/user/:id", getuserbyid);
router.get("/user", getuser);
router.put("/user/:id", updateuser);
router.delete("/user/:id", deleteuser);
router.post('/discount',createDiscount);
router.get("/discount/:id", getDiscountbyid);
router.get("/discount",getDiscount);
router.put("/discount/:id", updateDiscount);
router.delete("/discount/:id", deleteDiscount);



module.exports = router;