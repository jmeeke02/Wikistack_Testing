var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var models = require('../models');
var Page = models.Page;
var User = models.User;

var assert = chai.assert,  
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed


describe('Page model', function() {
    var page;
    beforeEach('creates page', function(done){
        page = new Page();
        done();
    });

    describe('Validations', function() {
        it('errors without title', function(done) {
            page.validate()
            .then(null,
            function(err){
                return err.errors
            }).then(function(errorMessage){
                expect(errorMessage).to.have.property('title');
                done();
            }).then(null, done);
        });
        it('errors without content', function(done) {
            page.validate(function(err){
                expect(err.errors).to.have.property('content');
                done();
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
            it('does not get pages without the search tag', function(done) {
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
        describe('findSimilar', function() {
            var homePage = new Page({
                title: 'now we\'re home',
                content: 'it\'s cozy here',
                tags: ['fireplace', 'hot chocolate', 'rain']
            });
            var similarPage = new Page({
                title: 'still in the neighborhood',
                content: 'seems different',
                tags: ['fireplace', 'phonograph', 'umbrella stand']
            });
            var strangePage = new Page({
                title: 'far away',
                content: 'everything\'s different',
                tags: ['blaster', 'teleporter', 'hologram']
            });
            it('never gets itself', function(done) {
                homePage.save()
                .then(similarPage.save)
                .then(strangePage.save)
                .then(function(){
                    return homePage.findSimilar();
                })
                .then(function(pageList) {
                    expect(pageList).to.not.include(homePage);
                    done();
                }).then(null, done);
            });
            it('gets other pages with any common tags', function(done) {
                homePage.save()
                .then(similarPage.save)
                .then(strangePage.save)
                .then(function(){
                    return homePage.findSimilar();
                })
                .then(function(pageList) {
                    console.log(pageList);
                    expect(pageList).to.include(similarPage);
                    done();
                }).then(null, done);
            });
            it('does not get other pages without any common tags', function(done) {
                homePage.save()
                .then(similarPage.save)
                .then(strangePage.save)
                .then(function(){
                    return homePage.findSimilar();
                })
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