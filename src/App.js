import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ButtonGroup from "@mui/material/ButtonGroup";
import { Chats } from "./comps/Chat.jsx";
import { CommandList } from "./comps/CommandList.jsx";
import { getActAs } from "./comps/DataList.jsx";
import { Toolbar } from "./comps/Toolbar.jsx";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userid, setUserid] = useState();
  const [lastMessage, setLastMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!userid) setUserid(Math.random());

  const addMessage = (message) => {
    messages.push({
      id: 1,
      message,
    });
    setIsLoading(true);

    var data = JSON.stringify({
      question: message,
      userid: userid,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wiry-encouraging-hoodie.glitch.me/chat",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const answer = response.data.content;
        messages.push({
          id: 0,
          message: answer,
        });
        setLastMessage(answer.trim());
        setIsLoading(false);
        const nestedElement = document.getElementById("card");
        nestedElement.scrollTo(0, nestedElement.scrollHeight);
      })
      .catch(function (error) {
        console.log(error);
      });
    //    document.getElementById("card").scrollIntoView(false);
    //.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    async function getData() {
      setRoles(await getActAs());
    }
    getData();
  }, []);

  return (
    <>
      <CommandList
        arr={items}
        addm={addMessage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="main">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          className="topbar"
        >
          <Button
            onClick={() => {
              setItems([]);
              setIsOpen(true);
            }}
          >
            Task
          </Button>
          <Button
            onClick={() => {
              setItems(roles);
              setIsOpen(true);
            }}
          >
            Act as
          </Button>
        </ButtonGroup>
        <Card>
          <CardContent id="card">
            <Chats messages={messages} isLoading={isLoading} />
          </CardContent>
        </Card>
        <Toolbar addMessage={addMessage} />
      </div>
    </>
  );
}
