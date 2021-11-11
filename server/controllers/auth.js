const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");
require("dotenv").config();

//accessing data from env file
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// what will happen when user signup
const signup = async (req, res) => {
  console.log('s');
  try {
    // *extract signup form data coming from frontend
    const { fullName, username, password, phoneNumber } = req.body;

    // *generating random userId using crypto library
    const userId = crypto.randomBytes(16).toString("hex");

    // *client connection to stream
    const serverClient = connect(api_key, api_secret, app_id);

    // *create a hashed password using bcrypt library
    const hashedPassword = await bcrypt.hash(password, 10);

    // *generating token for signup user
    const token = serverClient.createUserToken(userId);

    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// *what will happen when user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // *client connection to stream
    const serverClient = connect(api_key, api_secret, app_id);

    // *getting instance of StreamChat
    const client = StreamChat.getInstance(api_key, api_secret);

    
    // *finding users with given username
    const { users } = await client.queryUsers({ name: username });
    console.log(users);
    // *check whether user exists with given username
    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    // *checking password with password given by user during signup
    const success = await bcrypt.compare(password, users[0], hashedPassword);

    // *generating token for login user
    const token = serverClient.createUserToken(users[0].id);

    // *user authenticated
    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
