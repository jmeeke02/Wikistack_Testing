var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var assert = chai.assert,  
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed

console.log("something funny");

describe('exercises', function(){
	it('adds 2 + 2', function(){
		expect(2+2).to.equal(4);
	})
	xit('can test async functions', function(done) {
		var start = new Date();
		setTimeout(function() {
			var duration = new Date() - start;
			expect(duration).to.be.closeTo(1000, 50);
			done();
		}, 1000);
	})
	it('can spy on functions', function() {
		var foobar = function () {
			console.log("foo! bar!");
		}
		foobar = chai.spy(foobar);
		foobar();
		foobar();
		foobar();
		expect(foobar).to.have.been.called.exactly(3);
	})
})

//PAGE PROPERTIES
// required properties of page
//check that emails unique?

//HTML supertest
// page statuses 404 /201 etc
// check that url title doesnt include spaces, non-alphanumeric

//USER TESTS
// can get user by user id

//MODEL METHODS
// check find by tag
// check find similar

//TAGS
// verify page by tag property - search by tag

//CREATE POST
// check that new user created after posting
// submit creates post rest to right URI


//DB test?
// database records increased by 1


