const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc POST All Items
// @access Public 
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// @route POST api/items
// @desc Create An Item
// @access Public 
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public 
router.delete('/:id', (req, res) => {
//   Item.findById(req.params.id)
//   .then(item => item.remove().then(() => res.json({success: true})))
//   .catch(err => res.status(404).json({success: false}))

  Item.findById(req.params.id, function(err, item) {
      if(err) {
          return res
            .status(404)
            .json({
              success: false
          });
      }
      item.remove(function() {
          return res
            .json({
                success: true
            });
      });
  });

//   .then(function(item) {
//       item.remove()
//       .then(function() {
//         res.json({
//             success: true
//         });
//       });
//   })
//   .catch(function(err) {
//     return res.status(404).json({
//         success: false
//     });
//   });
});

router.delete('/:id', function(req, res) {

});


module.exports = router;