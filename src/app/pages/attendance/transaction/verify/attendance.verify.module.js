
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verify', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.verify', {
        url: '/verify',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/verify/attendance.verify.html',
        controller: "attTransverifyController",
        controllerAs: "attVerifyCtrl",
        title: 'Verify Attendance',
        sidebarMeta: {
          order: 3,
          parent: 'attendance.transaction',
          pageTitle: 'Att verify'
        },
      })
  }

})();
