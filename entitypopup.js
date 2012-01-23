/**
 * function addEvent
 * Also works on browsers that don't support addEventListener (IE) 
 */
var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

 
 /**
 * Set Popup
 * Binds popup to the 'click' event to each respective element found with the 'entitypopup' class.
 */ 
  (function ($) {
    Drupal.behaviors.entitypopup_popup = {
      attach: function (context, settings) {
        /* Setup Popup Elements **************************************/
          var links = document.querySelectorAll(".entitypopup"), containerElement = null; // querySelectorAll is IE8+ compatible

          for (var i = 0; i < links.length; i++) {
            containerElement = links[i];
            var view_mode = 'teaser';
            var classArray = containerElement.className.split(' ');
            for (var j = 0; j < classArray.length; j++) {
              testArray = classArray[j].split('-');
              if (testArray[0] == 'entitypopup' && testArray.length > 1) {
                view_mode = testArray[1];
              }
            }
            
            addEvent(containerElement, 'click', function () {
              var url = '/entitypopup/'+this.id.replace('-','/')+'/'+view_mode;
              $.get(url, function(response) {
                response = $.parseJSON(response);
          // Insert new element for modal popup.
                if(response){
                  var modalElement = $(response);
                  modalElement.insertAfter(document.querySelector('#skip-link'));
                }
                
                $('#container-count-'+response['nid']).replaceWith(response['element']);
              });
            });
          }

      }
    };
  }(jQuery));
  
