import axios from "axios";

export async function askGPT(message, userid) {
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
  const answer = (await axios(config)).data.content.trim();

  return answer;
}
