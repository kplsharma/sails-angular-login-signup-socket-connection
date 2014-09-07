angular.module('freelance', [])
    .controller('SignupController', ['$scope', '$http', function($scope, $http) {
      $scope.master = {};

      $scope.submit = function(){
          if($scope.user.fullname && $scope.user.username &&$scope.user.email &&$scope.user.password  )
          {
            console.log($scope.user); // works fine so far 
                $http.post('/user/create', $scope.user)
                    .success(function(data, status, headers, config) {
                      console.log("success");
                      console.log(data);
                        // if(data.error==="E_VALIDATION")
                        // {
                          
                        // }
                        
                    })
                    .error(function(data, status, headers, config) {
                      console.log("error");
                    });
          }
      };

      // $scope.update = function(user) {
      //   $scope.master = angular.copy(user);
      // };

      // $scope.reset = function() {
      //   $scope.user = angular.copy($scope.master);
      // };

      //$scope.reset();
}]);