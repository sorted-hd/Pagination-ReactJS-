import "./App.css";

import { useEffect, useState } from "react";

import Pagination from "./Pagination/Pagination";
import Post from "./components/Post";
import axios from "axios";

const httpStatus = require("http-status");

const URL = "https://jsonplaceholder.typicode.com/posts";
function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const makeApiCall = async () => {
      await axios(URL)
        .then((resp) => {
          if (resp.status === httpStatus.OK) {
            setPosts(resp.data);
          } else {
            throw new Error("Something went wrong while status call");
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    makeApiCall();
  }, []);

  return (
    <div className="App">
      <h1>{error}</h1>
      {posts.length !== 0 && (
        <Pagination
          data={posts}
          RenderComponent={Post}
          dataLimit={10}
          pageLimit={5}
          title="Posts"
        />
      )}
    </div>
  );
}

export default App;
