
(function(){

    // ensure script is idempotent
    if ( typeof window['jsonp'] === 'function' ) {
      return false;
    }


    // this will hold the jsonp callbacks
    const cbStoreName = '__jsonpCallbacks';
    window[cbStoreName] = [];
    window['jsonp'] = getScript;

    function getScript(url, callback, params = {} ){

      // type-check inputs
      if( typeof url !== "string" || typeof callback !== "function") {
        return false;
      }
      if ( typeof params === 'undefined' || params === null ) {
        params = {};
      }

      // encode parameters into &key=val format
      let queryString = encodeURI(
        Object.keys(params).map( key =>
          `${key}=${params[key]}`
        ).join("&")
      );

      // if non-empty string we add a trailing '&'
      if ( queryString ) {
        queryString += '&';
      }

      // add callback for this script
      let callbacks = window[cbStoreName];
      const id = (callbacks.length+1);
      const key = 'cb' + id;
      callbacks[key] = (...args) => {
        delete callbacks[key];
        removeScript(id);
        return callback(...args);
      };

      // add script to body
      let src = `${ url }?${ queryString }callback=${ cbStoreName }.${ key }`;
      createScript(src, id);

      return;
    }


    function createScript(src, id) {
        if(typeof src !== "string") {
            return false;
        }
        let cssClass = ".jsonp";

        let script = document.createElement("script");
        script.className = cssClass;
        script.setAttribute("src", src);
        script.setAttribute("type", "application/javascript");
        script.setAttribute("data-id", id + '');

        document.body.appendChild(script);
        return this;
    }

    function removeScript(id) {
        let script = document.querySelector(`.jsonp[data-id="${id}"]`);
        if ( script !== null ) {
            script.remove()
        }
        return this;
    }

})();
