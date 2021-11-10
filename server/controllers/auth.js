const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

//accessing data from env file
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// what will happen when user signup
const signup = async (req, res) => {
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

const login = (req, res) => {};

module.exports = { signup, login };
