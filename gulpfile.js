var gulp = require('gulp');
var del = require('del');
var bookmarklet = require('gulp-bookmarklet');
var netscape = require('netscape-bookmarks');
var through = require('through2');
var File = require('vinyl');

gulp.task('bookmarklet', ['clean-min'], function() {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'js'}))
        .pipe(gulp.dest('.'));
});
var what_what = function() {
	var bookmarks = {
	"Map Folder Level:": {
		"contents": {
			"Spatial Reference Comparison": "SpatialRefCompare.min.js",
			"MapService Data Extractor v 0.3": "MapServiceData.min.js",
			"Map Viewer v. 0.5": "MapViewer.min.js"
		}
	},
	"Map Service Level:": {
		"contents": {
			"Layer Property Extractor v. 0.1": "MapLayerData.min.js",
			"Layer Feature Counter v. 0.1": "MapLayerCount.min.js",
			"Tiled Service Tester v. 0.1": "TileTester.min.js",
			"Map Viewer v. 0.5": "MapViewer.min.js"
		}
	},
	"Map Layer Level:": {
		"contents": {
			"Field Value Tester (null test only) v. 0.4": "FieldTester.min.js",
			"Populated Field Value Tester (null or empty string) v. 0.9": "FieldTester_NullOrEmpty.min.js",
			"Domain Data Counter v. 0.3": "DomainDataCounter.min.js"
		}
	},
	"Query Page Level:": {
		"contents": {
			"Select By Attributes Query Helper v. 0.3": "QueryHelper.min.js",
			"Give me all Query Helper": "GiveMeAll_QueryHelper.min.js",
			"Count them Up Query Helper": "CountThemUp_QueryHelper.min.js",
			"Everything But Geometry Query Helper": "AllNoGeo_QueryHelper.min.js",
			"Select Distinct Query Helper": "SelectDistinct_QueryHelper.min.js"
		}
	},
	"Miscellaneous:": {
		"contents": {
			"Rest Search v 0.5": "RestSearch.min.js",
			"Print Task Made Easy BETA": "PrintTaskMadeEasy.min.js",
			"Geometry Helper": "GeometryHelper.min.js"
		}
	}
};
	//var html = netscape(bookmarks);
	//console.log(html);
	
	 return through.obj(function(file, encoding, callback) {
		//console.log(bookmarks);
		/* console.log("\n****file.cwd:", file.cwd);
		console.log("\n****file.path:", file.path);
		console.log("\n****file.name:", file.path.split("\\").pop());
		console.log("\n****file.name2:", file.path.split("/").pop()); */
		if (file.isBuffer()) {
			//console.log("contents:", file.contents.toString());
		}
		//console.log("?????", file);
		//console.log("?????", encoding);
		//console.log("?????", callback);
		
		function doSomethingWithTheFile(file) {
			//console.log("doSomethingWithTheFile");
			var file_name = file.path.split("\\").pop();
			for (var section in bookmarks) {
			   for (var bookmark in bookmarks[section].contents) {
				   var bookmark_file_name = bookmarks[section].contents[bookmark];
				   //console.log("?????????", bookmark_file_name);
				   if (bookmark_file_name.toLowerCase() === file_name.toLowerCase())
				   {
					   console.log("Achou....", file_name);
					   bookmarks[section].contents[bookmark] = file.contents.toString();
					   break;
				   }
				}
			}
		};
		callback(null, doSomethingWithTheFile(file));
  }, function(callback) {
		console.log("end_of_stream");
		var html = netscape(bookmarks);
		console.log("DoneIt");

		var bookmarklet_file = new File({
		  cwd: "c:\\",
		  base: "C:\\Dev\\Github\\ESRI_REST_Diagnostics\\",
		  path: "C:\\Dev\\Github\\ESRI_REST_Diagnostics\\AAAAAAAA.html",
		  contents: new Buffer(html)
		});
		console.log(bookmarklet_file)
        this.push(bookmarklet_file);
	  callback(null);
  });    
};

function what_it_now(file, encoding, callback)
{
	console.log("file?", file, encoding, callback);
	return;
	var bookmarks = {
	  "Dave Eddy's Blog": "http://www.daveeddy.com",
	  "Perfume Global": "http://www.perfume-global.com/",
	  "Unfiled": {
		"contents": {
		  "Twitter": "http://twitter.com"
		}
	  },
	  "Second Folder": {
		"contents": {
		  "Nested Folders!": {
			"contents": {
			  "YouTube": "http://www.youtube.com",
			  "GitHub": "https://github.com"
			}
		  }
		}
	  },
	  "TekZoned": {
		"url": "http://www.tekzoned.com",
		"add_date": 1357547237,
		"last_visit": 1357547238,
		"last_modified": 1357547239
	  }
	};

	var html = netscape(bookmarks);
	console.log(html);	
	return;
}

gulp.task('do_it_now', function () {
	return gulp.src(["**/*.min.js", '!gulpfile.js', '!node_modules/**/*.*'])
	//.pipe(what_it_now())
	.pipe(what_what({opcao: '??'}))
	.pipe(gulp.dest("dest"));
});


gulp.task('bookmarklet-html', ['clean-min'], function() {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('bookmarklet-htmlsingle', ['clean-min'], function() {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'htmlsingle', file: 'bookmarklets_raw.html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('clean-min', function () {
  return del([
    'dist',
	'min_js'
  ]);
});

gulp.task('default', ['bookmarklet', 'bookmarklet-html', 'bookmarklet-htmlsingle']);
