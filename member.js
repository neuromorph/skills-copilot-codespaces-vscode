function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'skills-member.html',
    scope: {
      member: '='
    },
    controller: function($scope) {
      $scope.skills = $scope.member.skills;
    }
  };
}