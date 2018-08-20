/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.rejected')
        .controller('myTeamRejectedLeaveController', myTeamRejectedLeaveController);

    /** @ngInject */
    function myTeamRejectedLeaveController($scope, $rootScope, pageService, editFormService, dialogModal) {

        $scope.approved = _approved;
        $scope.onhold = _onhold;

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            //    console.log(ev)
            //    console.log(to)
            //    console.log(toParams)
            //    console.log(from)
            //    console.log(fromParams)
        });



        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 45 })
            searchLists.push({ field: 'type', operand: '=', value: 'Leave' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allLeaves = result[0];
                    angular.forEach($scope.allLeaves, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.LEADDateFrom).format('ddd');
                        data.dayToName = moment(data.LEADDateTo).format('ddd');
                        data.monthName = moment(data.LEADDateFrom).format('MMM');
                        data.dateFrom = moment(data.LEADDateFrom).format('DD');
                        data.dateTo = moment(data.LEADDateTo).format('DD');
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

        function _approved(leaveDetails, form) {
            leaveDetails.StatusId = 49;
            leaveDetails.StatusName = "approved";
            _FindEntity(leaveDetails, form);

        }
        function _onhold(leaveDetails, form) {
            leaveDetails.StatusId = 47;
            leaveDetails.StatusName = "onhold";
            _FindEntity(leaveDetails, form);
        }

        function _FindEntity(oldLeave, form) {
            var searchList = [];
            var searchFields = {
                field: "ELSDELAId",
                operand: '=',
                value: oldLeave.LEADId
            }
            searchList.push(searchFields);

            pageService.findEntity(295, undefined, searchList).then(
                _findEntitySuccessResult, _findEntityErrorResult);

            function _findEntitySuccessResult(result) {
                var entity = angular.copy(result);
                entity.StatusId = oldLeave.StatusId;
                if (oldLeave.StatusName == "approved") {
                    entity.ELSDComment = oldLeave.comment;
                }
                else {
                    entity.ELSDComment = oldLeave.onholdReason;
                }
                _submitForm(entity, result, form,oldLeave.EmpName,oldLeave.StatusName);
            }
            function _findEntityErrorResult(err) {
                console.log(err)
            }
        }
        function _submitForm(entity, oldentity, form,empName,statusName) {

            editFormService.saveForm(285, entity, oldentity,
                "edit", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Record Updated.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + statusName + " leave of " + empName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();