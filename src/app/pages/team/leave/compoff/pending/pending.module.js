/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.compoff.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.compoff.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/leave/compoff/pending/pending.html',
                title: 'Pending',
                controller: "myTeamPendingCompOffController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
                params: {
                    month: null,   // can initialise to default value
                    year: null, // can initialise to default value                    
                }
            })
        $urlRouterProvider.when('/team/leave/compoff', '/team/leave/compoff/pending');
    }

})();
