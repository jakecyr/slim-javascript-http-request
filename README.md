# Slim Http JavaScript Object
Slim Http JavaScript Object to make GET and POST requests. An alternative to the larger jQuery library if only the http object is required. Can also be used with the Vue.js library for HTTP requests.

## Usage

Download the `http.js` file and include it in your project.

### Example `GET ` request:
#### Using promises:
```
var http = new Http();

http.get('/names/')
  .then(function(res){
      var responseText = res.data;
      var statusCode = res.code;
      var responseType = res.type;
      console.log(responseText);
  })
  .catch(function(err){
      console.error(err.error);
  })
```

#### Using callback:
```
var http = new Http();

http.get('/names/', function(res){
      var responseText = res.data;
      var statusCode = res.code;
      var responseType = res.type;
      
      console.log(responseText);
  }, function(err){
      console.error(err.error);
  })
```

### Example `POST` request:
```
var http = new Http();

http.post('/names/', {name: 'jake'})
  .then(function(res){
      var responseText = res.data;
      var statusCode = res.code;
      console.log(responseText);
  })
  .catch(function(err){
      console.error(err.error);
  })
```
