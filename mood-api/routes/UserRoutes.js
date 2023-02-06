const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addToLikedMovies);
//repplaced 'arguments' with 'get' below due to arguments being depricated in strict mode
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeFromLikedMovies);

module.exports = router;
