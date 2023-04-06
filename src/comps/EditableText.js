import { useState } from "react";

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
      <textarea type="text" id={id} onChange={updateValue} placeholder={id} />
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
    <div className="App">
      {tokens.map((t, i) => (
        <span key={i}>{t.startsWith("#") ? <b>{showInput(t)}</b> : t}</span>
      ))}
      <button onClick={replace}>Complete</button>
    </div>
  );
}
