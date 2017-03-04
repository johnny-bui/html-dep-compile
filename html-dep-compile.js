
const htmlGrep = require('html-dep-grep');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
//const babel = require('babel-core');
const child_process = require('child_process');
/**
 * compile JavaScript and CSS files in `fileName`
 * and write to file given by group name.
 * 
 * @param {string} fileName
 * @param {object} compileOptions  
 * @returns {undefined}
 */
var depCompile = function (fileName, compileOptions){
	var groups = htmlGrep.grepDepFileSync(fileName);
	htmlGrep.resolvePath(fileName, groups);
	for(var i = 0; i < groups.length; ++i){
		compileJSFile(groups[i], compileOptions);
	}
};

function compileJSFile(group, options){
	var jsFiles = group.js;
	var opt = options || {};
	
	var destinateDir = path.resolve( opt.dest || "./" );
	const destinateFileName = path.resolve(destinateDir, group.name+".js");
	mkdirp.sync(destinateDir);
	
	if( fs.existsSync(destinateDir) && fs.statSync(destinateDir).isDirectory() ){
		//Call babel as if it run on a Shell
		(function(){
			const babel = "babel";
			var argv = [];
			for(var i = 0; i < jsFiles.length; ++i){
				argv.push( jsFiles[i] );
			}
			argv.push("-o");// babelrc will not work!
			argv.push(destinateFileName);
			argv.push("-s");// babelrc will not work!
			console.log(argv);
			child_process.execFileSync(babel, argv);
		})();
		
	}else{
		throw new Error('Cannot make parent dir of ' + destinateFileName);
	}
}

module.exports = {
	depCompile
};
