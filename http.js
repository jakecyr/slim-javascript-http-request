function Http(){
	this.complete = function(){}
	this.error = function(){}

	this.then = function(callback){
		this.complete = callback;
		return this;
	}
	this.catch = function(callback){
		this.error = callback;
		return this;
	}
	this.get = function(url){
		if(!url) throw new Error('URL is required to make a GET request');
		return this.request('GET', url);
	}
	this.post = function(url, data){
		if(!url) throw new Error('URL is required to make a POST request');

		if(data){
			var first = true;

			for(var key in data){
				url += (first ? '?' : '&') + key + '=' + data[key];
				first = false;
			}
		}

		return this.request('POST', url);
	}
	this.request = function(method, url){
		if(method !== 'GET' && method !== 'POST') throw new Error('Only GET and POST requests are allowed');
		if(!url) throw new Error('URL is required to make a ' + method + ' request');

		var complete, failed, selfObj = this, xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function(){
		    if(this.status == 200){
			selfObj.complete({
				data: xhttp.responseText,
				code: this.status
			});
		    } else{
			selfObj.error(xhttp.responseText);
		    }
		}

		xhttp.open(method, url, true);
		xhttp.send();
		return this;
	}
}
