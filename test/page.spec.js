var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
var mongoose = require('mongoose');
chai.use(spies);

mongoose.disconnect(testConnect);

function testConnect(){
    mongoose.createConnection('mongodb://localhost/wikistack-testing');
}

var models = require('../models');
var Page = models.Page;
var User = models.User;

var assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed


describe('Page model', function() {
    var page;
    beforeEach('creates page', function(done){
        Page.create({
            title:"Beta test",
            content:"Bluhhhhhhh though",
            status:"closed"
        });
        page = new Page();
        done();
    });

    describe('Validations', function() {
        it('errors without title', function() {
            page.content = "now i have content";
            return page.validate().then(function () {
                assert(false);
            }, function() {
                assert(true);
            });
        });
        it('does not throw an error with title', function() {
            page.title = "How you like me now";
            page.content = "now i have content";
            return page.validate();
        });
        it('errors without content', function() {
            page.title = "now i have a title";
            return page.validate().then(function () {
                assert(false);
            }, function() {
                assert(true);
            });
        });
    });

    describe('Statics', function() {
        describe('findByTag', function() {
            var fullPage = new Page({
                title: 'this is a title',
                content: 'this is content',
                tags: ['these', 'are', 'tags']
            });

            it('gets pages with the search tag', function(done) {
                fullPage.save()
                .then(function(){
                    return Page.findByTag('tags');
                })  
                .then(function(ourpage){
                    expect(ourpage[0].content).to.equal('this is content');
                    done();
                }).then(null,done);
            });
            xit('does not get pages without the search tag', function(done) {
                fullPage.save()
                .then(function(){
                    return Page.findByTag('watermelon');
                })  
                .then(function(ourpage){
                    expect(ourpage[0].content).to.not.equal('this is content');
                    done();
                }).then(null,done);
            });
        });
    });

    describe('Methods', function() {
        beforeEach(function(done) {
            //promise all, save each promise as variable
               var homepage = Page.create({
                    title: 'now we\'re home',
                    content: 'it\'s cozy here',
                    tags: ['fireplace', 'hot chocolate', 'rain']
               });
               var similarPage = Page.create({
                    title: 'still in the neighborhood',
                    content: 'seems different',
                    tags: ['fireplace', 'phonograph', 'umbrella stand']
               });
               var strangePage = Page.create({
                    title: 'far away',
                    content: 'everything\'s different',
                    tags: ['blaster', 'teleporter', 'hologram']
               });
               Promise.all([homepage, similarPage, strangePage])
                .then(done);
           });


           afterEach(function(done){
               Page.remove({})
               .then(done);
           });

        describe('findSimilar', function() {
            xit('never gets itself', function(done) {
                console.log('homepage', homepage);
                homePage.findSimilar()
                .then(function(pageList) {
                    expect(pageList).to.not.include(homepage);
                    done();
                }).then(null, done);
            });
            xit('gets other pages with any common tags', function(done) {
                homePage.findSimilar()
                .then(function(pageList) {
                    expect(pageList).to.include(similarPage);
                    done();
                }).then(null, done);
            });
            xit('does not get other pages without any common tags', function(done) {
                homePage.findSimilar()
                .then(function(pageList) {
                    expect(pageList).to.not.include(strangePage);
                    done();
                }).then(null, done);
            });
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });

});