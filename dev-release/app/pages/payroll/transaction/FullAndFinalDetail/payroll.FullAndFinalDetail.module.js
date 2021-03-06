
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.FullAndFinalDetail', {
        url: '/FullAndFinalDetail',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/FullAndFinalDetail/payroll.FullAndFinalDetail.html',
        controller: "payFullAndFinalDetailController",
        controllerAs: "payCtrl",
        title: 'FullAndFinalDetail Apply',
        sidebarMeta: {
          order: 4,
          parent: 'payroll.transaction',
          pageTitle: 'Leave Full And FinalDetail'
        },
      })
  }

})();
