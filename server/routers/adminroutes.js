const express = require('express');
const { createcategories,getcategoriesbyid,
    getcategories,
    updatecategories,
    deletecategories, } = require('../controllers/Admincontroller');
const router = express.Router();

// Routes for form operations
router.post('/categories',createcategories);
router.get("/categories/:id", getcategoriesbyid);
router.get("/categories", getcategories);
router.put("/categories/:category_id", updatecategories);
router.delete("/categories/:category_id", deletecategories);

module.exports = router;