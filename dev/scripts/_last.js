/*
 * Custom scripts
 */
(function ($) {
    initOpenClose();
   initHeroGallery();
   initApartmentGallery();
	 initAccordion();
   rangeSlider();
   setInputMask();
   initScrollTop();
   mobileMenu();
   $('.input-tel').keypress(function (e) {
		return numbersonly(this, e, true)
   });
   $('.fromto-input input').keypress(function (e) {
    return numbersonly(this, e, false)
   });
   $('input[name="your-phone"]').attr('pattern', '[0-9]*');
   rspHelper();
   initCustomForms();
   initFancybox();
   mapResize();
   filtersSubmit();
   initFiltersTags();
   setFavoriteCard();
   changeCurrency();
   initMapScroll();
   initLoader();
   onlyAlphabets();
   initRangeInput();
   //userActionPopup();
})(jQuery);

$('.text-slider').readmore({
   heightMargin: 50,
   moreLink: '<a href="#" class="read-more">Читать далее</a>',
   lessLink: ''
})

function onlyAlphabets() {
    var inputs = document.querySelectorAll('.required-letters');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keypress', function(event) {
            if (window.event) {
                var charCode = window.event.keyCode;
            } else if (event) {
                var charCode = event.which;
            } else {
                return true;
            }

            if (charCode != 32) {
                var regex = new RegExp("^[-a-zA-Z\u0410-\u044F`]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }
            }
        });
    }
}

var mapCard = new leafletMap('#map-card', {
   zoom: 20,
});

var map = new leafletMap('#map', {
  zoom: 11,
  pinPopup: 'appartment',
  districts: true,
  groupMarkers: true,
  initCenterCity: true
});

var mapContact = new leafletMap('#map-contact', {
   zoom: 20,
   pinPopup: 'address',
   pinPopupActive: true
});

function initMapScroll() {
   if (document.querySelector('.main-tw-map')) {
      $("#map").stick_in_parent({
         sticky_class: 'fixed-map'
      });
   }
}

function initLoader() {
   document.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() {
         $(".loader").hide();
      }, 500);
   });
}

function initCustomForms() {
   var select = $('.custom-sel');
   var scroll = $('.jcf-scrollable');

   jcf.setOptions('Select', {
      wrapNative: false
   });

   jcf.replace(select);
   jcf.replace(scroll);
}
function initFancybox() {
  jQuery('a.lightbox, [data-fancybox]').fancybox({
    parentEl: 'body',
    margin: [50, 0]
  });

  jQuery('.apartment-slider-main .slick-slide .slide a').fancybox({
      slideClass: "fancybox-appartment",
      baseClass: "fancybox-appartment_gallery",
  });

}

function mobileMenu() {
  var nav = MobNav({
    menu: '.mobile-menu',
    opener: '.mobile-menu-opener',
    activeClass: 'mobile-menu-opened',
    overlayClass: 'page-overlay'
  });
  if ($('.filter').length > 0) {
      var nav = MobNav({
         menu: '.filter',
         opener: '.filter-menu-opener',
         activeClass: 'filter-opened',
         overlayClass: 'page-overlay',
      });
  };
  var
      $mainNav = $('.main-nav').clone(),
      $currency = $('.currency-change-wrap').clone(),
      $contactList = $('.contact-list').clone(),
      $contactEmail = $('.contact-email').clone(),
      $favorites = $('.favorites-link').clone(),
      $btn1 = $('.header-l > .btn').clone(),
      $btn2 = $('.header-r > .btn').clone(),
      $socialNetworks = $('.header .social-networks').clone(),
      $container = $('.mobile-menu');
      $btnWrap = $('<div/>', {
         class: 'btn-holder',
      });

      $mainNav
        .appendTo($container);

      $currency
        .appendTo($container);

      $favorites
        .appendTo($container);

      $contactList
        .appendTo($container);

      $contactEmail
        .appendTo($container);

      $socialNetworks
        .appendTo($container);

      $btn1
        .appendTo($btnWrap);

      $btn2
        .appendTo($btnWrap);

      $btnWrap
        .appendTo($container);
}

function initOpenClose() {
	jQuery('.open-close').openClose({
		activeClass: 'active',
		opener: '.opener',
		slider: '.slide',
		animSpeed: 400,
		effect: 'none'
   });
}

function initHeroGallery() {
	$('.hero-gallery').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 4000,
		arrows: false,
		appendDots: false
	});
}

function initApartmentGallery() {
   var captions = [];

   if (document.querySelector('.apartment-slider')) {
      initSlick();
   }

	function initSlick() {
      $('.apartment-slider-main').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: true,
         fade: true,
         infinite: false,
         asNavFor: '.apartment-slider-thumbs',
         nextArrow: '<button class="slick-next slick-arrow" type="button"></button>',
         prevArrow: '<button class="slick-prev slick-arrow" type="button"></button>',
         onAfterChange: function(currentSlide){
          }

      });

      $('.apartment-slider-thumbs').slick({
         asNavFor: '.apartment-slider-main',
         slidesToShow: 6.5,
         vertical: true,
         focusOnSelect: true,
         verticalSwiping: true,
         infinite: false,
         responsive: [
            {
              breakpoint: 767,
              settings: {
                vertical: false,
                verticalSwiping: false,
                slidesToShow: 3,
                infinite: true,
                centerMode: true
              }
            }
          ]
      });

      initCaption('.apartment-slider-main');
   }

   $('.apartment-slider-main').on('beforeChange init', function(event, slick, currentSlide, nextSlide){
      initCaptionControl(nextSlide);
   });

   function initCaption(el) {
      var carousel = document.querySelector(el);
      var slides = carousel.querySelectorAll('.slide');

      var captionWrap = document.createElement('div');
      captionWrap.classList.add('apartment-slider-info');

      slides.forEach(function(item, i) {
         var caption = document.createElement('div');
         caption.classList.add('apartment-slider-info-item');
         caption.innerHTML = item.getAttribute('data-caption');
         if (i !== 0) {
            caption.style.display = 'none';
         }
         captions.push(caption);
         captionWrap.appendChild(caption);
      })
      carousel.parentNode.appendChild(captionWrap);
   }

   function initCaptionControl(index) {
      captions.forEach(function(item, i){
         if (i === index) {
            item.style.display = 'block';
         } else {
            item.style.display = 'none';
         }
      })
   }
}

function initAccordion() {
	jQuery('.questions-tabs').slideAccordion({
		opener: '.tab-label',
		slider: '.tab-content',
		animSpeed: 300
	});
    jQuery('.filter-menu').slideAccordion({
         opener: '.filter-opener',
         slider: '.filter-drop',
         animSpeed: 0,
         closeClickOutside: true,
         onShow: function() {
            filters.onShow();
         },
         onHide: function() {
            filters.onHide();

         },
    });
}

function rangeSlider() {
   function returnValues(el) {
      if ($( el ).length > 0) {
         var val = $( el ).attr('data-values');
         return val.split(',');
      }
   }

    $( "#range-slider" ).slider({
     range: true,
     min: +$( "#range-slider" ).attr('data-min'),
     max: +$( "#range-slider" ).attr('data-max'),
     values: returnValues("#range-slider"),

     slide: function( event, ui ) {
        $( "#amount" ).val(ui.values[ 0 ] + "," + ui.values[ 1 ]);
        $("#amount-title").html("$ " + formatPrice(ui.values[0]) + " до $" + formatPrice(ui.values[1]));
     }
    });

    $( "#range-slider-area" ).slider({
     range: true,
     min: +$( "#range-slider-area" ).attr('data-min'),
     max: +$( "#range-slider-area" ).attr('data-max'),
     values: returnValues("#range-slider-area"),
     slide: function( event, ui ) {
        $( "#area" ).val(ui.values[ 0 ] + "," +ui.values[ 1 ]);
        $( "#area-title" ).html(ui.values[ 0 ] + " <span>м2</span>" + " - " +ui.values[ 1 ]  + " <span>м2</span>" );
     }
    });

    $( "#range-slider-date" ).slider({
     range: true,
     min: +$( "#range-slider-date" ).attr('data-min'),
     max: +$( "#range-slider-date" ).attr('data-max'),
     values: returnValues("#range-slider-date"),
     slide: function( event, ui ) {
        $( "#ydate" ).val(ui.values[ 0 ] + "," + ui.values[ 1 ]);
        $( "#ydate-title" ).html(ui.values[ 0 ] + " - " + ui.values[ 1 ]);
     }
    });

    $( "#range-slider-date2" ).slider({
      range: true,
      min: +$( "#range-slider-date2" ).attr('data-min'),
      max: +$( "#range-slider-date2" ).attr('data-max'),
      values: returnValues("#range-slider-date2"),
      slide: function( event, ui ) {
          $( "#years2" ).val(ui.values[ 0 ] + "," + ui.values[ 1 ]);
          $( "#years2-title" ).html(ui.values[ 0 ] + " - " + ui.values[ 1 ]);
      }
   });

    $( "#amount" ).val($( "#range-slider" ).slider( "values", 0 ) +
    "," + $( "#range-slider" ).slider( "values", 1 ));

    $("#amount-title").html("$ " + formatPrice($("#range-slider").slider("values", 0)) +
    " до $" + formatPrice($("#range-slider").slider("values", 1)));

    $( "#area" ).val( $( "#range-slider-area" ).slider( "values", 0 ) + "," +
     $( "#range-slider-area" ).slider( "values", 1 ));

    $( "#area-title" ).html( $( "#range-slider-area" ).slider( "values", 0 ) + " <span>м2</span>" + " - " +
     $( "#range-slider-area" ).slider( "values", 1 ) + " <span>м2</span>");

    $( "#ydate" ).val( $( "#range-slider-date" ).slider( "values", 0 ) + "," +
     $( "#range-slider-date" ).slider( "values", 1 ));

    $( "#ydate-title" ).html( $( "#range-slider-date" ).slider( "values", 0 ) + " - " +
     $( "#range-slider-date" ).slider( "values", 1 ));

     $( "#years2" ).val( $( "#range-slider-date2" ).slider( "values", 0 ) + "," +
        $( "#range-slider-date2" ).slider( "values", 1 ));

    $( "#years2-title" ).html( $( "#range-slider-date2" ).slider( "values", 0 ) + " - " +
        $( "#range-slider-date2" ).slider( "values", 1 ));


}

function formatPrice(val) {
   return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
 }

function numbersonly(el, e, tel) {
   var key;
   var keychar;

   if (window.event) {
      key = window.event.keyCode;
   }
   else if (e) {
      key = e.which;
   }
   else {
      return true;
   }

   keychar = String.fromCharCode(key);

    if (tel) {
      if (iscontrolkey(key)) {
         return true;
      } else if (e.target.getAttribute('data-max')) {
         if (e.target.value.replace(/[^0-9]/, '').length >= +e.target.getAttribute('data-max')) {
            return false;
         } else {
           if (tel && key === 43 && e.target.value.length !== 0) {
               return false;
            } else if ((("0123456789+").indexOf(keychar) > -1)) {
               return true;
            } else {
               return false;
            }
         }
      }
   } else {
      if (iscontrolkey(key)) return true;
  		else if ((("0123456789.").indexOf(keychar) > -1)) return true;
  		else return false;
   }
}

function iscontrolkey(key) {
   if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27) || (key == 63232) || (key == 63233) || (key == 63234) || (key == 63235) || (key == 63272)) return true;
   return false;
}

function setInputMask() {
   var inputs = document.querySelectorAll('input[data-mask]');

   inputs.forEach(function (input) {
      input.placeholder = input.dataset.mask;
      //input.addEventListener('blur', inputBlur);
      input.addEventListener('focus', inputFocus);
      input.addEventListener('keydown', inputKeydown);
   });

   function inputFocus(event) {
      event.preventDefault();
      var target = event.target;

      if (!target.value.length) {
         target.value = target.dataset.mask;
      }

      if (target.value.match(/\_/)) {
         target.setSelectionRange(0, 0);
      } else {
         target.setSelectionRange(target.value.length, target.value.length);
      }
   }

   function inputBlur(event) {
      event.preventDefault();

      var target = event.target;

      if (target.value.match(/\_/)) {
         target.value = '';
      }
   }

   function inputKeydown(event) {
      event.preventDefault();

      var key = event.key;
      var target = event.target;
      var targetIndex = target.selectionStart;

      switch (true) {
         case /^[0-9 ()+]+$/.test(key):
            var searchRes = target.value.search(/\_/) + 1;
            if (searchRes) {
               target.value = target.value.replace(/\_/, key);
               target.setSelectionRange(searchRes, searchRes);
            }
            break;
         case /Backspace/.test(key):
            removeSign(target);
            break;
         case /Delete/.test(key):
            removeSign(target, true);
            break;
         case /ArrowLeft/.test(key):
            arrowCursorPosition(target, targetIndex, false);
            break;
         case /ArrowRight/.test(key):
            arrowCursorPosition(target, targetIndex, true);
            break;
         default:
            break;
      }
   }

   function arrowCursorPosition(element, i, sign) {
      sign ? i++ : i--;
      element.setSelectionRange(i, i);
   }

   function removeSign(element, del) {
      var index = element.selectionStart;
      var res = element.value.charAt(del ? index : index - 1);

      if (/\b/.test(res)) {
         element.value = replaceAt(del ? index : index - 1, element.value);
         arrowCursorPosition(element, index, del ? true : false);
      }
      if (!/\b/.test(res)) {
         arrowCursorPosition(element, index, del ? true : false);
      }
   }

   function replaceAt(i, s) {
      return s.substr(0, i) + '_' + s.substr(i + 1);
   }
};

function initScrollTop() {
   var btn = document.querySelector('.anchor-top');
   if (btn) {
      winHeight = window.innerHeight;

      window.addEventListener('scroll', setState)

      function setState() {
         if (window.scrollY > winHeight / 2) {
            btn.style.opacity = '1';
         } else if (window.scrollY < winHeight / 2) {
            btn.style.opacity = '0';
         }
      };

      btn.addEventListener('click', function(){
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         })
      });
   }
}



function rspHelper() {
  ResponsiveHelper.addRange({
    '1024..': {
   
      on: function() {
         jQuery('.filter-slider').openClose({
            activeClass: 'filter-show',
            opener: '.filter-open',
            slider: '.filter-slide',
            animSpeed: 200,
            effect: 'slide',
            hideOnClickOutside: true,
            onLoad: function() {
               var form = document.querySelector(this.slider);
               setTimeout(function() {
                  if (form.querySelector('.dis')) {
                     document.querySelector('.filter-bar-opener').click();
                     this.hideOnClickOutside = false;
                  }
               }, 100);  
               
            }
          });
     
      },
      off: function() {
        jQuery('.filter-slider').openClose('destroy');
      }
    },
    '..1023': {
      on: function() {
        jQuery('.main-nav-list').slideAccordion({
          opener: '.main-nav-opener',
          slider: '.main-nav-drop',
          animSpeed: 300,
          activeClass:'active-drop',
        });
        jQuery('.contact-list').openClose({
          activeClass: 'active',
          opener: '.contact-list-opener',
          slider: '.contact-list-slide',
          animSpeed: 400,
          effect: 'slide'
        });
      },
      off: function() {
        jQuery('.main-nav-list').slideAccordion('destroy');
        jQuery('.contact-list').openClose('destroy');
      }
    },
    '..767': {
      on: function() {
        jQuery('.footer-nav').slideAccordion({
          opener: '.footer-nav-opener',
          slider: '.footer-nav-slide',
          animSpeed: 300,
          activeClass:'active-drop'
        });
      },
      off: function() {
        jQuery('.footer-nav').slideAccordion('destroy');
      }
    }
  });
}

function mapResize() {
   var btn = document.querySelector('.map-size');
   if (btn) {
      var btnText = btn.querySelector('span');
      var map = document.querySelector(btn.getAttribute('data-map'));
      var height = map.offsetHeight;

      btnText.innerHTML = 'Открыть карту'

      btn.addEventListener('click', function(e) {
         e.preventDefault();
         if (!map.classList.contains('expanded')) {
            btnText.innerHTML = 'Закрыть карту'

            btn.classList.add('active');
            map.classList.add('expanded');
         } else {
            btnText.innerHTML = 'Открыть карту'

            btn.classList.remove('active');
            map.classList.remove('expanded');

            map.style.height = height;
         }
         $(map).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(event) {
            mapContact.invalidateSize();
         });
      });
   }
}

function Filters() {
   this.filter = document.querySelector('.filter');

   if (this.filter) {
      this.filterSection = this.filter.querySelectorAll('.filter-section');
      this.activeFilter;
      this.selectedModel;
      this.init();
   }
}

Filters.prototype = {
   init: function () {
      var self = this;

      this.oType;
      this.oFilter;

      this.eventHandler = function onClickBound(e) {
         self.bindEvents.call(self, e || window.event);
      };

      this.filterSection.forEach(function(item) {
         var confirm = item.querySelector('.confirm');
         var opener = item.querySelector('.filter-opener');

         confirm.addEventListener('click', function(e) {
            e.preventDefault();
            self.setSummary(item.getAttribute('data-filter'), item);

            e.target.closest('.filter-section').classList.remove('active');
            e.target.closest('.filter-drop').classList.add('js-acc-hidden');
         });

         opener.addEventListener('click', function(e) {
            self.saveSelectedState(item.getAttribute('data-filter'), item);
         });
         self.setSummary(item.getAttribute('data-filter'), item);
      });
      //this.currencyHandler();
      this.clear();
   },

   saveSelectedState: function(type, filter) {
      this.activeFilter = filter;

      if (type === "area" || type === 'price') {
        this.selectedData = [];
        this.selectedData.push(filter.querySelector('.min').value);
        this.selectedData.push(filter.querySelector('.max').value);
      } else {
        this.selectedData = filter.querySelectorAll('input:checked');
      }
   },

   bindEvents: function(event) {
      var self = this;

      if (!event.target.closest('.filter-drop') && !event.target.classList.contains('filter-opener')) {
         self.onCancel();
      }
   },

   onShow: function() {
      var self = this;
      document.addEventListener('click', this.eventHandler);
   },

   onHide: function() {
      var self = this;
      if (this.activeFilter && this.selectedData) {
         this.onCancel();
         document.removeEventListener('click', this.eventHandler);
      }
   },

   onCancel: function() {
      var self = this;
      if (this.activeFilter && this.selectedData) {
         var type = this.activeFilter.getAttribute('data-filter');
         var inputs = this.activeFilter.querySelectorAll('input');

         if (type === 'area' || type === 'price') {
            var min = this.activeFilter.querySelector('.min');
            var max = this.activeFilter.querySelector('.max');

            min.value = this.selectedData[0];
            max.value = this.selectedData[1];
         } else {
            setStates();
         }

         function setStates() {
            inputs.forEach(function(el) {
               if (compare(el.id)) {
                  el.checked = true;
               } else {
                  el.checked = false;
               }
            });
         }

         function compare(id) {
            var res = false;
            self.selectedData.forEach(function(el) {
               if (el.id === id) {
                  res = true;
               }
            })
            return res;
         }
      }
   },

   clear: function() {
      var self = this;
      var clearBtn = this.filter.querySelector('.filter-clear');

      if (clearBtn) {
         clearBtn.addEventListener('click', function() {
            self.filterSection.forEach(function(item) {
              var type = item.getAttribute('data-filter');
              var chkBox = item.querySelectorAll('input[type="checkbox"]');
              var radioBtn = item.querySelectorAll('input[type="radio"]');
              var inputRange = item.querySelectorAll('.filter-fromto input');
              if (chkBox.length) {
                clearCheckBoxes(chkBox);
              }
              if (radioBtn.length) {
                clearCheckBoxes(radioBtn);
              }
              if (inputRange.length) {
                clearRange(inputRange);
              }
              self.setSummary(type, item, true);
            })
            self.clearSearchFiled();
            $( "#filter-form" ).submit();
         })

         function clearCheckBoxes(chkBox) {
            chkBox.forEach(function(chk) {
               chk.checked = false;
            })
         }

         function clearRange(input) {
            input.forEach(function(el) {
               el.value = '';
            })
         }
      }
   },
   clearSearchFiled: function() {
      var searchField = document.querySelector('.filter-head .search-field');

      searchField.value = '';
   },

   currencyHandler: function() {  
    var curItems = this.filter.querySelectorAll('.filter-currency input');
    var curItemsLabels = this.filter.querySelectorAll('.filter-currency label');
    var curSelect = document.querySelector('.currency.custom-sel');
    var self = this;

    (function () {
      var cur = curSelect.value;
      for (var i = 0; i < curItems.length; i++) {
        if (curItems[i].value === cur) {
          curItems[i].checked = true;
        }
      }
    })();

    for (var i = 0; i < curItemsLabels.length; i++) {
      curItemsLabels[i].addEventListener('click', function() {
        curSelect.value = self.filter.querySelector('#' + this.htmlFor).value;
        curSelect.closest('form').submit();
      })
    }   
   },

   setSummary: function(type, filter, clear) {
      if (type === 'type' || type === 'condition' || type === 'years' || type === 'years2') {
         this.setDescription(filter, type, findCheckedInputs(type));
      } else if (type === 'districts' || type === 'metro' || type === 'complex') {
         this.setDescription(filter, type, inputCheckedAmount());
      } else if (type === 'area' || type === 'price') {
         if (!clear) {
            var min = filter.querySelector('.min').value;
            var max = filter.querySelector('.max').value;
            if (min !== '' && max !== '') {
               this.setDescription(filter, type, [min, max]);
            } else {
               this.setDescription(filter, type, '');
            }

         } else if (clear) {
            this.setDescription(filter, type, '');
            this.setDefaultRange(filter);
         }
      }

      function checkRange(id) {
         var res = false;
         var min;
         var max;
         var values;

         min =  $(id).slider("option", 'min');
         max =  $(id).slider("option", 'max');

         values = $(id).slider("option", 'values');

         if (+min !== +values[0] || +max !== +values[1]) {
            res = true;
         }
         return res;
      }

      function findCheckedInputs() {
        var checked = filter.querySelectorAll('input:checked');
        var labels = filter.querySelectorAll('label');
        var values = [];
        var res;

        checked.forEach(function(input) {
          labels.forEach(function(label) {
            if (label.htmlFor === input.id) {
              values.push(label.innerHTML);
            }
          });
        });
        if (type === 'years' || type === 'years2') {
          res = values;
        } else {
          res = values.join(', ');
        }
        return res;
      }

      function inputCheckedAmount() {
         var checked = filter.querySelectorAll('input:checked')
         return checked.length;
      }
   },

   setDefaultRange: function(filter) {
      var inputs = filter.querySelectorAll('input');

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
   },

   setDescription: function (filter, type, text) {
      var txtHolder = filter.querySelector('.description');
      var defaultText;
      var addText;

      if (text.length != 0 && text != 0) {
         txtHolder.classList.add('dis');
      } else {
         txtHolder.classList.remove('dis');
      }

      if (type === 'type' || type === 'years' || type === 'years2') {
         defaultText = 'Не выбран';
      } else if (type === 'condition') {
         defaultText = 'Не выбрано';
      } else if (type === 'districts') {
         defaultText = 'Все районы';
         if (text === 1) {
            addText = 'район';
         } else if (text > 1 && text <= 4) {
            addText = 'районa';
         } else if (text > 4) {
            addText = 'районов';
         }
      } else if (type === 'metro') {
         defaultText = 'Все станции';
         if (text === 1) {
            addText = 'станция';
         } else if (text > 1 && text <= 4) {
            addText = 'станции';
         } else if (text > 4) {
            addText = 'станций';
         }
      } else if (type === 'complex') {
         defaultText = 'Не выбран';
         addText = ' ЖК'
      } else if (type === 'area') {
         defaultText = 'Не выбранa';
         addText = ' М2';
      } else if (type === 'price') {
         defaultText = 'Не выбранa';

         var cur = filter.querySelector('.filter-currency input:checked');
         addText = cur.nextElementSibling.innerHTML + ' ';
      }

      if (type === "type") {
         if (text.length !== 0) {
            this.addLongSummary(text, txtHolder);
         } else {
            txtHolder.innerHTML = defaultText;
            if (txtHolder.nextElementSibling.classList.contains('description-more')) {
               txtHolder.nextElementSibling.remove();
            }
         }
      } else if (type === 'districts' || type === 'metro' || type === 'complex') {
         if (text != 0) {
            txtHolder.innerHTML = text + ' ' +  addText;
         } else {
            txtHolder.innerHTML = defaultText;
         }
      } else if (type === 'condition' || type === 'years' || type === 'years2') {
         if (text.length !== 0) {
            txtHolder.innerHTML = text;
         } else {
            txtHolder.innerHTML = defaultText;
         }
      } else if (type === 'area') {
         if (text.length !== 0) {
            txtHolder.innerHTML = text[0] + ' - ' + text[1] + addText;
         } else {
            txtHolder.innerHTML = defaultText;
         }
      } else if (type === 'price') {
         if (text.length !== 0) {
            txtHolder.innerHTML = addText + formatPrice(text[0]) + ' - ' + formatPrice(text[1]);
         } else {
            txtHolder.innerHTML = defaultText;
         }
      }
   },

   addLongSummary: function(text, el) {
      this.id;
      var str = '';
      var arrText = text.split(', ');
      var elWidth = el.offsetWidth;
      var amount = 0;

      el.classList.add('no-wrap');


      (function createTestElement() {
         for (var i = 0; i < arrText.length; i++) {
            str += arrText[i];
            el.innerHTML = str;

            if (!checkWidth()) {
               this.id = i;
               break;
            }
         };
         setText();
      })();

      function setText() {
         str = '';

         arrText.forEach(function(item , i) {
            if (this.id != undefined) {
               if (i < this.id) {
                  str +=  item + ',';
               } else if (i > +this.id) {
                  amount++
               }
            } else if (this.id === undefined) {
                if (i != arrText.length - 1) {
                  str +=  item + ',';
               } else {
                  str +=  item;
               }
            }
         });
         addText();
         this.id = undefined;
      }

      function addText() {
         var flag = el.nextElementSibling.classList.contains('description-more');
         var count = amount + 1;
         if (this.id != undefined) {
            if (!flag) {
               var span = document.createElement('span');
               span.classList.add('description-more');
               el.parentNode.insertBefore(span, el.nextElementSibling);
            } else {
               span = el.nextElementSibling;
            }
            span.innerHTML = 'и еще ' + count;
            el.innerHTML = str;

         } else if (this.id === undefined) {
            el.innerHTML = str;
            if (flag) {
               el.nextElementSibling.remove();
            }
         }
      }

      function checkWidth() {
         var res = true;
         if (+el.offsetWidth > +elWidth) {
            res = false;
         }
         return res;
      }
   }
}

var filters = new Filters();

$('.filter-submit').on ("click", function() {
  $( "#filter-form" ).submit();
});

$('.event-sorter .sorter').on ("change", function() {
   if (this.value != '0') {
      insertParam('sort', this.value);
   } else if (this.value === '0') {
      removeParam('sort');
   }
 });

 function insertParam(key, value) {
   var key = escape(key);
   var value = escape(value);

   var kvp = document.location.search.substr(1).split('&');
   if (kvp == '') {
       document.location.search = '?' + key + '=' + value;
   }
   else {

       var i = kvp.length;
       var x;
       while (i--) {
           x = kvp[i].split('=');

           if (x[0] == key) {
               x[1] = value;
               kvp[i] = x.join('=');
               break;
           }
       }

       if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

       window.location = window.location.origin + window.location.pathname + '?' + kvp.join('&');
   }
}

function removeParam(key) {
   var sourceURL = document.location.search;
   var rtn = sourceURL.split("?")[0];
   var param;
   var params_arr = [];
   var queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";

   if (queryString !== "") {

      params_arr = queryString.split("&");
      if (params_arr.length == 1) {
         var request = window.location.origin + window.location.pathname;
         request.charAt(request.length - 1);
         window.location = request;
      } else  {
         for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
               params_arr.splice(i, 1);
            }
         }
         rtn = rtn + "?" + params_arr.join("&");

         window.location = window.location.origin + window.location.pathname + rtn;
      }
   }
}

function filtersSubmit() {
   var form = document.querySelector('#filter-form');
   var city = document.querySelector('.filter-head .city');
   var search = document.querySelector('.filter-head .search-field');
   var defaultCity = 'harkov';


   $( "#filter-form" ).on( "submit", function(event) {
      event.preventDefault();
      createRequestString(this.action, this);
   });

   function createRequestString(url, form) {
      var checked = form.querySelectorAll('input:checked');
      var rangeInputs = form.querySelectorAll('.filter-fromto');
      var requestObj = {};
      var name = '';
      var values = [];
      var str = '';

      checked.forEach(function(el) {
         if (name !== el.name) {
            if (el.name === 'currency') {
              if (checkPrice()) {
                requestObj[el.name] = [];
                values = [];
              } else {
                return false;
              }
            } else {
              requestObj[el.name] = [];
              values = [];
            }
         }
        requestObj[el.name].push(el.value);
        name = el.name;
      });

      rangeInputs.forEach(function(el) {
         var min = el.querySelector('.min');
         var max = el.querySelector('.max');     

         if (name !== min.name && checkRange(min.value,max.value)) {
            requestObj[min.name] = [];
            values = [];

            if (+max.value === 0) {
              requestObj[min.name].push(0);
            } else {
              requestObj[min.name].push(min.value);
              requestObj[min.name].push(max.value);  
            }
            
         }
        name = el.name;
      });

      if (city.value !== defaultCity) {
         requestObj.city = city.value;
      }

      if (search.value.length > 0) {
         requestObj.keyword = search.value;
      }
      for (var key in requestObj) {
         if (str != "") {
             str += "&";
         }
         str += key + "=" + requestObj[key];
      }
      if (str) {
         window.location = url + '?' + str;
      } else {
         window.location = url;
      }
   }

   function checkPrice() {
      var min = form.querySelector('.price.min').value;
      var max = form.querySelector('.price.max').value;  

      return checkRange(min, max);  
   }

   function checkRange(min, max) {
      if (min === '' || (max === '')) {
        return false;
      }

      return true;
   }
}

function initFiltersTags() {
   var form = document.querySelector('#filter-form');
   var tags = document.querySelectorAll('.filter-tags-item');
 
   tags.forEach(function(tag) {
     var remove = tag.querySelector('.filter-tags-close');
 
     remove.addEventListener('click', function() {
        formUpdate(tag.querySelector('input'));
        this.parentNode.remove();
     })
   });
 
   function formUpdate(el) {
     var type = el.dataset.type;
     var value = el.value;
     var name = el.name;
     var formInputs = form.querySelectorAll('input[name="'+ type +'"]');
      if (type === 'area' || type === 'price') {
         formInputs.forEach(function(input) {
            input.value = '';
         })
      } else {
         formInputs.forEach(function(input) {
            if (input.value === value && input.checked === true) {
               input.checked = false;
            }
         })
      }
     $( "#filter-form" ).submit();
   }
 }

function setFavoriteCard() {
   var cards = document.querySelectorAll('.event-favorites');
   var storageItem = 'favorites';
   var favStorage = localStorage.getItem(storageItem);
   var favId = [];
   var counter = document.querySelectorAll('.favorites-link span');
   if (favStorage) {
      favId = JSON.parse(localStorage.getItem(storageItem));
      setOnLoad();
   }

    for (var a = 0; a < counter.length; a++) {
        counter[a].innerHTML = favId.length;
    }

   cards.forEach(function(card) {
      card.addEventListener('click', function(e) {
         e.preventDefault();

         if (!e.currentTarget.classList.contains('active') && card.getAttribute('data-id')) {
            e.currentTarget.classList.add('active');
            favorites.add(card.getAttribute('data-id'));
            setlocalStorageItem(favId);
         } else if (e.currentTarget.classList.contains('active') && card.getAttribute('data-id')) {
            e.currentTarget.classList.remove('active');
            favorites.remove(card.getAttribute('data-id'));
            setlocalStorageItem(favId);
         }

         for (var a = 0; a < counter.length; a++) {
             counter[a].innerHTML = favId.length;
         }
      })
   });

   function setOnLoad() {
      cards.forEach(function(card) {
         if (card.getAttribute('data-id') && checkId(card.getAttribute('data-id'))) {
            card.classList.add('active');
         }
      });

      function checkId(id) {
         var res = false;

         favId.forEach(function(item) {
            if (item === id) {
               res = true;
            }
         })

         return res;
      }
   }

   function setlocalStorageItem(el) {
      localStorage.setItem(storageItem, JSON.stringify(el));
   }

   var favorites = {
      add: function(id) {
         favId.push(id);
      },
      remove: function(id) {
         if (favId) {
            favId.forEach(function(item,i) {
               if(id === item) {
                  favId.splice(i, 1);
               }
            })
         }
      }
   }
}

function changeCurrency() {
   var selects = document.querySelectorAll('.currency-change select');
   selects.forEach(function(select) {
      select.addEventListener('change', function() {
         this.closest('form').submit();
      })
   })
}

function userActionPopup() {
  var timeoutID;
  var timer = 30000;
   
  function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);

    startTimer();
  }

  function destroy() {
    this.removeEventListener("mousemove", resetTimer, false); 
    this.removeEventListener("mousedown", resetTimer, false);
    this.removeEventListener("keypress", resetTimer, false);
    this.removeEventListener("DOMMouseScroll", resetTimer, false);
    this.removeEventListener("mousewheel", resetTimer, false);
    this.removeEventListener("touchmove", resetTimer, false);
    this.removeEventListener("MSPointerMove", resetTimer, false);
  }

  setup();
   
  function startTimer() {  
    timeoutID = window.setTimeout(goInactive, timer);
  }
   
  function resetTimer(e) {
    window.clearTimeout(timeoutID);
    startTimer();
  }
   
  function goInactive() {
    var random = Math.floor(Math.random() * 3) + 6; // range 6-8

    $.fancybox.open({
      src: '#popup' + random, 
    });
    timeoutID = false;
    destroy();
  }
}

function initRangeInput() {
  var inputWrap = document.querySelectorAll('.fromto-input');
  var priceRange = 5000;
  var areaRange = 5;
  var step;

  for (var i = 0; i < inputWrap.length; i++) {
    var controls = inputWrap[i].querySelector('.fromto-arrows');
    var input = inputWrap[i].querySelector('input');

    input.addEventListener('keyup', function(e) {
       var key;

       if (window.event) {
          key = window.event.keyCode;
       }
       else if (e) {
          key = e.which;
       }
       else {
          return true;
       }

       if (key === 38) {
           setValue(this, e, 'inc');
       } else if (key === 40) {
          setValue(this, e, 'dec');
       }
    });

    controls.addEventListener('click', function(e) {
      var input = e.target.closest('.fromto-input').querySelector('input');
      
      setValue(input,e)
    })

    function setValue(input, e, action) {
      var value = +input.value;

      if (input.classList.contains('area')) {
        step = areaRange
      } else if (input.classList.contains('price')) {
        step = priceRange;
      }
      
      if (e.target.classList.contains('arrow-up') || action === 'inc') {
        input.value = value + step;
      } else if (e.target.classList.contains('arrow-down') || action === 'dec') {
        if (value === 0 || (value - step) < 0) {
          input.value = 0;
        } else {
          input.value = value - step;
        }
      }
    }
  }
}
