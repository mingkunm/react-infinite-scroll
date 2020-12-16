import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import api from "../../../utils/axios";
import getNextUrl from "../../../utils/findNextUrl";

export default function ReposList({ initialUrl, setOpen }) {
  const [repos, setRepos] = useState([]);
  const [nextUrl, setNextUrl] = useState(initialUrl);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getInitialList();
  }, []);

  // Get initial repos list for the first time
  const getInitialList = async () => {
    fetchReposList();
  };

  // Fetch more data when scroll to bottom
  const fetchMoreData = () => {
    fetchReposList();
  };

  // Fetch repos list
  const fetchReposList = async () => {
    const newRepos = await api.get(`https://api.github.com/${nextUrl}`);
    if (newRepos.headers.link) {
      const temp = getNextUrl(newRepos.headers.link);
      if (temp) {
        setNextUrl(getNextUrl(newRepos.headers.link));
      } else {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
    setRepos([...repos, ...newRepos.data]);
  };

  // Display detail of each repo
  const cardContent = (repo) => {
    return (
      <div className="list-item">
        <div className="flex-container">
          <div className="bar-item" style={{ marginRight: "36px" }}>
            Name:
          </div>
          <div className="bar-item" style={{ fontStyle: "italic" }}>
            {repo.name}
          </div>
        </div>
        <div className="flex-container">
          <div className="bar-item">Description: </div>
          <div className="bar-item">
            {repo.description ? repo.description : "N/A"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <span className="modal-close" onClick={() => setOpen("none")}>
        &times;
      </span>
      <h2 className="list-header">Repositories Lists</h2>
      <ul className="scroll-list">
        <InfiniteScroll
          dataLength={repos.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="loader"></div>}
          scrollableTarget="scrollableDiv"
        >
          {repos.map((item, index) => (
            <li key={index}>
              <a
                href={item.html_url}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="list-link"
              >
                {cardContent(item)}
              </a>
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </>
  );
}
