/**
 * @author NKM
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply', [
        'BlurAdmin.pages.self.apply.applyattendance',
        'BlurAdmin.pages.self.apply.applyleave',
        'BlurAdmin.pages.self.apply.applyloan',
        'BlurAdmin.pages.self.apply.coff',
        'BlurAdmin.pages.self.apply.overview',
        'BlurAdmin.pages.self.apply.applyod',
        'BlurAdmin.pages.self.apply.monthlybyattendance',
        
        
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply', {
                url: '/apply',
                templateUrl: 'app/pages/self/apply/apply.html',
                title: 'Apply',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
