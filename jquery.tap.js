/*!
 * jquery.tap.js v1.0.0
 * (c) 2017-present, Weiwei(Camol) Kan
 * Released under the MIT License.
 */
(function($, specialEventName) {
    'use strict';

    var nativeEvent = Object.create(null);
    var getTime = function() {
        return +new Date();
    };

    nativeEvent.original = 'click';

    if ('ontouchstart' in document) {
        nativeEvent.start = 'touchstart';
        nativeEvent.end = 'touchend';
    } else {
        nativeEvent.start = 'mousedown';
        nativeEvent.end = 'mouseup';
    }

    $.event.special[specialEventName] = {
        setup: function(data, namespaces, eventHandle) {
            var $element = $(this);
            var eventData = {};

            $element
                .off(nativeEvent.original)
                .on(nativeEvent.start, function(event) {
                    // Stop execution if an event is simulated.
                    eventData.currentTarget = event.currentTarget;
                    eventData.pageX = event.originalEvent.targetTouches[0].pageX;
                    eventData.pageY = event.originalEvent.targetTouches[0].pageY;
                    eventData.time = getTime();
                    return false;
                })
                .on(nativeEvent.end, function(event) {
                    if (
                        eventData.currentTarget === event.currentTarget &&
                        (getTime() - eventData.time) < 750 &&
                        (
                            Math.abs(eventData.pageX - event.originalEvent.changedTouches[0].pageX) < 20 &&
                            Math.abs(eventData.pageY - event.originalEvent.changedTouches[0].pageY) < 20
                        )
                    ) {
                        event.type = specialEventName;
                        event.pageX = eventData.pageX;
                        event.pageY = eventData.pageY;

                        eventHandle.call(this, event);

                        if (!event.isDefaultPrevented()) {
                            $element
                                .off(nativeEvent.original)
                                .trigger(nativeEvent.original);
                        }
                    }
                });
        },

        remove: function() {
            $(this).off(nativeEvent.start + ' ' + nativeEvent.end);
        }
    };

    $.fn[specialEventName] = function(fn) {
        return this[fn ? 'on' : 'trigger'](specialEventName, fn);
    };
})(jQuery, 'tap');
