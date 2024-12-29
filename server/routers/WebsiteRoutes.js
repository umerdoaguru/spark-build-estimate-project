const express = require('express');
const router = express.Router();
const { saveWebsiteAPI,updateWebsiteAPI,deleteWebsiteAPI, getwebsite_api} = require('../controllers/WebsiteController');


// Routes for form operations
router.post('/website-api', saveWebsiteAPI);
router.put('/update-website-api', updateWebsiteAPI);
router.delete('/delete-website-api/:id', deleteWebsiteAPI);
router.get('/get-website-api', getwebsite_api);


module.exports = router;
