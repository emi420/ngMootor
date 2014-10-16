/**
* Code inspired by Mootor (https://github.com/emi420/Mootor)
* @author Emilio Mariscal (emi420 [at] gmail.com)
*/


(function($, angular, Mootor) {
    
    /**
    * UIFormGeo geolocates 
    */
    
    var UIFormGeo = function(fn, scope, element, attrs) {
        this._fn = fn;
        this._attrs = attrs;
        this._scope = scope;
        Mootor.UIFormGeo.__init(this, element[0]);
    }
    
    // Overrides _onSuccess method for use with Angular model
    Mootor.UIFormGeo._onSuccess = function(self, position) {
        var oModel = self._attrs['ngModel'].split("."),
            // FIXME CHECK
            modelName = oModel[0],
            modelField = oModel[1] || undefined;
            
        var strCoords = Mootor.UIFormGeo.__onSuccess(self, position);
            
        self._$input.setAttribute("disabled", "disabled");
        
        if (modelField) {
            self._scope[modelName][modelField] = strCoords;
        } else {
            self._scope[modelName] = strCoords;
        }
        self._fn(self._scope);

    }
    
    /**
    * UIFormDraw draws 
    */
    
    var UIFormDraw = function(fn, scope, element, attrs) {
        this._fn = fn;
        this._attrs = attrs;
        this._scope = scope;
        Mootor.UIFormDraw.__init(this, element[0]);
    }    
    
    // Overrides _save method for use with Angular model 
    Mootor.UIFormDraw._save = function(self) {
        
        var instance = Mootor.UIFormDraw._activeInstance;
        var $img = instance._$img;
        
        $img.onload = function() {
            var oModel = instance._attrs['ngModel'].split("."),
                // FIXME CHECK
                modelName = oModel[0],
                modelField = oModel[1] || undefined;
            if (modelField) {
                instance._scope[modelName][modelField] = $img.src;
            } else {
                instance._scope[modelName] = $img.src;
            }
            instance._fn(instance._scope);
            instance.close();
        }
        $img.src = instance._$canvas.toDataURL();
    }

    
    UIFormDraw.prototype = Mootor.UIFormDraw.prototype;

    /**
    * UIFormCameraSingle take or choose a single picture
    */
    
    var UIFormCameraSingle = function(fn, scope, element, attrs) {
        this._fn = fn;
        this._attrs = attrs;
        this._scope = scope;
        Mootor.UIFormCameraSingle.__init(this, element[0]);
    }

    // Overrides _save method for use with Angular model 

    Mootor.UIFormCameraSingle._onImgLoad = function(self) {
        var oModel = self._attrs['ngModel'].split("."),
            // FIXME CHECK
            modelName = oModel[0],
            modelField = oModel[1] || undefined;
        
            if (modelField) {
                self._scope[modelName][modelField] = self._$img.src;
            } else {
                self._scope[modelName] = self._$img.src;
            }

        self._fn(self._scope);
        
    }
    Mootor.UIFormCameraSingle._onImgLoadError = function(self) {
        var oModel = self._attrs['ngModel'].split("."),
            // FIXME CHECK
            modelName = oModel[0],
            modelField = oModel[1] || undefined;

        if (self._scope[modelName]) {
            if (modelField) {
                self._scope[modelName][modelField] = "";
            } else {
                self._scope[modelName] = "";
            }
            self._fn(self._scope);
        }
    }

    UIFormCameraSingle.prototype = Mootor.UIFormCameraSingle.prototype;


    // Angular Directives
    
    angular.module('ngMootorUIForm', [])

        .directive('ngCameraSingle', [ '$parse', '$timeout', function($parse, $timeout) {
            return {
              replace: true,
              templateUrl: 'm-html/m-uiformcamerasingle.html',
              link: function(scope, element, attrs) {
                  var fn = $parse(attrs['ngCameraSingle']);

                  new UIFormCameraSingle(fn, scope, element, attrs);
              
              }
          
            };
         }])

         .directive('ngDraw', [ '$parse', '$timeout', function($parse, $timeout) {
             return {
               replace: true,
               templateUrl: 'm-html/m-uiformdraw.html',
               link: function(scope, element, attrs) {

                   var fn = $parse(attrs['ngDraw']);
                   
                   new UIFormDraw(fn, scope, element, attrs);
               }
      
             };
          }])

          .directive('ngGeo', [ '$parse', '$timeout', function($parse, $timeout) {
              return {
                replace: false,
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs['ngGeo']);
                   
                    new UIFormGeo(fn, scope, element, attrs);
                    
                }
      
              };
           }]);
           
 }(window.angular.element, window.angular, window.Mootor));

