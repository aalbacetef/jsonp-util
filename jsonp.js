export let jsonp_util = {
    el: null,
    callbacks: [], // sparse array
    register(){
        this.get = this.get.bind(this);

        if( typeof target === "object" ) {
            window.jsonp = this.get;
            window.jsonp = this.callbacks;
            return this;
        } else {
            return false;
        }
    },
    get(url, params = {}, callback ){
        if( typeof url !== "string"
        || typeof callback !== "function") {
            return false;
        }

        let param_keys = Object.keys(params);
        let params_str = encodeURI(
            param_keys.map( key =>
                `${key}=${params[key]}`
            ).join("&")
        );

        let id = this.callbacks.length+1;
        this.callbacks[id] = (...args) => {
            delete this.callbacks[id];
            this.remove_script(id);
            return callback(...args);
        };

        let src = `${url}?${params_str}&callback=jsonp_callbacks.${id}`;
        this.create_script(src);

        return;

    },
    create_script(src){
        if(typeof src !== "string") {return false;}
        let css_class = ".jsonp";

        script = document.createElement("script");
        script.className = css_class;
        script.setAttribute("src", src);
        script.setAttribute("type", "application/javascript");
        script.setAttribute("data-id", id);

        document.body.appendChild(script);
        return true;
    },
    remove_script(id) {
        ( document.querySelector(`.jsonp[data-id="${id}"]`) )
            ? script.remove();
            : return false

        return true;
    }
};
