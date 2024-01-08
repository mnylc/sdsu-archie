/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.archipelago_subtheme = {
    attach: function (context, settings) {
      if ($(context).hasClass('search-box-with-glide')) {
        const GlidelementsToAttach = once('archipelago-subtheme-global-view-glide', '.view-content', context);
        $(GlidelementsToAttach).each(function (element) {
          let $glideElement = document.querySelector(".glide");
          if ($glideElement && Glide !== undefined) {
            const GlideInstanceView = new Glide('.glide', {
              focusAt: 'center',
              perView: 4
            }).mount();
          }
        });
      }
       const elementsToAttach = once('archipelago-subtheme-global', 'body', context);
       $(elementsToAttach).each(function () {
          let $glideElement = document.querySelector(".glide");
          if ($glideElement && Glide !== undefined) {
            const GlideInstanceBody = new Glide('.glide').mount();
          }
          window.addEventListener('resize', function(event) {
            // de-collapses if collapsed and media query restores large viewport.
            let MOBILE_WIDTH = 992;
            if ($(window).width() >= MOBILE_WIDTH) {
              $('.navbar-collapse.collapse.show').removeClass('show');
            }
          });

          // Triggers admin toolbar offset on page load
          if (context === document) {
            $(context).on("drupalViewportOffsetChange.toolbar", function (event, offsets) {
              let $body = $("body");
              if ($body.length > 0 && offsets.top > 0 && $body.css('padding-top') !== offsets.top) {
                $body.css("padding-top", offsets.top);
              }
            });
          }
        }
      );
    }
  }
})(jQuery, Drupal, Glide);
