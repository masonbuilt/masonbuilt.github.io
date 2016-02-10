smoothScroll.init();
gumshoe.init({
    // selector: '[data-gumshoe] a' // Default link selector (must use a valid CSS selector)
    // selectorHeader: '[data-gumshoe-header]' // Fixed header selector (must use a valid CSS selector)
    offset: 5, // Distance in pixels to offset calculations
    activeClass: 'is-current', // Class to apply to active navigation link and it's parent list item
    // callback: function (nav) {} // Callback to run after setting active link
});

(function(){

// Contact us

        $('.js-btnContact').click(function() {
            event.preventDefault();
            $('.js-contactWrap').toggleClass('is-active');
        })

})(window);
