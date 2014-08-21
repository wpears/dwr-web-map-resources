define(['dojo/dom-class'
       ,'dojo/query'
       ,'modules/featureevents.js'],
function(domClass, dquery, eventFeatures){
  var lastActive;
  return {
    toggle:function(e, tool){
      var active = dquery(".activeTool")[0], targ = e.target;
      if(targ === active){
        domClass.remove(targ,"activeTool");
        tool.stop();
        lastActive = null;
      }else{
        if(active){
          domClass.replace(active,"idle","activeTool"); //swap in idle
          lastActive.tool.idle();
        }
        if(domClass.contains(targ,"idle")){
          domClass.replace(targ,"activeTool","idle"); //activate
          tool.revive();
        }else{
          domClass.add(targ,"activeTool");
          tool.start();
        }
        lastActive ={node:targ, tool:tool};
      }
    },
    wipe:function (tool, node, eventFeatures){
      tool.stop();
      if(domClass.contains(node,"idle")){
        domClass.remove(node,"idle");
        if(dquery(".activeTool")[0])
          eventFeatures.disable(eventFeatures); //because another tool is still alive
      }else if(domClass.contains(node,"activeTool"))
        domClass.remove(node,"activeTool");
    }
  }
});