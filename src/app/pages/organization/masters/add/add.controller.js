/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.masters')
    .controller('OrgMastersAddController', OrgMastersAddController);

  /** @ngInject */
  function OrgMastersAddController($scope, $stateParams, $timeout, DJWebStore, pageService, editFormService) {
    var vm = this;
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    vm.saveForm = _saveForm;
    vm.oldEntity = {};

    function _loadController() {

      vm.pageId = $stateParams.pageId;
      vm.tempName = $stateParams.name;
      vm.action = $stateParams.action;
      vm.pkId = 0;
      if ($stateParams.pkId !== undefined) {
        vm.pkId = $stateParams.pkId;
      }

      vm.page = DJWebStore.GetValue('Page_' + vm.pageId)
      vm.templateUrlPath = '';
      vm.templateUrlPath = "app/pages/organization/masters/templates/"
        + vm.tempName + "/" + vm.tempName + "-add.html?" + rndValu2 + "=" + rndValu;

      vm.selects = vm.page.pageinfo.selects;
      if (vm.pkId > 0)
        _findEntity()
    }
    function _findEntity() {
      vm.isLoaded = false;
      vm.isLoading = true;
      $timeout(function () {
        pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      });
    }
    function _findEntitySuccessResult(result) {
      vm.isLoaded = true;
      vm.isLoading = false;
      vm.entity = result;
      vm.oldEntity = angular.copy(result)
    }
    function _findEntityErrorResult(err) {
      vm.isLoaded = true;
      vm.isLoading = false;
    }
    function _validateForm(form) {
      return true;
    }
    function _saveForm(form) {
      if (_validateForm(form)) {
        editFormService.saveForm(vm.pageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)
      }
    }


    _loadController();
  }
})();