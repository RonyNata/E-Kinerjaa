(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormAktivitasController', FormAktivitasController);

    
    function FormAktivitasController(kdJabatan, nip, AktivitasPegawaiService, $uibModalInstance) {
      	var vm = this;

            vm.urtug = [];
            vm.rincian = {"nipPegawai": nip}
            getUrtugByJabatan();

            function getUrtugByJabatan(){
                  AktivitasPegawaiService.GetUrtugByJabatan(kdJabatan).then(
                        function(response){
                              debugger
                              vm.urtug = response;
                        }, function(errResponse){

                        }
                  )
            }

            vm.save = function setUrtugAndJabatan(){
      		console.log(JSON.stringify(vm.rincian));
      		AktivitasPegawaiService.SaveRincian(vm.rincian).then(
      			function(response){
      				$uibModalInstance.close();
      			},function(errResponse){

      			}
      		)
      	}

            vm.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
            };
   	} 
})();