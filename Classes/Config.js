   import Runner from './Runner.js'



    /**
     * Default game width.
     * @const
     */
   export var DEFAULT_WIDTH = 600;

    /**
     * Frames per second.
     * @const
     */
    export   var FPS = 60;

    /** @const */
    export  var IS_HIDPI = window.devicePixelRatio > 1;

    /** @const */
    export  var IS_IOS = /iPad|iPhone|iPod/.test(window.navigator.platform);

    /** @const */
    export   var IS_MOBILE = /Android/.test(window.navigator.userAgent) || IS_IOS;

    /** @const */
    export  var IS_TOUCH_ENABLED = 'ontouchstart' in window;

