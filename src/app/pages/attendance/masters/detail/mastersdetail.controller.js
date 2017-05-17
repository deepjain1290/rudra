/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.masters')
    .controller('attMastersDetailController', attMastersDetailController);

  /** @ngInject */
  function attMastersDetailController($stateParams, mailMessages) {
    var vm = this;
    vm.mail = mailMessages.getMessageById($stateParams.id);
    vm.pageId = $stateParams.pageId;
  }

})();
