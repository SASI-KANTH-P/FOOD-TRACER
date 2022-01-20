const router = require("express").Router();
const auth = require("../middleware/auth");
let Meal = require("../models/meals.model");

//Test route
router.route("/").get((req, res) => {
  Meal.find()
    .then((meals) => res.json(meals))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.get("/me", auth, async (req, res) => {
  // View logged in user meals

  Meal.find({ username: req.user.username })
    .then((meals) => res.json(meals))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.get("/me/:id", auth, async (req, res) => {
  // View logged in user meals

  Meal.findOne({ _id: req.params.id })
    .then((meal) => res.json(meal))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/me", auth, async (req, res) => {
  // Add new meal to logged in user
  try {
    console.log(req.body);
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).send({ meal });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.delete("/me/:id", auth, async (req, res) => {
  // Delete meal of logged in user
  Meal.findByIdAndDelete(req.params.id)
    .then(() => res.json("Meal deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/me/:id", auth, async (req, res) => {
  // Update meal of logged in user
  Meal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((meal) => res.json(meal))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
