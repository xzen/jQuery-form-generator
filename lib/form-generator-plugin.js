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
        console.log(model);

        priv.generateForm()

        return this;
      }.bind(this),
      'generateForm': () => {
        model.forEach((item, id) => {
          var container = $('<div />', {
            id,
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
      'getFormByElement': () => ({
        'input-text': (input) => ($('<input />', {
          'placeholder': input.placeholder,
          'id': input.id
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
      'displayErrorMessage': (el, message) =>{
      }
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