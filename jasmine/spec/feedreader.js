/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a defined URL and the URL is not empty', function() {               
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });         
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a defined name and the name is not empty', function() {                
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });       
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. 
         */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays when clicked and hides when clicked again', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * 
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has a single entry element within the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });  
    /* Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * 
         */
        // Declare variable to store first feed.
        var firstFeed;

        // Load first feed asynchronously and assign it to variable.
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                done(); // signals to Jasmine that it can move on to the next task.
            });                      
        });        
        
        // Loads second feed and compares to the first feed.
        // Test passes when the second feed does not equal the first feed.
        it('results in changed content', function(done) {
            loadFeed(1, function() {
                expect($('.feed').html()).not.toBe(firstFeed);
                done(); 
            });        
        });
    });        
}());
