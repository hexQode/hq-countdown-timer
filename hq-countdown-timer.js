/*!
 * HQ Countdown Timer v1.0.0
 * https://github.com/hexQode/hq-countdown-timer
 *
 * Copyright 2025 HexQode
 * Released under the MIT license
 */
(function($) {
    $.fn.hqCountdownTimer = function(options) {
      const settings = $.extend({
        daysSelector: '.hq-days',
        hoursSelector: '.hq-hours',
        minutesSelector: '.hq-minutes',
        secondsSelector: '.hq-seconds',
        endMessage: 'Countdown ended!',
        endedClass: 'hq-ended',
        onEnd: function() {}
      }, options);
  
      return this.each(function() {
        const $container = $(this);
        const targetDate = new Date($container.data('target-date')).getTime();
        
        const timer = setInterval(() => {
          const now = Date.now();
          const distance = targetDate - now;
  
          if (distance < 0) {
            clearInterval(timer);
            $container.addClass(settings.endedClass)
                      .html(`<div class="hq-countdown-ended">${settings.endMessage}</div>`);
            settings.onEnd();
            return;
          }
  
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
          $container.find(settings.daysSelector).text(days.toString().padStart(2, '0'));
          $container.find(settings.hoursSelector).text(hours.toString().padStart(2, '0'));
          $container.find(settings.minutesSelector).text(minutes.toString().padStart(2, '0'));
          $container.find(settings.secondsSelector).text(seconds.toString().padStart(2, '0'));
        }, 1000);
      });
    };
  })(jQuery);