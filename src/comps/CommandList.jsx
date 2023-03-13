import { useState, useEffect } from "react";
import "animate.css";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

export function CommandList({ arr, addm, isOpen, setIsOpen }) {
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
    </Drawer>
  );
}
