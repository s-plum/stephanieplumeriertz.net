import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
	res.locals.page = 'index';
	res.render('index');
});

module.exports = router;
