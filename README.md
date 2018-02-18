# jsonp-util

This is a helper library for working with JSONP.

## Example

### Searching iTunes for a podcast

```javascript
jsonp(
  "https://itunes.apple.com/search",
  (data) => console.log('data', data),
  {
    media: "podcast",
    entity: "podcast",
    term: "great podcasts"
  }
);
```




## Set up

To initialize the utility, load the script:

```html
<script src="/path/to/js/jsonp-util.js"></script>
```

This will register the `jsonp` function into the `window`. 


## Usage

```javascript
// simple
jsonp(url, (data) => console.log(data) );

// with parameters
jsonp(url, (data) => console.log(data), { param: val } );
```

#### url
```Type: string```
URL for the request. ```www.example.com/api/search/```

#### callback
``` Type: function```

Function to be called once the JSONP response is received.

jsonp-util supports k-ary arguments, but the first argument will be the data object returned by the JSONP response.


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




## TODO

Tests
+ Write some basic tests with Jasmine


