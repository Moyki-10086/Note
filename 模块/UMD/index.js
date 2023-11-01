
      (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
          // AMD
          define(['math'], factory);
          factory().hello()
          console.log(factory(math))
        } else if (typeof exports === 'object') {
          // CommonJS
          module.exports = factory(require('math'));
        } else {
          // Browser globals (Note: root is window)
          root.returnExports = factory(root.myModule);
        }
      }(this, function (myModule) {
        // Methods
        function notHelloOrGoodbye () { }; // A private method
        function hello () { 
          console.log(myModule)
          console.log('hello');
        }; // A public method because it's returned (see below)
        function goodbye () { 
          console.log('goodbye');
        }; // A public method because it's returned (see below)

        // Exposed public methods
        return {
          hello: hello,
          goodbye: goodbye
        }
      }));