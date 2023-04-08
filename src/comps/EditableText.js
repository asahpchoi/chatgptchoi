import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const tokenize = (context) => {
  let results = [];
  var regex = /#\S+/g;
  const inputs = context.match(regex);

  let start = 0;
  inputs.forEach((element) => {
    const i = context.indexOf(element);
    const s = context.substr(start, i - start);
    start = i + element.length;
    results.push(s);
    results.push(element);
  });
  return results;
};

export default function EditableText({ context, onComplete }) {
  const tokens = tokenize(context);
  let inputs = {};

  const showInput = (id) => {
    const updateValue = (v) => {
      //console.log(v.target.value);
      inputs[id] = v.target.value;
    };

    return (
      <>
        <TextField
          id={id}
          label={id}
          onChange={updateValue}
          multiline
          maxRows={4}
        />
      </>
    );
  };

  const replace = () => {
    let resultString = context;
    tokens
      .filter((t) => t.startsWith("#"))
      .forEach((t) => (resultString = resultString.replace(t, inputs[t])));

    onComplete(resultString);
  };

  return (
    <Card>
      <CardContent className="promptbox">
        {tokens.map((t, i) => (
          <div key={i}>{t.startsWith("#") ? showInput(t) : t}</div>
        ))}
      </CardContent>
      <CardActions>
        <Button onClick={replace}>Ask</Button>
      </CardActions>
    </Card>
  );
}
