/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization', [
    'BlurAdmin.pages.organization.employees.masters',
    'BlurAdmin.pages.organization.employees',
    // 'BlurAdmin.pages.organization.payRoll',
    'BlurAdmin.pages.organization.company',
    // 'BlurAdmin.pages.organization.employee',
    // 'BlurAdmin.pages.organization.empupload',
    // 'BlurAdmin.pages.organization.masters',
    'BlurAdmin.pages.organization.general',
    // 'BlurAdmin.pages.organization.employees.report'
    'BlurAdmin.pages.organization.reports',


    // 'BlurAdmin.pages.organization.empadd',
    // 'BlurAdmin.pages.organization.empedit',

  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization', {
        url: '/organization',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Organization',
        headerCode: 'emp',
        sidebarMeta: {
          icon: 'ion-ios-people',
          order: 1,
        },
      });
  }

})();
