/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('salaryApprovalController', salaryApprovalController);

    /** @ngInject */
    function salaryApprovalController($scope, $rootScope, pageService, param) {

        var queryId = 520;
        $scope.pendingVerification = true;
        $scope.height = "430px";


        $scope.aprroveAttendance = _approveAttendance;
        $scope.closeModal = _closeModal;


        $scope.gridReviewAllEmpOptions = {
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-expandable ui-grid-auto-resize ui-grid-pinning ui-grid-edit class="paybandgrid payband"></div>',
            expandableRowHeight: 80,
            //subGridVariable will be available in subGrid scope
            enableExpandableRowHeader: true,
            expandableRowScope: {
                subGridVariable: 'subGridScopeVariable',
                externalScope: $scope
            },
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            paginationPageSizes: [10, 20, 30, 40],
            paginationPageSize: 10,
            onRegisterApi: _onGridRegisterApi,
            columnDefs: [
                {
                    name: 'ShortName',
                    cellEditableCondition: false,
                    width: 32,
                    displayName: '',
                    cellTemplate: "<div class='member-profile-picture-container profile-picture-container col-lg-1 clear-side-padding col-md-2'><div class='profile-picture'><div random-Color class='img-circle img-initials'><span style='color:white'>{{row.entity.ShortName}}</span></div> </div></div>"
                },
                { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                {
                    name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false, visible: true,
                },
                { name: 'Org_TotalDays', displayName: 'Total Days', width: 60, enableCellEdit: false, visible: true },
                { name: 'Org_TotalSalaryDays', displayName: 'Salary Days', width: 60, enableCellEdit: false, visible: true },
                { name: 'Org_TotalPresentDays', displayName: 'Present Days', width: 60, enableCellEdit: false },
                { name: 'Org_TotalWeekoff', displayName: 'Total WeekOffs', width: 60, enableCellEdit: false },
                { name: 'Org_TotalHolidays', displayName: 'Total Holidays', width: 60, enableCellEdit: false },
                { name: 'Org_AbsentDays', displayName: 'Absent Days', width: 60, enableCellEdit: false },
                { name: 'Org_TotalLeaves', displayName: 'Total Leaves', width: 80, enableCellEdit: false },
                { name: 'Org_TotalDays', displayName: 'Total Days', width: 60, enableCellEdit: false },
                { name: 'Org_AMSWeekOffPresent', displayName: 'WeekOffDay Present', width: 60, enableCellEdit: false },
                { name: 'Org_AMSHolidayPresent', displayName: 'HolidayDay Present', width: 60, enableCellEdit: false },
                { name: 'Org_TotalLateCount', displayName: 'Late Count', width: 60, enableCellEdit: false },
                { name: 'Org_DeductableLateDays', displayName: 'Late Days', width: 60, enableCellEdit: false },
                { name: 'Org_TotalDeductableDays', displayName: 'Deduct Days', width: 60, enableCellEdit: false },
                { name: 'Org_DeductableLateCount', displayName: 'Deduct Late Days', width: 60, enableCellEdit: false },
                { name: 'Org_TotalLWP', displayName: 'LWP', width: 60, enableCellEdit: false },
                { name: 'Org_AMSIncentiveDays', displayName: 'Incentive Days', width: 60, enableCellEdit: false },
                { name: 'Org_AMSSingleOTMinutes', displayName: 'Single OT Minute', width: 60, enableCellEdit: false },
                { name: 'Org_AMSSingleOTHours', displayName: 'Single OT Hours', width: 60, enableCellEdit: false },
                { name: 'Org_AMSDoubleOTMinutes', displayName: 'Double OT Minute', width: 60, enableCellEdit: false },
                { name: 'Org_AMSDoubleOTHours', displayName: 'Double OT Hours', width: 60, enableCellEdit: false },
                { name: 'Org_AMSTotalWeekOffComp', displayName: 'Total WeekOffComp', width: 60, enableCellEdit: false },
                { name: 'Org_AMSTotalHolidayComp', displayName: 'Total HolidayComp', width: 60, enableCellEdit: false },
                { name: 'Org_AMSIncompleteDays', displayName: 'Incompleted Days', width: 60, enableCellEdit: false },

            ],
        }

        function _onGridRegisterApi(gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $scope.isRowSelected = true;
                    $scope.selectedRows = gridApi.selection.getSelectedRows();
                }
                else {
                    $scope.isRowSelected = false;
                }

            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                $scope.selectedRows = gridApi.selection.getSelectedRows();
                if ($scope.selectedRows.length > 0) {
                    $scope.isRowSelected = true;
                }
                else {
                    $scope.isRowSelected = false;
                }
            });
            gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {

                if (row.isExpanded) {
                    $scope.height = '510px';
                    row.entity.subGridOptions = {};
                    row.entity.subGridOptions.columnDefs = [{
                        name: 'ShortName',
                        cellEditableCondition: false,
                        width: 32,
                        displayName: '',
                        cellTemplate: "<div class='member-profile-picture-container profile-picture-container col-lg-1 clear-side-padding col-md-2'><div class='profile-picture'><div random-Color class='img-circle img-initials'><span style='color:white'>{{row.entity.ShortName}}</span></div> </div></div>"
                    },
                    { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                    {
                        name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false, visible: true,
                    },
                    { name: 'Org_TotalDays', displayName: 'Total Days', width: 60, enableCellEdit: false, visible: true },
                    { name: 'Org_TotalSalaryDays', displayName: 'Salary Days', width: 60, enableCellEdit: false, visible: true },
                    { name: 'Org_TotalPresentDays', displayName: 'Present Days', width: 60, enableCellEdit: false },
                    { name: 'Org_TotalWeekoff', displayName: 'Total WeekOffs', width: 60, enableCellEdit: false },
                    { name: 'Org_TotalHolidays', displayName: 'Total Holidays', width: 60, enableCellEdit: false },
                    { name: 'Org_AbsentDays', displayName: 'Absent Days', width: 60, enableCellEdit: false },
                    { name: 'Org_TotalLeaves', displayName: 'Total Leaves', width: 80, enableCellEdit: false },
                    { name: 'Org_TotalDays', displayName: 'Total Days', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSWeekOffPresent', displayName: 'WeekOffDay Present', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSHolidayPresent', displayName: 'HolidayDay Present', width: 60, enableCellEdit: false },
                    { name: 'Org_TotalLateCount', displayName: 'Late Count', width: 60, enableCellEdit: false },
                    { name: 'Org_DeductableLateDays', displayName: 'Late Days', width: 60, enableCellEdit: false },
                    { name: 'Org_TotalDeductableDays', displayName: 'Deduct Days', width: 60, enableCellEdit: false },
                    { name: 'Org_DeductableLateCount', displayName: 'Deduct Late Days', width: 60, enableCellEdit: false },
                    { name: 'Org_TotalLWP', displayName: 'LWP', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSIncentiveDays', displayName: 'Incentive Days', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSSingleOTMinutes', displayName: 'Single OT Minute', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSSingleOTHours', displayName: 'Single OT Hours', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSDoubleOTMinutes', displayName: 'Double OT Minute', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSDoubleOTHours', displayName: 'Double OT Hours', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSTotalWeekOffComp', displayName: 'Total WeekOffComp', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSTotalHolidayComp', displayName: 'Total HolidayComp', width: 60, enableCellEdit: false },
                    { name: 'Org_AMSIncompleteDays', displayName: 'Incompleted Days', width: 60, enableCellEdit: false },
                    ];
                    row.entity.subGridOptions.data = [];
                    // var subGridColumns = angular.copy($scope.gridReviewAllEmpOptions.columnDefs)
                    angular.forEach(row.entity.subGridOptions.columnDefs, function (data) {
                        if (data.name != "EmpCode" && data.name != "EmpName" && data.name != "ShortName") {
                            data.enableCellEdit = true;
                            data.cellClass = 'YELLOW-300 status-bg cell-border-right';
                        }
                    })

                    //   row.entity.subGridOptions.columnDefs = subGridColumns;
                    row.entity.subGridOptions.data.push(angular.copy(row.entity));

                }
                else {
                    $scope.height = "430px";
                }

            });


        }

        function _loadController() {
            $scope.modalTitle = param.modalTitle;
            var searchLists = [];
            searchLists.push({ field: 'Month', operand: '=', value: param.month })
            searchLists.push({ field: 'Year', operand: '=', value: param.year })
            searchLists.push({ field: 'SubUnitId', operand: '=', value: param.subUnitId })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 518).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)


                var pendingSalary = [];
                angular.forEach(result[0], function (data) {

                    var spiltName = data.EmpName.split(' ');
                    if (spiltName.length == 3) {
                        data.ShortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                    }
                    else if (spiltName.length == 2) {
                        data.ShortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                    }
                    else {
                        data.ShortName = spiltName[0].substr(0, 1);
                    }
                    if (!data.IsApproved && data.FailedRemark == "Verified") {
                        pendingSalary.push(data);
                    }

                })
                $scope.gridDataCount = pendingSalary.length;
                $scope.gridReviewAllEmpOptions.data = pendingSalary;
                if (pendingSalary.length == 0) {
                    $scope.noDataFound = true;
                }
                else {
                    $scope.noDataFound = false;
                }



            }
            function _getCustomQueryErrorResult(err) {

            }
        }

        function _approveAttendance(statusId) {
            var finalVerifyData = [];
            var negitiveCount = 0;
            if ($scope.selectedRows != undefined && $scope.selectedRows.length > 0) {
                if ($scope.selectedRows.length == 1 && $scope.selectedRows[0].StatusBGClass != "") {
                    finalVerifyData = angular.copy($scope.selectedRows)
                    alert("you are not allowed to verify this attendance");
                    return;
                }
                else {
                    if ($scope.gridDataCount == $scope.selectedRows.length) {
                        if ($scope.selectedRows[0].SMAllowedNegitiveVerify) {
                            finalVerifyData = angular.copy($scope.selectedRows)
                        } else {
                            angular.forEach($scope.selectedRows, function (data, index) {
                                if (data.StatusBGClass == "") {
                                    if (data.subGridOptions != undefined) {
                                        data = data.subGridOptions.data[0];
                                        data.StatusId = statusId;
                                        finalVerifyData.push(data);
                                    }
                                    else {
                                        data.StatusId = statusId;
                                        finalVerifyData.push(data);
                                    }
                                } else {
                                    negitiveCount++;
                                }

                            })
                            if ($scope.selectedRows.length == negitiveCount) {
                                alert("you are not allowed to verify this attendance");
                                finalVerifyData = [];
                                return
                            }
                        }
                    } else {
                        angular.forEach($scope.selectedRows, function (data, index) {
                            if (data.StatusBGClass == "") {
                                // data = data.subGridOptions.data;
                                if (data.subGridOptions != undefined) {
                                    data = data.subGridOptions.data[0];
                                    data.StatusId = statusId;
                                    finalVerifyData.push(data);
                                }
                                else {
                                    data.StatusId = statusId;
                                    finalVerifyData.push(data);
                                }
                            } else {
                                negitiveCount++;
                            }

                        })
                        if ($scope.selectedRows.length == negitiveCount) {
                            alert("you are not allowed to verify this attendance");
                            finalVerifyData = [];
                            return
                        }
                    }
                }

                console.log(finalVerifyData)


                var searchLists = [];
                var startDate = "";
                var endDate = "";

                startDate = param.year + "-" + param.month + "-" + 1
                endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');



                var searchListData = {
                    field: 'VerifyAttendance',
                    operand: "table",
                    value: LZString.compressToEncodedURIComponent(JSON.stringify(finalVerifyData))
                }
                searchLists.push(searchListData)
                searchListData = {
                    field: 'FromDate',
                    operand: '=',
                    value: startDate

                }
                searchLists.push(searchListData)
                searchListData = {
                    field: 'EndDate',
                    operand: '=',
                    value: endDate
                }
                searchLists.push(searchListData)

                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            }

        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result);

            $scope.showMsg("success", "Verify Successfully");
            _loadController();



            // if (result. == { emp = 1, sum = 1 }) {
            //  
            //   $scope.page.refreshData();
            // }
        }

        function _getCustomQueryErrorResult(err) {

        }
        function _closeModal() { 
            $scope.modalInstance.close($scope.gridDataCount);
        }

        _loadController();
    }
})();



