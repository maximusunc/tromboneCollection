const router = require("express").Router();
const tromboneController = require("../../controllers/tromboneController.js");


// matches with /api/trombones
router.route("/")
    .get(tromboneController.findAll)
    .post(tromboneController.createTrombone);
    
// matches with /api/trombones/:id
router.route("/:id")
    .get(tromboneController.getTrombone)
    .put(tromboneController.updateTrombone)
    .delete(tromboneController.deleteTrombone);


module.exports = router;