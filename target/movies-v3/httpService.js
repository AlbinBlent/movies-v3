var clientApp;
(function (clientApp) {
    var services;
    (function (services) {
        var HttpService = (function () {
            function HttpService() {
            }
            HttpService.prototype.get = function (url) {
                alert(this.ajax('GET', url));
                return this.ajax('GET', url);
            };
            HttpService.prototype.post = function (url, args) {
                return this.ajax('POST', url, args);
            };
            HttpService.prototype.put = function (url, args) {
                return this.ajax('PUT', url);
            };
            HttpService.prototype.delete = function (url) {
                return this.ajax('DELETE', url);
            };
            HttpService.prototype.ajax = function (method, url, args) {
                var _this = this;
                if (args === void 0) { args = undefined; }
                var promise = new Promise(function (resolve, reject) {
                    var client = new XMLHttpRequest();
                    var uri = _this.constructUri(url, args, method);
                    client.open(method, uri);
                    client.send();
                    client.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(this.response);
                        }
                        else {
                            reject(this.statusText);
                        }
                    };
                    client.onerror = function () {
                        reject(this.statusText);
                    };
                });
                return promise;
            };
            HttpService.prototype.constructUri = function (url, args, method) {
                var uri = url;
                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }
                return uri;
            };
            return HttpService;
        })();
        services.HttpService = HttpService;
    })(services = clientApp.services || (clientApp.services = {}));
})(clientApp || (clientApp = {}));
var Promise;
//# sourceMappingURL=httpService.js.map