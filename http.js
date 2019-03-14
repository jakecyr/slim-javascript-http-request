function Http(){
    this.get = get;
    this.post = post;

    function get(url){
        return request('GET', url);
    }
    function post(url, data){
        return request('POST', url, data);
    }
    function request(type, url, data){
        let http = new XMLHttpRequest();
        let success = undefined;
        let error = undefined;
        let returnObj = {};

        if(type == 'GET'){
            http.open(type, url, true);
            http.send();
        } else if(type == 'POST'){
            http.open("POST", url, true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            let queries = [];
            data = data || {};

            for(let key in data){
                queries.push(key + '=' + encodeURIComponent(data[key] || ''));
            }

            http.send(queries);
        } else{
            return console.error(type, 'method not supported');
        }

        http.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    if(success){
                        success(http.responseText)
                    }
                } else{
                    if(error){
                        error({
                            status: http.status,
                            body: http.responseText,
                        });
                    }
                }
            }
        };

        returnObj.then = function(cb){
            success = cb;
            return returnObj;
        };
        
        returnObj.catch = function(cb){
            error = cb;
            return returnObj;
        };

        return returnObj;
    }
};