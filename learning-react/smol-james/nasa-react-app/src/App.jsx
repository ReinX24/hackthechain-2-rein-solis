import Main from "./components/Main";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    async function fetchApiData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

      // Caching the data using localStorage
      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetched from cache today");
        return;
      }

      localStorage.clear();

      try {
        const res = await fetch(url);
        const apiData = await res.json();

        localStorage.setItem(localKey, JSON.stringify(apiData));

        setData(apiData);
        // console.log("DATA:\n", apiData);
        console.log("Fetched from API today");
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchApiData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
