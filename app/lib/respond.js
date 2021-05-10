

const respondWithError = err => {
    const error = {
        error: true,
        message: err,
        results: {}
    }
    return error
}

const respondWithData = (message, data) => {
    const respond = {
        error: false,
        message: message,
        results: data
    }
    return respond
}

const respondWithMessage = message => {
    const respond = {
        error: false,
        message: message,
        results: {}
    }
    return respond
}

module.exports.respondWithError = respondWithError;
module.exports.respondWithData = respondWithData;
module.exports.respondWithMessage = respondWithMessage;
