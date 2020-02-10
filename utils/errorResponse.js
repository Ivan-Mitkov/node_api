// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
