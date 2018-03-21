const router = require("express").Router();
const tromboneController = require("../../controllers/tromboneController.js");


// matches with /api/trombones
router.route("/")
    .get(tromboneController.findAll)
    .post(tromboneController.search);

// matches with /api/trombones/:id
router.route("/:id")
    .get(tromboneController.getTrombone)
    .delete(tromboneController.remove);


module.exports = router;