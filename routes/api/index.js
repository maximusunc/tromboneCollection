const router = require("express").Router();
const tromboneRoutes = require("./tromboneRoutes");
const jsonRoutes = require("./jsonRoutes");

router.use("/trombones", tromboneRoutes);

router.use("/details", jsonRoutes);

module.exports = router;