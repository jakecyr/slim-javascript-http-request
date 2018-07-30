"use strict";

function Http() {
  var _this = this;

  this.callback = function(res) {
    console.log(1, res);
  };

  this.then = function(callback) {
    _this.callback = callback;
  };
  this.get = function(url, callback) {
    if (!url) throw new Error("URL is required to make a GET request");
    if (callback) this.callback = callback;
    return this.request("GET", url, callback);
  };
  this.post = function(url, data, callback) {
    if (!url) throw new Error("URL is required to make a POST request");
    if (callback) this.callback = callback;

    if (data) {
      var first = true;

      for (var key in data) {
        url += (first ? "?" : "&") + key + "=" + data[key];
        first = false;
      }
    }

    return this.request("POST", url, callback);
  };
  this.request = function(method, url, callback) {
    if (method !== "GET" && method !== "POST")
      throw new Error("Only GET and POST requests are allowed");
    if (!url)
      throw new Error("URL is required to make a " + method + " request");

    var complete,
      failed,
      selfObj = _this,
      xhttp = new XMLHttpRequest();

    xhttp.open(method, url);
    xhttp.send();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (selfObj.callback) {
          selfObj.callback({
            data: xhttp.responseText,
            code: this.status
          });
        }
      }
    };

    return _this;
  };
}
