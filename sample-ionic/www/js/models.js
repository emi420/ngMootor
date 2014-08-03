(function(Data) {

   "use strict";
       
   var Item = function(options) {
       this.title = options.title || "Untitled";
       this.picture = options.picture || "";
       this.geo = options.geo || "";
       this.sign = options.sign || "";
   }
       
   Data.models.Item = Data.Model({ 
        model: Item,
        localStoragePrefix: "sample"
   });
  
}(window.Mootor.Data));


 
