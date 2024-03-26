const db = require("./connect");
const bcrypt = require("bcryptjs");

exports.authenticate = async (req, res) => {
  
  const {email, password} = req.body;

  db.query(`SELECT * FROM users u WHERE u.email = ?`, [email], async (error, results) => {
  
  if (error) throw (error)

  if (results.length == 0) {
    res.send("Invalid username and/or password");
    res.sendStatus(404);
  } else {
    const hashedPassword = results[0].password;

    if (await bcrypt.compare(password, hashedPassword)) {
      session = req.session;
      session.user = email; //set session identifier
      res.send("success!")

      // save session before redirection to new page
      // to ensure session is saved
      session.save(function (err) {
        if (err) {
          return next(err)
        }
        res.send('success!');
      })
    } else {
        res.send("Invalid username and/or password");
    }
  }
  
  });
}