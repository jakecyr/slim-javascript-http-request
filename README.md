# Slim JavaScript Http Request Library

Slim JavaScript Http Request library to make GET and POST requests. An alternative to the larger jQuery library if only the http object is required. Can also be used with the Vue.js library for HTTP requests.

## Usage

Download the `http.js` file and include it in your project.

### Example `GET ` request:

```javascript
const http = new Http();

http
  .get('/names/')
  .then(function(res){
      console.log(res);
  })
  .catch(function(err){
      console.error(err.error);
  })
```

### Example `DELETE ` request:

```javascript
const http = new Http();

http
  .delete('/names/?test=deleteMe')
  .then(function(res){
      console.log(res);
  })
  .catch(function(err){
      console.error(err.error);
  })
```

### Example `POST` request:

```javascript
const http = new Http();

http
  .post('/names/', { name: 'jake' })
  .then(function(res){
      console.log(res);
  })
  .catch(function(err){
      console.error(err.status, err.body);
  })
```

### Example `PUT` request:

```javascript
const http = new Http();

http
  .put('/names/', { name: 'jake' })
  .then(function(res){
      console.log(res);
  })
  .catch(function(err){
      console.error(err.status, err.body);
  })
```
