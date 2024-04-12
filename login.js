const db = require("./connect");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  // we should check here if the req body is empty.
  db.query(
    `SELECT * FROM users u WHERE u.email = ?`,
    [email],
    async (error, results) => {
      if (error) throw error;

      if (results.length == 0) {
        return res.send({ msg: "Could not find a user with that email" });
      } else {
        const hashedPassword = results[0].password;

        if (await bcrypt.compare(password, hashedPassword)) {
          db.query(
            `SELECT name FROM users u WHERE u.email = ?`,
            [email],
            (err, results) => {
              if (err) throw err;
              // console.log("login user name:" + results);
              res.send({ name: results[0].name, msg: "success" });
            }
          );
        } else {
          res.send({ msg: "Incorrect password" });
        }
      }
    }
  );
};
