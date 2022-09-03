const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        { model: Product },
      ],
    }); res.status(200).json(allTags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product },
      ],
    });
    if (!tagById) {
      res.status(404).json({ message: 'Sorry, there is no tag with this ID. Please try again.' });
      return;
    }
    res.status(200).json(tagById);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);    
  } catch (error) {
    res.status(400).json(error);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'Sorry, there is no tag with this id!' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'Sorry, there is no tag with this id.Please try again.' });
      return;
    }
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
