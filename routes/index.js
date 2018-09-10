var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var formidable = require("formidable");
const audioNames = ["drum1", "drum2", "drum3", "hihat", "snare", "kick"];

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.post('/uploadDrums', ensureAuthenticated, function(req, res){
	console.log("upload");
	console.log(req.files);
	
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
	
		console.log(files);
		for(var i = 0; i<6; i++){
			if(files[audioNames[i]].size>0){
				var oldpath = files[audioNames[i]].path;
				var newpath = path.join(__dirname, '../samples/'+audioNames[i]+'.wav');
				fs.rename(oldpath, newpath, function (err) {
					if (err) throw err;
				});
			}
		}
		req.flash('success_msg', 'Files Have been uploaded');		
		res.redirect("/admin");
		res.end();
		
	});  
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;