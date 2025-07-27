import { useRef, useState, useEffect } from "react";
import FileDisplay from "./components/FileDisplay";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          console.log("DOWNLOADING");
          break;
        case "LOADING":
          console.log("DOWNLOADING");
          break;
        case "RESULT":
          console.log("DOWNLOADING");
          break;
        case "INFERENCE_DONE":
          console.log("DOWNLOADING");
          break;
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-transparent text-slate-700 text-sm sm:text-base">
      <div className="flex flex-col max-w-[1024px] mx-auto w-full">
        {/* Main Section */}
        <section className="min-h-screen flex flex-col">
          <Header />
          {output ? (
            <Information />
          ) : loading ? (
            <Transcribing />
          ) : isAudioAvailable ? (
            <FileDisplay
              handleAudioReset={handleAudioReset}
              file={file}
              audioStream={audioStream}
            />
          ) : (
            <HomePage setFile={setFile} setAudioStream={setAudioStream} />
          )}
        </section>

        {/* Footer */}
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
