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
      console.log(results);
      if (error) throw error;

      if (results.length == 0) {
        res.send("Invalid username and/or password");
        res.sendStatus(404);
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

          // save session before redirection to new page
          // to ensure session is saved
          //     session.save(function (err) {
          //       if (err) {
          //         return next(err);
          //       }
          //       res.send("success!");
          //     });
          //   } else {
          //     res.send("Invalid username and/or password");
          //   }
          // }
        }
      }
    }
  );
};
