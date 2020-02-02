function Http() {

    this.get = (url) => {
        return request('GET', url);
    }
    this.delete = (url) => {
        return request('DELETE', url);
    }
    this.post = (url, data) => {
        return request('POST', url, data);
    }
    this.put = (url, data) => {
        return request('PUT', url, data);
    }
    function request(type, url, data) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();

            if (type === 'GET' || type === 'DELETE') {
                http.open(type, url, true);
                http.send();
            } else if (type === 'POST' || type === 'PUT') {
                http.open(type, url, true);
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                const queries = [];

                data = data || {};

                for (const key in data) {
                    queries.push(key + '=' + encodeURIComponent(data[key] || ''));
                }

                http.send(queries);
            } else {
                return reject(`${type} method not supported`);
            }

            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    const responseType = http.getResponseHeader('content-type');

                    if (this.status == 200) {
                        if (responseType == 'application/json') {
                            resolve(JSON.parse(http.responseText));
                        } else {
                            resolve(http.responseText);
                        }
                    } else {
                        reject({ status: http.status, body: http.responseText });
                    }
                }
            };
        });
    }
};
