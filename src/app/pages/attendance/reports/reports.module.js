/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports', [
    // 'BlurAdmin.pages.attendance.reports.absentreport',
    'BlurAdmin.pages.attendance.reports.attendancedetail',
    //  'BlurAdmin.pages.attendance.reports.absentreport',
    //  'BlurAdmin.pages.attendance.reports.employeeattendance',     
    //  'BlurAdmin.pages.attendance.reports.otsummarydetail',
    //  'BlurAdmin.pages.attendance.reports.emplateattendance' ,

    'BlurAdmin.pages.attendance.reports.musterMonthWise',
    'BlurAdmin.pages.attendance.reports.compoffdetail',
    'BlurAdmin.pages.attendance.reports.oddetail',
    'BlurAdmin.pages.attendance.reports.verifyattendance',
    'BlurAdmin.pages.attendance.reports.dailyverificationattendances',
    'BlurAdmin.pages.attendance.reports.devicewiseattendance'


  ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('attendance.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Report',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      })
  }

})();
