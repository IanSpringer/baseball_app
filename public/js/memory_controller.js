angular
  .module('theStandApp')
  .controller('theStandController', theStandController)

theStandController.$inject = ['$http'];

function theStandController($http){
  var self = this;

  function clickMe(){
    console.log('been clicked')

  }
}
