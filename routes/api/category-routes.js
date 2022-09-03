const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryById) {
      res.status(404).json({ message: 'Sorry, we cannot find a category with that ID.' });
      return;
    }
    res.status(200).json(categoryById);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const changedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //! I am uncertain about the [0] in the line below
    if (!changedCategory[0]) {
      res.status(404).json({ message: 'Sorry, no category with this ID!' });
      return;
    }
    res.status(200).json(changedCategory);    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Sorry, no category with this ID!' });
      return;
  }
  res.status(200).json(deletedCategory);    
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
