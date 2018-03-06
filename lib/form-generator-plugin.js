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
        priv.generateForm()

        return this;
      }.bind(this),
      /**
       * Generate form
       * @return {Object} form
       */
      'generateForm': () => {
        model.forEach((item) => {
          var date = new Date();
          var container = $('<div />', {
            id: date.getTime(),
            data: item
          });

          jQuery.data(container, item);

          container.append(priv.getFormByElement()[item.type](item));
          container.append(priv.getErrorMessage());

          el.append(container);
        })

        el.append($('<div />').append(priv.getFormByElement()['button']()))

        return this;
      },
      /**
       * Generate form by element
       * @return {Object} input - by type
       */
      'getFormByElement': () => ({
        'input-text': (input) => ($('<input />', {
          'placeholder': input.placeholder
        })),
        'select': (select) => {
          var el = $('<select selected />');

          select.options.forEach((option, index) => {
            if (! index) {
              el.append($('<option />', {
                'value': option.value,
                'text': option.name,

              }))
            } else {
              el.append($('<option />', {
                'value': option.value,
                'text': option.name
              }))
            }
          })

          return el;
        },
        'button': () => ($('<button />', {
          'class': 'valid',
          'text': 'valider'
        }))
      }),
      'getErrorMessage': (message) => ($('<p />', {
        text: message
      })),
      'displayErrorMessage': () =>{
      }
    };

    // Public Methods - External methods
    Object.assign(this, {
      'validForm': (callback) => {
        if (true) {
          callback(null, {});
        } else {
          callback({}, null);
        }

        return this;
      }
    });

    // Initialise the plugin
    priv.init();

    return this;
  };
}(jQuery));