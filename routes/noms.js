import express from 'express';
const router = express.Router();

/* GET home page. */

router.get('/:nom', (req, res, next) => {
	let nom = req.app.locals.data.noms[req.params.nom];

	if (!nom) {
		res.redirect('/');
	}
	else {
		res.locals.nom = nom;
		res.locals.page = 'nom';
		res.render('nom');
	}
});

router.get('/', (req, res, next) => {
	res.redirect('/');
});



module.exports = router;
