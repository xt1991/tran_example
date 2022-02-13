const jwt = require('jsonwebtoken');

export default function(id: string) {
  const token = jwt.sign({ _id: id }, process.env.SECRET_TOKEN);
  return token;
}
