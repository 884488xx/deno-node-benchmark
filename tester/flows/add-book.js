const crypto = require("crypto");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newBook = {
  author: crypto.randomBytes(20).toString('hex'),
  title: `${crypto.randomBytes(20).toString('hex')} ${crypto.randomBytes(20).toString('hex')}`,
  description: `${crypto.randomBytes(20).toString('hex')} ${crypto.randomBytes(20).toString('hex')} ${crypto.randomBytes(20).toString('hex')} ${crypto.randomBytes(20).toString('hex')}${crypto.randomBytes(20).toString('hex')}`,
  code: getRandomInt(1, 2000),
};

module.exports = {
  create: { method: 'POST', path: '/book', body: newBook },
  get: { method: 'GET', path: '/book' },
  delete: { method: 'DELETE', path: '/book' },
};