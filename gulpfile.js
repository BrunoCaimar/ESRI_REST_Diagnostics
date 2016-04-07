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
var esri_rest_diagnostics = function() {
	// TODO: Read it from file (bookmarks.json)
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
	 return through.obj(function(file, encoding, callback) {
		function doSomethingWithTheFile(file) {
			var file_name = file.path.split("\\").pop();
			for (var section in bookmarks) {
			   for (var bookmark in bookmarks[section].contents) {
				   var bookmark_file_name = bookmarks[section].contents[bookmark];
				   if (bookmark_file_name.toLowerCase() === file_name.toLowerCase())
				   {
					   bookmarks[section].contents[bookmark] = file.contents.toString();
					   break;
				   }
				}
			}
		};
		callback(null, doSomethingWithTheFile(file));
  }, function(callback) {
		var html = netscape(bookmarks);
		// TODO: Move it to another function
		html = html.replace("Bookmarks Menu", "ESRI Rest Diagnostics");
		html = html.replace("Bookmarks", "ESRI Rest Diagnostics");
		html = html.replace(/<\/H1>/, "</H1><p>This page provides links to tools that can be used to inspect and pull out data out of ArcGIS REST Services.</p>")
		html = html.replace(/<DL>/gi, "<UL>");
		html = html.replace(/<\/DL>/gi, "</UL>");
		html = html.replace(/<DT>/gi, "<LI>");
		html = html.replace(/<\/DT>/gi, "</LI>");
		html = html.replace(/<H3>/gi, "");
		html = html.replace(/<\/H3>/gi, "");
		html = html.replace(/<UL><p>/gi, "<UL>");
		html = html.replace(/<\/UL><p>/gi, "</UL>");
		html += "</body></html>"

		var bookmarklet_file = new File({		
		  // TODO: Get name as a parameter
		  path: "bookmarklets.html",
		  contents: new Buffer(html)
		});

        this.push(bookmarklet_file);
	  callback(null);
  });    
};

gulp.task('esri_rest_diagnostics', ['bookmarklet'], function () {
	return gulp.src(["**/*.min.js", '!gulpfile.js', '!node_modules/**/*.*'])
	.pipe(esri_rest_diagnostics())
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
    '**/*.min.js',
	'dest'
  ]);
});

gulp.task('default', ['esri_rest_diagnostics']);
