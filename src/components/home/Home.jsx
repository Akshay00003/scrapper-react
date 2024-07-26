import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/movies")
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td>{item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;