import "./styles.css";
import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Chats } from "./comps/Chat.jsx";
import { getActAs, getTasks } from "./comps/DataList.jsx";
import { Toolbar } from "./comps/Toolbar.jsx";
import { askGPT } from "./comps/ChatGPT.jsx";
import { CommandList } from "./comps/CommandList";
import { VoiceCommand } from "./comps/VoiceComamnd.js";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userid, setUserid] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  if (!userid) setUserid(Math.random());

  const addMessage = async (message) => {
    if (message.trim() == "") return;

    messages.push({
      id: 1,
      message,
    });
    setIsLoading(true);
    const answer = await askGPT(message, userid);

    messages.push({
      id: 0,
      message: answer,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setRoles(await getActAs());
      setTasks(await getTasks());
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
        type={type}
      />
      <div className="main">
        <div className="topbar">
          <Button
            onClick={() => {
              setItems(tasks);
              setIsOpen(true);
              setType("tasks");
            }}
          >
            Task
          </Button>
          <Button
            onClick={() => {
              setItems(roles);
              setIsOpen(true);
              setType("roles");
            }}
          >
            Act as
          </Button>
        </div>
        <Card>
          <CardContent id="card">
            <Chats messages={messages} isLoading={isLoading} />
          </CardContent>
        </Card>
        <div className="toolbar">
          <Toolbar addMessage={addMessage} />
        </div>
      </div>
    </>
  );
}
