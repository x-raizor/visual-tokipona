
function randInt(min, max) {
/** 
 * Returns a random integer between min (inclusive) and max (inclusive)
 * But Math.round() has a non-uniform distribution!
 */
  return Math.floor(random() * (max - min + 1)) + min;
  //return Math.floor(Math.random() * (max - min + 1)) + min;
};



// From http://baagoe.com/en/RandomMusings/javascript/
// Johannes Baagøe <baagoe@baagoe.com>, 2010
// Helper for Alea randomizer
function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}


// Randomizer Alea
// From http://baagoe.com/en/RandomMusings/javascript/
function Alea() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() + 
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};


/**
 * App Controllers 
 */
var random = Alea(); // inizialize better randomiator
var gameApp = angular.module('tokiGame', []);
gameApp.controller('gamePlayer', function ($scope, $http){

    // fetch pictures data from json
    $http.get('js/tokipona.json').success(function(data) {
        $scope.cards = data;
        $scope.nextThree(); // set first three picture
    });
  
    $scope.getCard = function() {
    /** 
     * Return string with name of one on 123 picture without extension
     */
        return randInt(0, 122);
    };

    $scope.nextThree = function() {
    /** 
     * Set filenames for three picture in model
     */
        $scope.one   = $scope.cards[$scope.getCard()];
        $scope.two   = $scope.cards[$scope.getCard()];
        $scope.three = $scope.cards[$scope.getCard()];
    };
});
