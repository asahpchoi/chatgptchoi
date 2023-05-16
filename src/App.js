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

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" id="main">
        <CommandList
          arr={items}
          addm={addMessage}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type={type}
        />
        <div className="topbar">
          <Button
            variant="contained"
            onClick={() => {
              setItems(tasks);
              setIsOpen(true);
              setType("tasks");
            }}
          >
            Task
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setItems(roles);
              setIsOpen(true);
              setType("roles");
            }}
          >
            Act as
          </Button>
        </div>

        <Chats messages={messages} isLoading={isLoading} />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="l">
          <Toolbar addMessage={addMessage} />
        </Container>
      </Box>
    </Box>
  );
}
