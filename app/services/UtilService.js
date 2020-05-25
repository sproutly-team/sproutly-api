const service = {
  isDev() {
    const env = process.env.NODE_ENV;
    return !env || env === 'development' || env === 'test';
  },

  randomGenerator(length) {
    const arr = [2, 3, 4, 5, 6, 7, 8, 9];
    let i = 0;
    let n = '';
    while (i < length) {
      n += arr[Math.floor(Math.random() * arr.length)];
      i += 1;
    }
    return n;
  }
};

module.exports = service;
