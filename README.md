# jsonp-util

This is a helper library for working with JSONP.

#### Usage

```javascript
import {json_util} from "lib/jsonp_util";

// if attached to window
jsonp(url, params, callback);

// if attached to an object
parent_obj.jsonp(url, params, callback);

```


# Methods

## jsonp_utils.register( [target_obj], [handler_name])

To initialize the utility, call the register function:

```javascript
json_util.register(
    target_obj = window,
    handler_name = "window.json_cb"
);
```

This will set the property target_obj.jsonp to be the function that
starts a JSONP request.

Each JSONP response will be in the form of:

```javascript

return handler_name({
    // ...
    // response data
    // ...
});

```

Calling ```jsonp_util.register()``` will result in:

```javascript

// Request
jsonp(url, params, callback);

// Response

return jsonp_cb({
    // ...
    // response data
    // ...
});

```
## jsonp_utils.get(url, params, callback)

Depending on how jsonp_util was registered, it will be available as:

```javascript
target_obj.jsonp( url, params, callback );

// OR

jsonp( url, params, callback );
```

#### url
```Type: string```
URL for the request. ```www.example.com/api/search/```


#### params
```Type: object```
```Default: {}```

Given the following key-value map:

```javascript
let params = {
	key_1 : val_1,
	...,
	key_n: val_n
} ;
```
the following string will be produced:

```javascript
key_1=val_1&...&key_n=val_n
```

#### callback
``` Type: function```

Function to be called once the JSONP response is received.

jsonp-util supports k-ary arguments, but the first argument will be the data object returned by the JSONP response.



## Examples

### Searching iTunes for a podcast

```javascript
import {jsonp_util} from "lib/jsonp_util"

jsonp_util.register();

// ...
// code
// ...
function my_callback(data){
	return console.log( Object.keys(data) );
}
jsonp(
	"https://itunes.apple.com/search",
	{
		media: "podcast",
		entity: "podcast",
		term: "great podcasts"
	},
	my_callback
);

```

## TODO

Tests
+ Write a tests script

Compatibility
+ Generate transpiled code 
