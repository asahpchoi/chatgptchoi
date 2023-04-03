import "animate.css";
import CircularProgress from "@mui/material/CircularProgress";
export function Chats({ messages, isLoading }) {
  return (
    <>
      {messages.map((m, key) => (
        <div key={key} className="msgbox">
          <pre
            className={
              key % 2 === 0
                ? "animate__animated  animate__backInLeft usermsg"
                : "animate__animated  animate__backInRight botmsg"
            }
            onClick={() => {
              navigator.share({
                title: "share",
                text: m.message,
                url: "https://73otgx.csb.app/",
              });
            }}
          >
            {m.message.trim()}
          </pre>
        </div>
      ))}

      {isLoading ? <CircularProgress /> : ""}
    </>
  );
}
