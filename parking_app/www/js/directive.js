/**
 * Created by lulifei on 16/12/4.
 */
angular.module('parking')
  .directive('liquidAngular', function($timeout){
  return{
    restrict: 'A',
    scope:{
      liquidValue: '='
    },
    link: function(scope, element, attr){
      var config = liquidFillGaugeDefaultSettings();
      config.circleColor = "rgba(44, 162, 191, 0.9)";
      config.textColor = "rgba(44, 162, 191, 0.9)";
      config.waveColor = "rgba(44, 162, 191, 0.9)";
      config.textVertPosition = 0.6;
      config.waveAnimateTime = 2000;
      config.waveHeight = 0.1;
      config.waveCount = 1.5;
      console.log(attr.id);
      console.log(scope.liquidValue);
      $timeout(function(){
        var gauge1 = loadLiquidFillGauge(attr.id, scope.liquidValue, config);
      });
    }
  }
});
