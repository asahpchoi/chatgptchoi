import "animate.css";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

export function Chats({ messages, isLoading }) {
  return (
    <>
      {messages.map((m, key) => (
        <div key={key} className="msgbox">
          <pre
            className={
              key % 2 === 0
                ? "animate__animated  animate__backInLeft usermsg"
                : "animate__animated  animate__backInRight"
            }
          >
            {m.message.trim()}
            <div className="chattool">
              <Link
                onClick={() => {
                  navigator.clipboard.writeText(m.message);
                }}
              >
                Copy
              </Link>
              <Link
                onClick={() => {
                  navigator.share({
                    title: "share",
                    text: m.message,
                    url: "https://73otgx.csb.app/",
                  });
                }}
              >
                Share
              </Link>
            </div>
          </pre>
        </div>
      ))}

      {isLoading ? <CircularProgress /> : ""}
    </>
  );
}
