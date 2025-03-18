import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrapeComp from "../components/ScrapeComp";
import config from "../config";
const Content = () => {
  const { SERVER_ADDRESS } = config;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${SERVER_ADDRESS}/api/scrape`)
        .then((response) => {
          console.log(response.data.data.data);
          setData(response.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((scrape, key) => {
          return (
            <ScrapeComp
              key={key}
              imgsrc={scrape.logoUrl2}
              url={scrape.seo_url}
              startDate={scrape.start_date}
              status={scrape.status}
              title={scrape.title}
              type={scrape.type}
              viewsCount={scrape.viewsCount}
              subtype={scrape.subtype}
              festival={scrape.festival}
              regions={scrape.region}
              organisation={scrape.organisation}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Content;
