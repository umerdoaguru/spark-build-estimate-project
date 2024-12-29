const express = require('express');
const { createcategories,getcategoriesbyid,
    getcategories,
    updatecategories,
    deletecategories,createsubcategories,
    getsubcategoriesbyid,
    getsubcategories,
    updatesubcategories,
    deletesubcategories, } = require('../controllers/Admincontroller');
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

module.exports = router;