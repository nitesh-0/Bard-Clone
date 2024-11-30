import "./App.css";
import chatGPTlogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { SendMessageToOpenAi } from "./openai";
import { useCallback, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);

  const handleSend = useCallback(async () => {
    if (isSending || !input.trim()) return;

    const userMessage = input.trim();
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: "user" }]);
    setInput(""); // Clear input after sending
    setIsSending(true);

    try {
      const botResponse = await SendMessageToOpenAi(userMessage);
      console.log(botResponse);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to get response from ChatGPT.", sender: "bot" },
      ]);
    } finally {
      setIsSending(false);
    }
  }, [input, isSending]);

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersideTop">
            <img src={chatGPTlogo} alt="logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="uppersideBottom">
            <button className="query">
              <img src={msgIcon} alt="" />
              What is Programming
            </button>
            <button className="query">
              <img src={msgIcon} alt="" />
              How to use an API
            </button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listItems">
            <img src={home} alt="" className="listitemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listitemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listitemsImg" />
            Upgrade to pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message) => (
            <div className={`chat ${message.sender === "bot" ? "bot" : ""}`}>
              <img
                className="chatImg"
                src={message.sender === "bot" ? gptImgLogo : userIcon}
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message to chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT may generate incorrect results. Always try to verify its response.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
