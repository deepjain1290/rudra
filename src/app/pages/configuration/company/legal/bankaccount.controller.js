/**
 * @author NKM
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('bankAccountController', bankAccountController);

    /** @ngInject */
    function bankAccountController($scope, dialogModal, editFormService, pageService, $rootScope, param) {
        //    console.log($state)
        var vm = this;

        $scope.addBankAccount = _saveForm;
        $scope.companyList = [];
        $scope.oldEntity = {};
        $scope.entity = {};
        $scope.edit = false;

        var bankPageId = 496;
        if (param != undefined) {
            $scope.edit = true;
            $scope.entity = param;
            $scope.oldEntity = angular.copy($scope.entity)
        }

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }



        function _loadController() {
            pageService.getPagData(bankPageId).then(_getPageSuccessResult, _getPageErrorResult)
        }
        function _getPageSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;

        }

        function _getPageErrorResult(err) {
            console.log(err)
        }

        function _saveForm() {
            console.log('save record')
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            // editFormService.saveForm(496, $scope.entity,
            //     $scope.oldEntity, 'create', 'Save')
            //     .then(_saveFormSuccess, _saveFormError)
            // // }
            editFormService.saveForm(496, $scope.entity, $scope.oldEntity,
                $scope.entity.BADId == undefined ? "create" : "edit", 'Save', undefined, true)
                .then(_saveFormSuccess, _saveFormError)
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {
            console.log(result)
            if (result.success_message == "Added New Record.") {
                $rootScope.showMsg("success", "Record Save Successfully");
            }
            else {
                if (result.success_message == "Record Updated.") {
                    $rootScope.showMsg("success", "Record Updated");
                }
            }
            _childmethod();
            $scope.$close();
            // $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            $scope.$close();
            alert('error')
        }
        _loadController()
    }

})();
