import axios from "axios";

export async function getActAs() {
  const data = await axios.get(
    "https://wiry-encouraging-hoodie.glitch.me/prompts"
  );

  return require("underscore").sortBy(data.data, "act");
}

export async function getTasks() {
  return [
    `Now I'll give you my resume. Provide feedback on how I can tailor it to the above job post. Here's my resume: #CV`,
    `Here's the Experience section I wrote: #FullResumeHere
  And here's the job ad I'm applying for: #JobDescription`,
  ];
}
