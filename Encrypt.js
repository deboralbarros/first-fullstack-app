const crypto = require("crypto");

module.exports = function encrypt(pass) {
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, iv), iv);
  let encrypted = cipher.update(pass);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString("hex");
}
