import { useEffect, useState } from "react";
import "./App.css";
import { addNewMessage, getAllMessages } from "./appwrite";
import Header from "./components/Header";
import MessageComposer from "./components/MessageComposer";
import Spinner from "./components/Spinner";

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(0);
  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const submitMessage = async () => {
    try {
      // console.log(username, message);

      // If there is no message, return an error
      if (!message) {
        setMessageError("Message cannot be empty.");
      }

      if (message) {
        await addNewMessage(username, message);
        setUsername("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setMessageError("An error occurred while submitting message.");
    } finally {
      setAllMessages([]); // reset
      setCursor(null); // reset pagination
      setHasMore(true);
      setButtonPressed((prev) => !prev);
    }
  };

  const getMessages = async () => {
    setIsLoading(true);

    try {
      const response = await getAllMessages(cursor);
      let messages = response.documents;

      messages = messages.map((doc) => {
        const date = new Date(doc.$createdAt);
        const formatted = date.toLocaleString();

        return { ...doc, $createdAt: formatted };
      });

      if (messages.length > 0) {
        setAllMessages((prev) => [...prev, ...messages]);
        setCursor(messages[messages.length - 1].$id);
        setHasMore(messages.length === 5); // adjust if you change limit
      } else {
        setHasMore(false);
      }

      setAllMessages(messages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Get messages!");
    getMessages();
  }, [buttonPressed]);

  return (
    <div className="max-w-xl mx-auto my-10">
      {/* Header */}
      <Header />

      {/* Message Composer */}
      <MessageComposer
        username={username}
        setUsername={setUsername}
        message={message}
        setMessage={setMessage}
        messageError={messageError}
        submitMessage={submitMessage}
      />

      {/* Message Feed */}
      <div className="mt-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : allMessages && allMessages.length > 0 ? (
          <div>
            {allMessages.map((message) => (
              <div
                key={message.$id}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm my-4"
              >
                <div className="flex gap-3">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {message.username || "Anonymous"}
                    </div>
                    <div className="text-gray-700 text-sm mt-1">
                      {message.message_content}
                    </div>
                    <div className="text-gray-700 text-sm mt-1">
                      {message.$createdAt}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="text-center mt-4">
                <button
                  onClick={getMessages}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No messages</p>
        )}
      </div>
    </div>
  );
}

export default App;
