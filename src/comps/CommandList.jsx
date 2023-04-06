import { useState, useEffect } from "react";
import "animate.css";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import EditableText from "./EditableText";

export function CommandList({ arr, addm, isOpen, setIsOpen, type }) {
  const [context, setContext] = useState(null);
  // console.log(arr);
  const addMessageClose = (content) => {
    addm(content);
    setContext(null);
    setIsOpen(false);
  };
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => {}}
      style={{ textAlign: "left" }}
    >
      <div>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          close
        </Button>
      </div>
      {type === "roles" && (
        <MenuList dense>
          {arr.map((r) => (
            <MenuItem key={r.act}>
              <ListItemText
                onClick={() => {
                  setIsOpen(false);
                  addm(r.prompt);
                }}
                inset
              >
                {r.act}
              </ListItemText>
              <Divider />
            </MenuItem>
          ))}
        </MenuList>
      )}

      {type === "tasks" && (
        <>
          <MenuList dense>
            {arr.map((r) => (
              <MenuItem key={r.act}>
                <ListItemText
                  onClick={() => {
                    //setIsOpen(false);
                    //addm(r.prompt);
                    setContext(r);
                  }}
                  inset
                >
                  <div
                    style={{
                      "overflow-wrap": "break-word",
                      color: "blue",
                      width: "80vw",
                    }}
                  >
                    {r}
                  </div>
                </ListItemText>
                <Divider />
              </MenuItem>
            ))}
          </MenuList>
          {context && (
            <>
              <Divider />
              <EditableText context={context} onComplete={addMessageClose} />
            </>
          )}
        </>
      )}
    </Drawer>
  );
}
