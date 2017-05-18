const router = require('express').Router();
let helper = require('../helpers/auth_verify')
const articleController = require('../controllers/articles')

router.get('/', articleController.getAll)
router.get('/:id', articleController.getById)
router.get('/category/:category', articleController.getByCategory)
router.get('/author/:author', articleController.getByAuthor)
router.post('/', helper.auth, articleController.insertOne)
router.put('/:id', helper.auth, articleController.updateById)
router.delete('/:id', helper.auth, articleController.deleteById)

module.exports = router;
