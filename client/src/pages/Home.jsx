// import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/Carousel";
import TabCategories from "../components/TabCategories";
import { useEffect, useState } from "react";

const Home = () => {
  // const jobs = useLoaderData()

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("https://ideohub.vercel.app/jobs");
      setJobs(data);
    }
    getData();
  }, []);
  console.log(jobs);
  return (
    <div>
      <Carousel />
      <TabCategories jobs={jobs} />
    </div>
  );
};

export default Home;
