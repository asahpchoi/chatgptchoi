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
    `Write an article outline for the following topic #topic.`,
    `I want you to come up with 5 effective call-to-action button ideas based on the contents of the following URL #url.”`,
    `Write down an essay on the pros and cons of #topic.`,
    `I want you to pretend as a product specialist for an 
    eCommerce store with a specialty in finding and sourcing products to sell online. 
    My store sells #producttype and I need you to come up 
    with a list of #numberofproduct product ideas that I can sell on my online store.`,
  ];
}
