// const ERROR_WRONG_DATA_CODE = 400;
// const ERROR_UNAUTHORIZED_CODE = 401;
// const ERROR_FORBIDDEN_CODE = 403;
// const ERROR_NOT_FOUND_CODE = 404;
// const ERROR_DEFAULT_CODE = 500;

// module.exports = {
//   ERROR_WRONG_DATA_CODE,
//   ERROR_UNAUTHORIZED_CODE,
//   ERROR_FORBIDDEN_CODE,
//   ERROR_NOT_FOUND_CODE,
//   ERROR_DEFAULT_CODE,
// };

const corsOptions = {
  origin: [
    'https://withus.nomoredomains.xyz',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
  ],
  credentials: true,
};

module.exports = { corsOptions };
