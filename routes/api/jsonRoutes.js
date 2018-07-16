const router = require("express").Router();
const tromboneController = require("../../controllers/tromboneController.js");
    
// matches with /api/details/:id
router.route("/:id")
    .get(tromboneController.getTrombone);


module.exports = router;