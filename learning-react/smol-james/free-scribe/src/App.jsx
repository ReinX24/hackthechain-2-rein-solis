import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import FileDisplay from "./components/FileDisplay";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  useEffect(() => {
    console.log(audioStream);
  }, [audioStream]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-transparent text-slate-700 text-sm sm:text-base">
      <div className="flex flex-col max-w-[1024px] mx-auto w-full">
        {/* Main Section */}
        <section className="min-h-screen flex flex-col">
          <Header />
          {isAudioAvailable ? (
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
