// check username, password in post(login) request
// if exist create new JWT
// send back to from-end

// setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  // opciones de validación
  // mongoose validation
  // Joi package
  // check in the controller
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  // just fo demo, normally provided by DB!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for use
  // just for demo, in production use long, complex and unquessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // console.log(username, password);
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError('No token provided', 401);
  }
  const token = authHeader.split(' ')[1];
  console.log(token);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
