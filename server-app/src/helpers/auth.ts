import bcrypt from "bcryptjs";

const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err: any, salt: any) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password: any, hashPassword: any) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
