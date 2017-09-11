(function() {
'use strict';
 
angular
    .module('eKinerja')
    .controller('LoginEKinerjaController', LoginEKinerjaController);

    function LoginEKinerjaController($scope, $rootScope, $location, LoginEKinerjaService, $cookieStore, $state){
        // reset login status
        // LoginEKinerjaService.ClearCredentials();
        // var ses = {
        //     "nipPegawai" : "195405011982032007",
        //     "namaPegawai": "NURMALEA",
        //     "jabatan": "PELAKSANA",
        //     "unit": "Dinas Pemerintahan Kota Bekasi",
        //     "kdJabatan": "ZZZ1111S"
        // };
        // sessionStorage.setItem("credential", JSON.stringify(ses));
        checkCredentials();

        var vm = this;
        // debugger
 
        vm.login = function() {
            $scope.dataLoading = true;
            // debugger
            LoginEKinerjaService.Login($scope.nip, $scope.password).then(
                function(response){
                    // LoginEKinerjaService.SetCredentials($scope.nip, $scope.password);
                    // debugger;
                    sessionStorage.setItem('credential', JSON.stringify(response.data));
                    $state.go('master-urtug');
                    // $state.go('master-urtug');
                }, function(errResponse) {
                    $scope.error = errResponse.message;
                    $scope.dataLoading = false;
                }
            );
        }
        // console.log(JSON.stringify($cookieStore.get('globals')));

        function checkCredentials(){
            if(sessionStorage.getItem('credential') != undefined)
                $state.go('master-urtug');
        }
    }
})();

// (function() {
// 'use strict';
 
// angular
//     .module('eKinerja')
//     .controller('LoginEKinerjaController', LoginEKinerjaController);

//     function LoginEKinerjaController($scope, $rootScope, $location, LoginEKinerjaService){
//         var lgn = this;
 
//         lgn.login = login;
 
//         (function initController() {
//             // reset login status
//             LoginEKinerjaController.ClearCredentials();
//         })();
 
//         function login() {
//             lgn.dataLoading = true;
//             LoginEKinerjaController.Login(lgn.username, lgn.password, function (response) {
//                 if (response.success) {
//                     LoginEKinerjaController.SetCredentials(lgn.nip, lgn.password);
//                     $location.path('/main');
//                 } else {
//                     FlashService.Error(response.message);
//                     lgn.dataLoading = false;
//                 }
//             });
//         };
//     }
// })(); 