const { statusCode } = require('./constants');

class BadRequestException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = statusCode.BAD_REQUEST;
  }
}

class ConflictException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = statusCode.CONFLICT;
  }
}

class NotFoundException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = statusCode.NOT_FOUND;
  }
}

class UnauthorizedException extends Error {
  constructor(message = 'Unauthorized') {
    super();
    this.message = message;
    this.status = statusCode.UNAUTHORIZED;
  }
}

class ForbiddenException extends Error {
  constructor(message = 'No permission') {
    super();
    this.message = message;
    this.status = statusCode.FORBIDDEN;
  }
}

module.exports = {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
};
