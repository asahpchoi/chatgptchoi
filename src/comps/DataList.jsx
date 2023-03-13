import axios from "axios";

export async function getActAs() {
  const data = await axios.get(
    "https://wiry-encouraging-hoodie.glitch.me/prompts"
  );

  return require("underscore").sortBy(data.data, "act");
}

export async function getTasks() {
  return [];
}
