smoothScroll.init();

(function(){

// Activate menu items

    $('.js-menuLink').click(function(){
        var menuLink = $('.js-menuLink');
        var menuItems = menuLink.parent();

        if ($('menuItmes').hasClass('is-current')) {
            return false;
        }

        menuItems.removeClass('is-current');
        $(this).parent().addClass('is-current');
    });

})(window);
