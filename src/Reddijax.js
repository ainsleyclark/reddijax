/**
 * Constructor
 *
 */
function Reddijax() {

    this.defaultOpt = {
        async: 'true',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: 'json'
    };
}

/**
 * POST Function
 *
 */
Reddijax.prototype.post = function(requestObj) {
    return execute(Object.assign(this.defaultOpt, requestObj), 'POST');
}

/**
 * GET Function
 *
 */
Reddijax.prototype.get = function(requestObj) {
    return execute(Object.assign(this.defaultOpt, requestObj), 'GET');
}

/**
 * Validates Request Object before Sending
 *
 */
function validate(requestObj) {

    if(requestObj.beforeSend && (typeof requestObj.beforeSend != 'function')) {
        console.error('Reddijax: beforeSend must be a function');
        return false;
    }

    return true;
}

/**
 * Executes XML HTTP Request
 *
 */
function execute(requestObj, method) {

    return new Promise((resolve, reject) =>
    {

        if (!validate(requestObj)) {
            return;
        }

        try {

            //BeforeSend
            if(requestObj.beforeSend) {
                requestObj.beforeSend();
            }

            //Request
            let request = new XMLHttpRequest();
            request.open(method, requestObj.url, requestObj.async);
            request.setRequestHeader("content-type", requestObj.contentType);

            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    if (typeof this.response === undefined) {
                        resolve(this.responseText);
                    } else {
                        resolve(JSON.parse(this.response));
                    }
                } else {
                    reject(JSON.parse(this.response));
                }
            };

            request.onerror = function() {
                reject(JSON.parse(this.response));
            };

            request.send(JSON.stringify(requestObj.data));

        } catch(exception) {
            reject(console.error('Reddijax:' + exception));
        }
    });
}

export default Reddijax;