const Message = require("../models/Message");

const contact = async(req, res) => {
    const {name, email, message} = req.body

    if(name == "" || email == "" || message =="" ){
        res.json({"error": "Fields cannot be empty"})
    }

    try {
        const user = await Message.create({
          name: name,
          email: email,
          message: message,
        });
        if(user){
            res.json({success:"Saved"})
        }
    }catch(error){
        console.log(error)
    }
    
  };

  module.exports = {
    contact
  };
  