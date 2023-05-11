/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.archipelago_subtheme = {
    attach: function (context, settings) {
      $(context).find('div.view.search-box-with-glide').once('archipelago-subtheme-global-glide').each(function () {
        let $glideElement = context.querySelector(".glide");
        if ($glideElement && Glide !== undefined) {
          const GlideInstance = new Glide('.glide',{
              focusAt: 'center',
              perView: 4
          }).mount();
        }
      });
      $(context).find('body').once('archipelago-subtheme-global').each(function () {
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
