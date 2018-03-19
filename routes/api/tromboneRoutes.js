const router = require("express").Router();
const tromboneController = require("../../controllers/tromboneController.js");


// matches with /api/trombones
router.route("/")
    .get(tromboneController.findAll)
    .post(tromboneController.save);

// matches with /api/trombones/:id
router.route("/:id")
    .delete(tromboneController.remove);


module.exports = router;