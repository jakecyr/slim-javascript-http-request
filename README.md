# Slim Http JavaScript Client
Slim Http JavaScript to make GET and POST requests. An alternative to the larger jQuery library is only the http object is required.

## Usage

Download the `http.js` file and include it in your project.

### Example `GET ` request:
```
var http = new Http();

http.get('/names/')
  .then(function(res){
      var responseText = res.data;
      var statusCode = res.code;
      console.log(responseText);
  })
  .catch(function(err){
      console.error(err);
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
		  console.error(err);
	})
```
