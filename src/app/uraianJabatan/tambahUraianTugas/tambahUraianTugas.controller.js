(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TambahUraianController', TambahUraianController);

    
    function TambahUraianController(items, urtug, used_urtug, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

      	vm.data_urtug = urtug;
      	vm.urtug_selected = angular.copy(used_urtug);

      	vm.onClick = function(urtg){
      		if(urtg.selected){
      			var newUrtug = {
      				"kdUrtug": angular.copy(urtg.kdUrtug)
      			}
      			vm.urtug_selected.push(newUrtug);
      		}
      		else
				vm.urtug_selected.splice(
					PengumpulanDataBebanKerjaService.FindIndex(vm.urtug_selected, urtg.kdUrtug), 1);
	      		// console.log(JSON.stringify(vm.data_urtug.findIndex(x => x.kdUrtug==urtg.kdUrtug)));
      			
      	}

      	vm.save = function setUrtugAndJabatan(){
      		
      		items.kdUraianTugasList = vm.urtug_selected;
      		// console.log(JSON.stringify(items));
      		PengumpulanDataBebanKerjaService.SetUrtugAndJabatan(items).then(
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