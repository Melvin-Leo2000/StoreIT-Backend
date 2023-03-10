const Users = require("../models/userModel");
const sendMail = require('./sendMail')

// Order placement
const userCtrl = {
  order: async (req, res) => {
    try {
      const {
        name,
        contact,
        email,
        collectiondate,
        collectiontime,
        returndate,
        returntime,
        smallitems,
        largeitems,
        hugeitems,
        duration,
        residence,
        notes,
        price,
      } = req.body;

      // Email validation and tests
      if (
        !name ||
        !contact ||
        !email ||
        !collectiondate ||
        !collectiontime ||
        !returndate ||
        !smallitems ||
        !largeitems ||
        !hugeitems ||
        !duration ||
        !residence ||
        !price
      )
        return res.status(400).json({ msg: "Please fill in all fields!" });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email." });

      const newUser = new Users({
        name,
        contact,
        email,
        collectiondate,
        collectiontime,
        returndate,
        returntime,
        smallitems,
        largeitems,
        hugeitems,
        duration,
        residence,
        notes,
        price,
      });
      await newUser.save();
      
      sendMail(email, name, collectiondate, collectiontime, returndate, returntime,smallitems,largeitems,hugeitems,duration,residence, price)


      res.json({ msg: "Order has been placed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = userCtrl;
