angular.module('ddsoverview', ['angularPromiseButtons'])
.config(function (angularPromiseButtonsProvider)
{
  angularPromiseButtonsProvider.extendConfig({
    spinnerTpl: '<span class="btn-spinner"></span>',
    disableBtn: true,
    btnLoadingClass: 'is-loading',
    addClassToCurrentBtnOnly: false,
    disableCurrentBtnOnly: false,
    minDuration: false,
    CLICK_EVENT: 'click',
    CLICK_ATTR: 'ngClick',
    SUBMIT_EVENT: 'submit',
    SUBMIT_ATTR: 'ngSubmit',
    BTN_SELECTOR: 'button'
  });
});