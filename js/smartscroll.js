var smartScroll = (function ($, $w) {
  "use strict";
  var w = $($w),
    links = $("*[data-scroll]");
  function selectEelement(link) {
    return $("#" + link.data("scroll").replace(/^#+/, ""));
  }

  function smartScroll(options, cb) {
    if (links.length <= 0) throw new Error("data-scroll attr must be added");
    links.each(function () {
      var link = $(this);
      link.on("click", function (e) {
        e.preventDefault();
        var scrollTo = selectEelement(link);
        try {
          $("body, html").animate(
            {
              scrollTop: scrollTo.offset().top - options.offset,
            },
            options.speed
          );
        } catch (err) {
          throw new Error(
            "id:" +
              link.data("scroll") +
              " cannot be found please make sure to add [data-scroll] attr value as id for an elemet"
          );
        }
      });
    });
    cb();
  }

  function navItemsChooser(options) {
    links.each(function () {
      var link = selectEelement($(this));
      if (w.scrollTop() >= $(link).offset().top - options.offset - 100) {
        $(this)
          .parent()
          .addClass(options.activeClass)
          .siblings()
          .removeClass(options.activeClass);
      }
    });
  }

  function init(options, cb) {
    cb =
      typeof cb === "function"
        ? cb
        : function () {
            return null;
          };
    if (typeof options === "function") {
      cb = options;
    }
    options = typeof options === "object" ? options : {};
    var defaultOptions = {
      speed: options.speed || 500,
      addActive: options.addActive || true,
      activeClass: options.activeClass || "active",
      offset: options.offset || 20,
    };
    smartScroll(defaultOptions, cb);
    if (defaultOptions.addActive) {
      navItemsChooser(defaultOptions);
      w.on("scroll", function () {
        navItemsChooser(defaultOptions);
      });
    }
  }
  return { init: init };
})(jQuery, window);
