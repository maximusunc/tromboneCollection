const router = require("express").Router();
const tromboneRoutes = require("./tromboneRoutes");

router.use("/trombones", tromboneRoutes);

module.exports = router;