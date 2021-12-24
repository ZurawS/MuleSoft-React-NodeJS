const express = require(`express`);
const { Course, validateCourse } = require(`../models/courseSchema`);
const router = express.Router();
const _ = require(`lodash`);

router.get("/", async (req, res) => {
  const courses = await Course.find().sort("dishName");
  res.send(courses);
});

router.get("/:name", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const courses = await Course.find();
  course = courses.filter((course) => course.category === req.params.name);
  res.send(course);
});

router.get("/find/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send(`The course with the given ID was not found`);
  res.send(course);
});

router.post("/", async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error)
    //   400 Bad request
    return res.status(400).send(error.details[0].message);

  let course = new Course(
    _.pick(req.body, [
      `dishName`,
      `category`,
      `author`,
      `ingredients`,
      `cookingTime`,
      `sourceUrl`,
      `imageUrl`,
      `isPublished`,
      `price`,
      `tags`,
    ])
  );

  course = await course.save();
  res.send(course);
});

router.put("/update/:id", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error)
    //400 Bad request
    return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, [
      `dishName`,
      `author`,
      `category`,
      `password`,
      `ingredients`,
      `cookingTime`,
      `sourceUrl`,
      `imageUrl`,
      `isPublished`,
      `price`,
      `tags`,
    ]),
    {
      useFindAndModify: false,
      new: true,
    }
  );

  if (!course)
    return res.status(404).send(`The course with the given ID was not found`);

  res.send(course);
});

router.delete("/delete/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  });

  if (!course)
    return res.status(404).send(`The course with the given ID was not found`);

  res.send(course);
});

module.exports = router;
