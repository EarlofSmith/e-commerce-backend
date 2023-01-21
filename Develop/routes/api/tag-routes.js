const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
    include: [{model: Product}]
  }).then((allTags) => {
    res.status(200).json(allTags)
  }).catch((err)=> {res.status(400).json(err)});
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  }).then((oneTag) => {
    res.status(200).json(oneTag)
  }).catch((err)=> {res.status(400).json(err)});
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create({
    tag_name: req.body.tag_name,
  }).then((tag) => { res.json(tag)
  }).catch((err)=> {res.status(400).json(err)});
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update({
    tag_name: req.body.tag_name
  },{
    where: {
      id: req.params.id
    }
  }).then ((updateTag)=> {res.json(updateTag)})
  .catch((err)=> {res.status(400).json(err)});
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleteTag)=> {res.json(`The Tag was removed from the database`)})
  .catch((err)=> {res.status(400).json(err)});
});

module.exports = router;
