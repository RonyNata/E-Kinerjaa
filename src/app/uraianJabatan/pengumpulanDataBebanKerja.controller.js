(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PengumpulanDataBebanKerjaController', PengumpulanDataBebanKerjaController);

    function PengumpulanDataBebanKerjaController(PengumpulanDataBebanKerjaService, $uibModal, $document, $scope) {
      var vm = this;

      vm.list_jabatan = [];
      vm.list_available_urtug = [];
      vm.list_used_urtug = [];
      $scope.jabatan = '';

      getAllJabatan();
      // getUrtugByJabatan();

      $scope.$watch('jabatan', function(){
      	getUrtugByJabatan();
      });

      function getAllJabatan(){
      	PengumpulanDataBebanKerjaService.GetAllJabatan().then(
      		function(response){
      			vm.list_jabatan = response;
      			// debugger
      		}, function(errResponse){

      		}
      	);
      }

      function getUrtugByJabatan(){
      	PengumpulanDataBebanKerjaService.GetUrtugByJabatan($scope.jabatan).then(
      		function(response){
      			if(response.jabatanUraianTugasList == undefined)
      				vm.list_used_urtug = [];
      			else vm.list_used_urtug = response.jabatanUraianTugasList;
      			vm.list_available_urtug = response.notJabatanUraianTugasList;
      			console.log(JSON.stringify(PengumpulanDataBebanKerjaService.SetDataUrtug(vm.list_used_urtug, vm.list_available_urtug)));
      		}, function(errResponse){

      		}
      	)
      }

      vm.open = function (items, parentSelector) {
	      // console.log(items);
	      var item = {
	      	"kdJabatan": $scope.jabatan,
	      	"kdUraianTugasList": [],
	      	"createdBy": $.parseJSON(sessionStorage.getItem('credential')).namaPegawai
	      };
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/uraianJabatan/tambahUraianTugas/tambahUraianTugas.html',
	        controller: 'TambahUraianController',
	        controllerAs: 'form_urtug_jabatan',
	        // windowClass: 'app-modal-window',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          },
	          urtug: function(){
	          	return PengumpulanDataBebanKerjaService.SetDataUrtug(vm.list_used_urtug, vm.list_available_urtug);
	          },
	          used_urtug: function(){
	          	return vm.list_used_urtug;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	// showToastrSuccess('ditambahkan');
	      	getUrtugByJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };
   } 
})();