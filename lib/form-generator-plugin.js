'use strict';

(function ($) {
  $.fn.FormGenerator = function (options) {
    this.settings = $.extend({
      'el': $(this)
    }, options);

    var el = this.settings.el;
    var model = this.settings.model;
    var priv = {
      'init': function () {
        console.log('test');

        return this;
      }.bind(this)
    };

    // Public Methods - External methods
    Object.assign(this, {
      'getValue': function () {
        return this;
      }
    });

    // Initialise the plugin
    priv.init();

    return this;
  };
}(jQuery));