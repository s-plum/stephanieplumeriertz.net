import express from 'express';
const router = express.Router();

/* GET home page. */

router.get('/:project', (req, res, next) => {
	let project = req.app.locals.data.portfolio[req.params.project];

	if (!project) {
		res.redirect('/');
	}
	else {
		res.locals.project = project;
		res.locals.page = 'code';
		res.render('code');
	}
});

router.get('/', (req, res, next) => {
	res.redirect('/');
});



module.exports = router;
