//an array of different layers(themselves arrays of features) that need mouse event toggling
define([], function(){
  return {
    enable:function(feat){
      for(var i=0, j=feat.length; i < j; i++)
        feat[i].enableMouseEvents();
    },
    disable:function(feat){
      for(var i=0, j=feat.length; i < j; i++)
        feat[i].disableMouseEvents();
    }
  }
});
