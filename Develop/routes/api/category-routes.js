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
  }).catch((err)=> {res.status(400).json(err)});;
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  }).then((oneCategory) => {
    res.status(200).json(oneCategory)
  }).catch((err)=> {res.status(400).json(err)});
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
  .then((newCat) => res.status(200).json(newCat))
  .catch((err)=> {res.status(400).json(err)});
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then ((cat) => Category.findByPk(req.params.id))
  .then((updateCat)=> {res.status(200).json(updateCat)})
  .catch((err)=> {res.status(400).json(err)});
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleteCat)=> {res.json(`The category was removed from the database`)})
  .catch((err)=> {res.status(400).json(err)});
});

module.exports = router;
