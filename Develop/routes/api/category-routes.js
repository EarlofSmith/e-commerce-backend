const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  await Category.findAll({
      include: [{model: Product }]
  }).then((categories) => {
  res.status(200).json(categories);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  }).then((oneCategory) => {
    res.status(200).json(oneCategory)
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
  .then((newCat) => res.status(200).json(newCat))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
