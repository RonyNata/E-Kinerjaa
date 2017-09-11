(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('MasterUrtugController', MasterUrtugController);

	function MasterUrtugController(MasterUrtugService, $uibModal, $document, toastr){
		var vm = this;

		vm.data = true;

		vm.data_pegawai = {};
		vm.data_urtug = [];

		getUrtug();

		function getUrtug(){
			MasterUrtugService.GetAllUrtug().then(
				function(response){
					// vm.data_pegawai = response;
					vm.data_urtug = response;
					// debugger
				},function(errResponse){

				}
			)
		}

		function showToastrSuccess(message) {
	      toastr.success('Data Uraian Tugas berhasil ' + message);

	    }

	    function showToastrFailed(message){
	    	toastr.error('Terjadi Kesalahan saat ' + message);

	    }

		vm.deleteUrtug = function(kd_urtug){
			MasterUrtugService.DeleteUrtugById(kd_urtug).then(
				function(response){
					showToastrSuccess('dihapus');
					getUrtug();
					// vm.data_pegawai = response;
					vm.data_urtug = response;
					// debugger
				},function(errResponse){
					showToastrFailed('menghapus data');
				}
			)
		}

		vm.edit = function(urtug){
			vm.open(urtug);
		}

		vm.open = function (items, parentSelector) {
	      // console.log(items);
	      var item = angular.copy(items);
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/formMaster/urtug/formMasterUrtug.html',
	        controller: 'FormMasterUrtugController',
	        controllerAs: 'form_urtug',
	        windowClass: 'app-modal-window',
	        // size: size,
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	showToastrSuccess('ditambahkan');
			getUrtug();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };
	} 
})();