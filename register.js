const db = require("./connect");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  // const name = req.body.name;
  // const email = req.body.email;
  // const pwd = req.body.password;
  // const confirmPwd = req.body.confirmPwd;

  const { name, email, password, confirmPassword } = req.body;
  console.log(name);
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.send("Hello");
      } else if (password !== confirmPassword) {
        return res.send("send");
      }

      let hashedPwd = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPwd },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return res.send({ name: name, msg: "success" });
          }
        }
      );
    }
  );
};
