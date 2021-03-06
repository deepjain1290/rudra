/**
 * @author NKM
 * created on 27.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.searchlist')
        .controller('searchListController', searchListController);

    /** @ngInject */
    function searchListController($scope, $state, $timeout, pageService,$rootScope) {

        var vm = this;
        var pageId = 25;
        var currentState = $state.current;
    
    
        vm.filterOpt = {};
        vm.searchList = [];
        vm.orderByList = [];
    
        this.applyFilter = _applyFilter;
        // this.uploadRecord = _uploadRecord;
    
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 25;
        $scope.page.searchList = [];
        $scope.page.searchList.push({ field: 'JDIsHasLeft', operand: '=', value: 0 })
        // $scope.page.searchList.push({ field: 'VAYear', operand: '=', value: moment().format('YYYY') })
        // $scope.page.searchList.push({ field: 'VADepartmentId', operand: '=', value: -1 })
        $scope.page.boxOptions = {
          selfLoading: true,
          showRefresh: true,
          showFilter: true,
          showAdd: false,
          showRowMenu: true,
          showCustomView: true,
          showUpload: false,
          showDialog: false,
          enableRefreshAfterUpdate: true,
          showDataOnLoad: true,
          gridHeight: 450,
          getPageData: null,
          refreshData: null,
          addRecord: null,
          editRecord: null,
          updateRecord: null,
          viewRecord: null,
          deleteRecord: null,
          uploadRecord: false,
          pageResult: _pageResult,
          dataResult: _dataResult
        }
        function _dataResult(result) {
          console.log(result);
        }
    
        function _pageResult(row) {
          console.log(row);
          angular.forEach(row.pageinfo.filters, function (filter) {
            if (filter.name == 'JDIsHasLeft') {
              filter.value = 0
            }
          })
    
        }
        function _addRecord() {
          $state.go("organization.employees.add", "{action:'create'}");
        }
        function _editRecord(row) {
          var empId = row.entity.EmpId;
          $state.go("organization.employees.edit", { action: 'edit', empId: empId });
        }
        function _updateRecord(row) {
          var empId = row.entity.EmpId;
          alert('_updateRecord called:' + empId)
        }
        function _deleteRecord(row) {
          var empId = row.entity.EmpId;
          alert('_deleteRecord called:' + empId)
        }
        function _viewRecord(row) {
          var empId = row.entity.EmpId;
          alert('_viewRecord called:' + empId)
        }
        function _openView() {
          alert('view opened')
        }
        function _uploadRecord() {
          $state.go('organization.employees.upload')
        }
        function _applyFilter() {
          console.log($scope.page.pageinfo.filters);
          $scope.page.searchList = [];
          angular.forEach($scope.page.pageinfo.filters, function (filter) {
    
            if (filter.showFilter !== undefined) {
              if (filter.showFilter) {
                if (filter.value !== undefined) {
                  var search = {};
                  search.field = filter.name;
                  search.operand = filter.operator;
                  search.value = filter.value;
                  $scope.page.searchList.push(search)
                }
              }
            }
          })
    
          $scope.page.refreshData();
    
        }
      }
})();

