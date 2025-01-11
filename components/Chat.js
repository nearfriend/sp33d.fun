import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CreateTokenContainer = styled.div`
  text-align: left;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 2.5em;
  row-gap: 11px;
  min-width: 640px;
  max-width: 640px;
  position: relative;
  z-index: 999;
  border-radius: 6px;
  height: 100%;
`;

const InputField = styled.textarea`
  padding: 16px;
  font-size: 16px;
  background: #414fff29;
  text-align: left;
  border: solid 1px #414fff4d;
  color: black;
  flex: 1;
  resize: none;
  border-radius: 6px;
`;

const CreateButton = styled.button`
  padding: 20px 0px;
  font-size: 20px;
  width: 50px;
  height: 50px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  color: white;
  border-radius: 6px;
  background: grey;

  &:hover {
    background-color: #414fff;
  }
`;

const preStyle = {
  background: "#f4f4f4",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  overflowX: "auto",
  color: "black",
  height: "100%",
};

const Chat = () => {
  const [text, setText] = useState("");
  const [loading, setloading] = useState(false);
  const [history, setHistory] = useState([]);
  const [responseText, setResponseText] = useState("");
  const sendText = async () => {
    setloading(true);
    if (text !== "") {
      // setHistory((prevtexts) => [...prevtexts, responseText]);
      // setHistory((prevtexts) => [...prevtexts, text]);
      const replyText = await fetchOpenAIResponse(text);
      // setHistory((prevtexts) => [...prevtexts, replyText]);
      setText("");
      setloading(false);
    } else {
      toast.error("Type text!");
      setloading(false);
    }
  };

  const fetchOpenAIResponse = async (prompt) => {
    const API_KEY = "sk-proj-2JfK80yqgh5QFhCcl2VkT3BlbkFJVunoZsK88j8898wWXSeO";
    const sonicContext = 'Your name is just sonica, you are just our support chat bot for our sonic blockchain network'
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [  
              { role: "system", content: sonicContext },  
              { role: "user", content: prompt }  
          ],  
          stream: false,  
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let completeResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });
        const lines = textChunk
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => line.replace(/^data: /, "").trim());

        for (const line of lines) {
          if (line === "[DONE]") return;
          const parsed = JSON.parse(line);
          if (parsed.choices && parsed.choices[0].delta.content) {
            completeResponse += parsed.choices[0].delta.content;
            setResponseText(completeResponse); // Update state to re-render component
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data from OpenAI:", error);
    }
  };
  const containerRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendText();
    }
  };

  useEffect(() => {
    // Scrolls the container to bottom whenever messages change
    if (history.length > 0) {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  }, [history]);

  return (
    <div className="inner-token-container">
      <Toaster position="right-bottom" />
      <CreateTokenContainer>
        {/* <div
          style={{
            borderRadius: "6px",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflowY: "overlay",
            }}
            ref={containerRef}
            >
            {history.length > 0 &&
            history.map((item, key) => {
              return (
                <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: key % 2 === 1 ? "start" : "end",
                  }}
                  >
                  <h5
                  style={{
                    maxWidth: "40%",
                    textAlign: "left",
                    color: "black",
                    wordWrap: "break-word",
                    }}
                    >
                    {item}
                    </h5>
                </div>
                );
            })}
            </div> */}
        <div style={preStyle}>
          <pre style={{ whiteSpace: "pre-wrap" }}>{responseText}</pre>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <InputField
            disabled={loading}
            rows={1}
            type="text"
            placeholder="Type Here"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <CreateButton
            disabled={loading}
            onClick={() => {
              sendText();
            }}
          >
            <img
              src="/send.png"
              style={{ width: "40px", height: "40px" }}
              alt="send"
            />
          </CreateButton>
        </div>
      </CreateTokenContainer>
    </div>
  );
};

export default Chat;
