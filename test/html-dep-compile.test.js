const htmlDepCompile = require('../html-dep-compile');

describe('#html-dep-compile', function () {
	it('compiles all JS-Files of a group to one JS File', function () {
		htmlDepCompile.depCompile('test/test.html', {
			dest:'dist'
		});
		
	});
});


