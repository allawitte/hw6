'use strict';
(function() {
    angular.module('app', [])
        .controller('mainCtrl', mainController);
    function mainController($http) {
        var vm = this;
        vm.db = [];
        vm.view = [];
        vm.user = {};
        vm.addUser = addUser;
        vm.delete = del;
        vm.save = save;
        vm.delAll = delAll;

        var getUsers = function () {
            $http.get('/users').success(function (res) {
                vm.db = res;
                res.forEach(function(item){
                    vm.view.push(true);
                });
            });
        };


        function delAll(){
            $http.delete('delete/all').success(function(res) {
                vm.db = res;
            })
        }

        function save(id) {
            var ind = null;
            vm.db.forEach(function(item, index){
                if (item.id == id) {
                    ind = index;
                }
            });
            if (ind == null) {
                console.log( 'User does not exist' );
                return;
            }
            console.log('saving updates...');
            $http.put('edit/' + id, vm.db[ind]).success(function(res) {
                console.log(res);
                vm.view[ind] = true;
                vm.user = {};
            });
        }
        function addUser() {
            $http.post('add', vm.user).success(function(res) {
                console.log(res);
                vm.db.push(vm.user);
                vm.view.push(true);
            });
        }

        function del(id) {
            var ind = null;
            vm.db.forEach(function(item, index){
                if (item.id == id) {
                    ind = index;
                }
            });
            if (ind == null) {
                console.log( 'User does not exist' );
                return;
            }
            console.log('deleting user...');
            $http.delete('delete/' + id).success(function(res) {
                console.log(res);
                vm.db.splice(ind, 1);
                vm.view.splice(ind, 1);
            });
        }


        getUsers();


    }
})();
/**
 * Created by HP on 11/1/2016.
 */