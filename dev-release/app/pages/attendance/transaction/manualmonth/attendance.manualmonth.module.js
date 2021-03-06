
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manualmonth', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.manualmonth', {
        url: '/manualmonth',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/manualmonth/attendance.manualmonth.html',
        controller: "attTransmanualmonthController",
        controllerAs: "attCtrl",
        title: 'Month By Attendance ',
        sidebarMeta: {
          order: 1,
          parent: 'attendance.transaction',
          pageTitle: 'Month Att'
        },
      })
  }

})();
