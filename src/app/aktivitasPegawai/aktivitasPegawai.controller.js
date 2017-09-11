(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('AktivitasPegawaiController', AktivitasPegawaiController);

    function AktivitasPegawaiController(AktivitasPegawaiService, $uibModal, $document, $scope) {
      var vm = this;

      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));
      vm.rincian = [];
      vm.tanggal = new Date();
      vm.now = new Date();
      getUrtugByJabatan();
      // getAllJabatan();
      // getUrtugByJabatan();

      function getUrtugByJabatan(){
      	AktivitasPegawaiService.GetRincianPegawai(vm.pegawai.nipPegawai).then(
      		function(response){
      			vm.rincian = response;
      		}, function(errResponse){

      		}
      	)
      }

      vm.open = function (parentSelector) {
	      console.log(JSON.stringify(vm.pegawai));
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/aktivitasPegawai/formAktivitas.html',
	        controller: 'FormAktivitasController',
	        controllerAs: 'form_aktivitas',
	        // windowClass: 'app-modal-window',
	        // size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          kdJabatan: function () {
	            return vm.pegawai.kdJabatan;
	          },
	          nip: function () {
	            return vm.pegawai.nipPegawai;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	// showToastrSuccess('ditambahkan');
	      	// getUrtugByJabatan();
	      	getUrtugByJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };
   } 
})();