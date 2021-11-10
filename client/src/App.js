import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelListContainer from "./components/ChannelListContainer";
import ChannelContainer from "./components/ChannelContainer";
import Auth from "./components/Auth";
const apiKey = "uzvg4g7k52gd";
const client = StreamChat.getInstance(apiKey);

function App() {
  return (
    <div className="app__wrapper">
      {/*
        <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
      */}
      <Auth />
    </div>
  );
}

export default App;
