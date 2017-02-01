var express = require('express')
, mongo = require('mongodb')
, mongoUrl = 'mongodb://localhost:27017/test'
, oData = {}
, app = express()
, slug
, jsLoc = express.static('js')
, cssLoc = express.static('css')
, imgLoc = express.static('images')
// todo: finish this
, fnGetAutos = function () {
	var data;
	
	mongo.connect(mongoUrl, function(err, db) {
		if (err) { 
			return console.dir(err); 
		}

		data = db.collection('autos').find();

		data.each(function (err, doc) {
			console.log(doc);
		});
		db.close();
		
	});

	return data;
}
;

app.get('/:slug', function(req, res) {
	slug = [req.params.slug][0];

	// if to call data
	if (slug === 'data') {
		return res.send(fnGetAutos());
	}

    return res.sendfile(slug);
});

// route for js/css/images files
app.use('/js', jsLoc);
app.use('/css', cssLoc);
app.use('/images', imgLoc);

app.listen(9000);