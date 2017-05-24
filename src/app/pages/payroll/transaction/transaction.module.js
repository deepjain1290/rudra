/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction', [
     'BlurAdmin.pages.payroll.transaction.EmployeeIncentive',
     'BlurAdmin.pages.payroll.transaction.SalaryAttendancecycle',
     'BlurAdmin.pages.payroll.transaction.Salarypayrollprocess',
       'BlurAdmin.pages.payroll.transaction.LeaveEncashment',
         'BlurAdmin.pages.payroll.transaction.LeaveEncashmentHistory'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('payroll.transaction', {
        url: '/transaction',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Trasaction',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      })
  }

})();
