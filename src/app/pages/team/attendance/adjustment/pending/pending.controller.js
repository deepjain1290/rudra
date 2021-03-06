/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment.pending')
        .controller('myTeamPendingAdustmentController', myTeamPendingAdustmentController);

    /** @ngInject */
    function myTeamPendingAdustmentController($scope, $rootScope,$stateParams, pageService, editFormService) {


        var curentDate = new Date();

        $scope.manaual = _manaual;
        $scope.approved = _approved;
        $scope.rejected = _rejected;
        $scope.onhold = _onhold;

     


        function _loadController() {
            var month = $stateParams.month != null ? $stateParams.month : curentDate.getMonth() + 1;
            var year = $stateParams.year != null ? $stateParams.year : curentDate.getFullYear();
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 0 })
            searchLists.push({ field: 'type', operand: '=', value: 'adjustment' })
            searchLists.push({ field: 'month', operand: '=', value: month })
            searchLists.push({ field: 'year', operand: '=', value: year })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allAdustmentApplication = result[0];
                    angular.forEach($scope.allAdustmentApplication, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.ARDFromDate).format('ddd');
                        data.dayToName = moment(data.ARDToDate).format('ddd');
                        data.monthName = moment(data.ARDFromDate).format('MMM');
                        data.dateFrom = moment(data.ARDFromDate).format('DD');
                        data.dateTo = moment(data.ARDToDate).format('DD');
                        data.ARDInTime = moment(data.ARDInTime).format('HH:mm');
                        data.ARDOutTime = moment(data.ARDOutTime).format('HH:mm');
                        var spiltName = data.EmpName.split(' ');
                        if (spiltName.length == 3) {
                            data.shortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                        }
                        else if (spiltName.length == 2) {
                            data.shortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                        }
                        else {
                            data.shortName = spiltName[0].substr(0, 1);
                        }
                    })
                    $scope.noDataFound = false;
                }
                else {
                    $scope.noDataFound = true;
                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        function _manaual(adjustmentApp, form) {
            adjustmentApp.StatusId = 114;
            adjustmentApp.StatusName = "approved";
            adjustmentApp.IsManual = true;
            _submitForm(adjustmentApp, form);

        }

        function _approved(adjustmentApp, form) {
            adjustmentApp.StatusId = 114;
            adjustmentApp.StatusName = "approved";
            adjustmentApp.IsManual = false;
            _submitForm(adjustmentApp, form);

        }
        function _rejected(adjustmentApp, form) {
            adjustmentApp.StatusId = 116;
            adjustmentApp.StatusName = "rejected";
            adjustmentApp.IsManual = false;
            _submitForm(adjustmentApp, form);
        }
        function _onhold(adjustmentApp, form) {
            adjustmentApp.StatusId = 115;
            adjustmentApp.StatusName = "onhold";
            adjustmentApp.IsManual = false;
            _submitForm(adjustmentApp, form);
        }

        function _submitForm(adjustment, form) {
            var comment = "";
            if (adjustment.StatusId == 114) {
                comment = adjustment.comment;
            }
            else if (adjustment.StatusId == 116) {
                comment = adjustment.rejectReason;
            }
            else {
                comment = adjustment.onholdReason;
            }
            var entity = {
                AARDARDId: adjustment.ARDId,
                AARDFromDate: adjustment.ARDFromDate,
                AARDToDate: adjustment.ARDToDate,
                AARDInTime: adjustment.IsManual ? adjustment.InTime : adjustment.ARDInTime,
                AARDOutTime: adjustment.IsManual ? adjustment.OutTime : adjustment.ARDOutTime,
                StatusId: adjustment.StatusId,
                AARDAdminComment: adjustment.IsManual ? adjustment.manaualcomment : comment,
                AARDEmpId: adjustment.EmpId,
                AARDIsManual: adjustment.IsManual
            }

            editFormService.saveForm(503, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Added New Record.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + adjustment.StatusName + " adjustment of " + adjustment.EmpName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
