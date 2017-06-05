/**
 * @author pardeep.pandit
 * created on 22.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('fieldBox', fieldBox);
    /** @ngInject */
    function fieldBox($location, $state, $compile, $rootScope) {
        return {
            restrict: 'E',
            require: ['^form'],//injecting ngForm in $ctrl variable in link function
            templateUrl: 'app/common/components/fieldBox/fieldBox.html',
            scope: {
                col: '=ngColumn',//a database side column setting provided by pageinfo will be passed here
                entity: '=ngEntity',//an entity of entire form will be passed from this attribute
                editForm: '=form',//a form tag name will be passed through this attribute
                fbMaxDate: '@?fbMaxDate',//max date for date picker
                fbOnKeypress: '&?fbKeypress',//an optional parameter for keypress event
                fbOnkeydown: '&?fbkeydown',//optional parameter for keyup event
                fbOnkeyup: '&?fbkeyup',//optional parameter for keydown event
                fbOnBlur: '&?fbBlur',//optional parameter for blur event
                fbOnClick: '&?fbClick',//optional parameter for on click event
                fbOnChange: '&?fbChange',//optional parameter for on change event
            },
            controller: function ($scope, $timeout) {
                $scope.data = {
                    minDate: moment().subtract(24, 'hours').format('LLL'),
                    maxDate: moment().format('LLL')
                };
            },
            link: function ($scope, $elm, $attrs, $ctrl) {
                //console.log($scope, $attrs)
                if (!$scope.col)
                    return;
                console.log($scope.col.name)
                if ($scope.col.name == 'PdDateOfBirth') {
                    console.log($scope.col);
                }

                //test will be removed
                $scope.dynamicPopover = {
                    content: 'Hello, World!',
                    templateUrl: 'myPopoverTemplate.html',
                    title: 'Title'
                };

                // $scope.dtPicker = {};
                // $scope.dtPicker.maxDate = moment();

                // if ($scope.fbMinDate) {
                //     if ($scope.fbMinDate == 'today') {
                //         $scope.dtPicker.minDate = moment();
                //     }
                // }
                $scope.getMaxDate = function () {
                    console.log('calling max date')
                    return moment().format('LLL');
                }
                //console.log($scope.dtPicker)

                //a local ngModel variable for implemented control which is set by validText directive
                $scope.ngModel = {};

                //defining entity if passes undefined from implementation
                //possible if entity is not defined on the top of the implemented controller
                if (!$scope.entity)
                    $scope.entity = {};

                //a scope watch listner for ngModel value change to handle validation messages for global
                $scope.$watch(
                    function () {
                        return $scope.ngModel.$viewValue;
                    },
                    function (newVal, oldVal) {
                        console.log('field box', $scope.ngModel)
                        if (newVal) {
                            $scope.ngModel.$setDirty();
                        }
                        if ($scope.col.format) {
                            $scope.col.format = $scope.col.format.replace('{0}', $scope.col.text);
                        }

                        //default clearing validation popover message on every text-change
                        ////applying message will be display in popover 
                        $scope.col.errorText = '';
                        //applying true in this property will show popover validation
                        $scope.col.showError = false;


                        // //console.log('from fieldBox', $scope.ngModel)
                        if ($scope.ngModel.$viewValue == '') {
                            /*==================================================
                                remove popover validation message
                            ==================================================*/
                            $scope.col.errorText = '';
                            $scope.col.showError = false;
                        }
                        else {
                            /*==================================================
                                handling of validation messages
                              ==================================================*/
                            if ($scope.ngModel.$error) {


                                var errorIcon = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i>',
                                    warningIcon = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i>';
                                /*==================================================
                                    these are the system defined validation handler 
                                    generated by angular ngForm
                                  ==================================================*/
                                if ($scope.ngModel.$error.maxlength || $scope.ngModel.$error.maxLength) {
                                    $scope.col.errorText = errorIcon +
                                        $scope.col.text + ' can not more than ' + $scope.col.maxLength;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.minlength) {
                                    $scope.col.errorText = errorIcon +
                                        $scope.col.text + ' must be between ' + $scope.col.minLength + " - " + $scope.col.maxLength + ' character.';
                                    if ($scope.col.minLength == $scope.col.maxLength) {
                                        $scope.col.errorText = errorIcon +
                                            $scope.col.text + ' must be of ' + $scope.col.maxLength + " character."
                                    }
                                    $scope.col.showError = true;
                                }
                                /*
                                ==================================================
                                    these are the custom validation handler 
                                    generated from custom.validator.js:validText
                                ==================================================
                                */
                                else if ($scope.ngModel.$error.onlydigitanddash) {
                                    $scope.col.errorText = warningIcon +
                                        'Only 0-9 and - are allowed for ' + $scope.col.text;
                                    $scope.col.showError = true;

                                    if ($scope.col.format)
                                        $scope.col.errorText = errorIcon + $scope.col.format;

                                }
                                else if ($scope.ngModel.$error.pan) {
                                    $scope.col.errorText = warningIcon + 'Please enter valid '
                                        + $scope.col.text + "<br/> Must be in given format " +
                                        $scope.col.format;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.emailError) {
                                    $scope.col.errorText = warningIcon + 'Please enter valid '
                                        + $scope.col.text;
                                    $scope.col.showError = true;

                                    if ($scope.col.format)
                                        $scope.col.errorText = errorIcon + $scope.col.format;

                                }
                                else if ($scope.ngModel.$error.aadhar) {
                                    $scope.col.errorText = warningIcon + 'Please enter valid '
                                        + $scope.col.text + "<br/> Must be in given format " +
                                        $scope.col.format;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.pincode) {
                                    $scope.col.errorText = warningIcon + 'Please enter valid '
                                        + $scope.col.text;
                                    $scope.col.showError = true;

                                    if ($scope.col.format)
                                        $scope.col.errorText = errorIcon + $scope.col.format;

                                }
                                else {
                                    $scope.col.errorText = '';
                                    $scope.col.showError = false;
                                }


                            }
                        }
                        ////console.log('from field box', $scope.ngModel)
                        ////console.log('new val from field', newVal, 'old val', oldVal);
                    });

                /*==================================================
                    A watch for form submit, if anything required which 
                    will act after form sumbit will be work here
                ==================================================*/
                $scope.$watch(function () {
                    return $ctrl[0].$submitted;
                }, function (newVal, oldVal) {
                    if ($ctrl[0].$submitted) {
                        /*==================================================
                            anything which will work after form submit only
                        ==================================================*/

                        // $scope.col.errorText = warningIcon +
                        //     $scope.col.text + ' is required.'
                        // $scope.col.showError = true;

                    }
                })
                // if (!$scope.entity)
                //     return;
                // //console.log($scope.entity)
                // if (!editForm[$scope.col.name])
                //     return;

                // var ngModel = $ctrl[0];
                // if (!ngModel) 
                //     return;

                // $elm.bind('click', function (evt) {
                //     // var ngModel = $ctrl[0][$scopecol.name];
                //     var col = $scope.col;
                //     var form = $scope.editForm;
                //     //console.log(col, form, $scope.entity)
                //     //console.log($ctrl)
                // })

                //func for checking ngModel existance
                function _validModel() {
                    if (!$scope.ngModel) {
                        return false;
                    }
                    if (!$scope.ngModel.$modelValue) {
                        return false;
                    }
                    return true;
                }

                //func for handling control icon and success class in form-group
                $scope.hasSuccess = function () {
                    if (!_validModel())
                        return false;
                    return (!$scope.ngModel.$isEmpty($scope.ngModel.$modelValue)
                        && $scope.ngModel.$valid && $scope.ngModel.$dirty)
                };

                //func for handling control icon and error class in form-group
                $scope.hasError = function () {
                    if (!_validModel())
                        return false;

                    return $scope.ngModel.$invalid && !$scope.ngModel.$pristine;
                };

                //func for handling control icon and warning class in form-group
                $scope.hasWarning = function () {
                    // var isValidModel = _validModel();
                    // var isSubmitted = false;
                    // if ($ctrl[0])
                    //     isSubmitted = $ctrl[0].$submitted;
                    // if (isSubmitted && $scope.hasRequired())
                    //     return true;
                    // // if (isSubmitted && !$scope.hasSuccess() && !$scope.hasError())
                    // //     return true;
                    // if($scope.ngModel.$error)
                    return false;
                }

                $scope.hasSubmitRequired = function () {
                    var isValidModel = _validModel();
                    var isSubmitted = false;
                    if ($ctrl[0])
                        isSubmitted = $ctrl[0].$submitted;
                    if (isSubmitted && $scope.hasRequired())
                        return true;
                    // if (isSubmitted && !$scope.hasSuccess() && !$scope.hasError())
                    //     return true;
                    return false;
                }

                //func for handling control icon and required class in form-group
                $scope.hasRequired = function () {
                    var isRequired = false;
                    if ($scope.col)
                        isRequired = $scope.col.required;
                    var requiredValid = isRequired && !$scope.hasSuccess()
                        && !$scope.hasError();
                    return requiredValid;
                };


                /*==================================================/*
                bind control events and call parent/implementaion code
                /*==================================================*/
                $elm.bind('keypress', function (e) {
                    if ($scope.fbOnKeypress) {
                        $scope.fbOnKeypress({ event: e, element: $elm, modelCtrl: $scope.ngModel, column: $scope.col })
                    }
                })
                $elm.bind('keydown', function (e) {
                    if ($scope.fbOnkeydown) {
                        $scope.fbOnkeydown({ event: e, element: $elm, modelCtrl: $scope.ngModel, column: $scope.col })
                    }
                })
                $elm.bind('keyup', function (e) {
                    if ($scope.fbOnkeyup) {
                        $scope.fbOnkeyup({ event: e, element: $elm, modelCtrl: $scope.ngModel, column: $scope.col })
                    }
                })
                $elm.bind('click', function (e) {
                    if ($scope.fbOnClick) {
                        $scope.fbOnClick({ event: e, element: $elm, modelCtrl: $scope.ngModel, column: $scope.col })
                    }
                })
                $elm.bind('change', function (e) {
                    if ($scope.fbOnChange) {
                        $scope.fbOnChange({ event: e, element: $elm, modelCtrl: $scope.ngModel, column: $scope.col })
                    }
                })
                $elm.bind('blur', function (e) {
                    if ($scope.fbOnBlur) {
                        $scope.fbOnBlur({ event: e, element: $elm, modelCtrl: $scope.ngModel, column: $scope.col })
                    }
                })





            }
        };
    }

})();