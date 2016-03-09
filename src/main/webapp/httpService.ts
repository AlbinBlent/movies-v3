module clientApp.services {

    export class HttpService {
        get(url) {
            alert(this.ajax('GET', url));
            return this.ajax('GET', url);
        }

        post(url, args){
            return this.ajax('POST', url, args);
        }

        put(url, args){
            return this.ajax('PUT', url);
        }

        delete(url){
            return this.ajax('DELETE', url);
        }

        private ajax(method, url, args = undefined){
            var promise = new Promise((resolve, reject) => {

                var client = new XMLHttpRequest();
                var uri = this.constructUri(url, args, method);

                client.open(method, uri);
                client.send();
                client.onload = function () {
                    if (this.status >= 200 && this.status < 300){
                        resolve(this.response);
                    } else {
                        reject(this.statusText);
                    }
                };
                client.onerror = function (){
                    reject(this.statusText);
                }
            });
            return promise;
        }

        private constructUri(url, args, method){
            var uri = url;

            if (args && (method === 'POST' || method === 'PUT')){
                uri += '?';
                var argcount = 0;
                for (var key in args){
                    if (args.hasOwnProperty(key)){
                        if (argcount++){
                            uri += '&';
                        }
                        uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                    }
                }
            }
            return uri;
        }
    }
}

var Promise: any;
