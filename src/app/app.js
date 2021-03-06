(function () {
    'use strict';
    // angular.uppercase = function (text) {
    //     return text.toUpperCase();
    // }
    // angular.lowercase = function (text) {
    //     return text.toLowerCase();
    // }

    angular.module('BlurAdmin', [
        // 'ngMaterial',
        'ngAnimate',
        'ui.bootstrap',
        'ui.sortable',
        'ui.router',
        'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.pagination',
        'ui.grid.edit', 'ui.grid.moveColumns', 'ui.grid.saveState', 'ui.grid.resizeColumns',
        'ui.grid.cellNav', 'ui.grid.pinning',
        'ui.grid.expandable', 'ui.grid.cellNav', 'ui.grid.autoResize','ui.grid.validate',
        'ui.indeterminate',
        'ui.mask',
        'teljs',
        'ui.bootstrap.datetimepicker',
        'moment-picker',
        'ngTouch',
        'ngIdle',
        'toastr',
        'smart-table',
        "xeditable",
        'ui.slimscroll',
        'ui.select',
        'ngJsTree',
        'angular-progress-button-styles',
        'LocalStorageModule',
        'ngMessages',
        'naif.base64',
        '720kb.datepicker',
        'ui.timepicker',
        'ngScrollbars',
        'jQueryScrollbar',
        'rzModule',
        // 'angular-loading-bar',
        'cfp.loadingBar',
        'BlurAdmin.theme',
        'BlurAdmin.pages',
        'BlurAdmin.common',
        'ui.knob',
        'chart.js' 
        // ,
        // 'angularUtils.directives.dirPagination'
    ]);
    angular.module('BlurAdmin').config(function () {
        angular.lowercase = function (text) {
            return text;
        }
        angular.uppercase = function (text) {
            return text;
        }
    });

    var app = {

        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            //app.receivedEvent('deviceready');

            angular.bootstrap(document, ['BlurAdmin']);

        },
        // Update DOM on a Received Event
        receivedEvent: function (id) {

        }
    };

    app.initialize();

})();