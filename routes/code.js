import express from 'express';
const router = express.Router();

/* GET home page. */

router.get('/:project', (req, res, next) => {
	console.log(req.app.locals.data);
	let project = req.app.locals.data.portfolio[req.params.project];

	if (!project) {
		res.redirect('/');
	}
	else {
		res.locals.project = project;
		res.render('code');
	}
});

router.get('/', (req, res, next) => {
	res.redirect('/');
});



module.exports = router;
