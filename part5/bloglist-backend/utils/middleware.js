const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  const { token } = request
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.userId = decodedToken.id
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: 'malformatted id' }),

  ValidationError: (res, { message }) =>
    res.status(409).json({ error: message }),

  JsonWebTokenError: (res) => res.status(401).json({ error: 'invalid token' }),

  TokenExpiredError: (res) => res.status(401).json({ error: 'token expired' }),

  defaultError: (res) => res.status(500).end()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
