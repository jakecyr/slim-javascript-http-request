"use strict";

function Http() {
  var _this = this;

  this.callback = function(res) {};

  this.catch = function(errorCallback) {
    this.errorCallback = errorCallback;
    return this;
  };
  this.then = function(callback) {
    _this.callback = callback;
    return _this;
  };
  this.get = function(url, callback, errorCallback) {
    if (!url) throw new Error("URL is required to make a GET request");
    if (callback) this.callback = callback;
    if (errorCallback) this.errorCallback = errorCallback;

    return this.request("GET", url, callback);
  };
  this.post = function(url, data, callback, errorCallback) {
    if (!url) throw new Error("URL is required to make a POST request");
    if (callback) this.callback = callback;
    if (errorCallback) this.errorCallback = errorCallback;

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
      if (this.readyState == 4) {
        if (this.status == 200) {
          if (selfObj.callback) {
            var response = xhttp.responseText;
            var type = "text";

            try {
              var parsed = JSON.parse(response);
              response = parsed;
              type = "json";
            } catch (e) {
              type = "plain";
            }

            selfObj.callback({
              data: response,
              code: this.status,
              type: type
            });
          }
        } else {
          if (selfObj.errorCallback) {
            selfObj.errorCallback({
              error: xhttp.responseText,
              code: this.status
            });
          } else {
            selfObj.callback({
              error: xhttp.responseText,
              code: this.status
            });
          }
        }
      }
    };

    return _this;
  };
}
