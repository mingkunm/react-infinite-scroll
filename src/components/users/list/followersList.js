import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import api from "../../../utils/axios";
import getNextUrl from "../../../utils/findNextUrl";

export default function ReposList({ initialUrl, setOpen }) {
  const [users, setUsers] = useState([]);
  const [nextUrl, setNextUrl] = useState(initialUrl);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getInitialList();
  }, []);

  // Get initial repos list for the first time
  const getInitialList = async () => {
    fetchFollowersList();
  };

  // Fetch more data when scroll to bottom
  const fetchMoreData = () => {
    fetchFollowersList();
  };

  // Fetch repos list
  const fetchFollowersList = async () => {
    const requestsList = [];

    const newUsers = await api.get(nextUrl);
    if (newUsers.headers.link) {
      const temp = getNextUrl(newUsers.headers.link);
      if (temp) {
        setNextUrl(getNextUrl(newUsers.headers.link));
      } else {
        setHasMore(false);
      }
    }

    newUsers.data.forEach((item) => {
      requestsList.push(api.get(`users/${item.login}`));
    });

    Promise.all(requestsList)
      .then((res) => {
        const temp = [];
        res.forEach((item) => {
          temp.push(item.data);
        });
        return temp;
      })
      .then((res) => {
        setUsers([...users, ...res]);
      });
  };

  // Display detail of each repo
  const cardContent = (user) => {
    return (
      <div className="list-item">
        <div style={{ display: "flex" }}>
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="bar-item circle"
            style={{ width: "85px" }}
          ></img>
          <div className="card-content">
            <div className="bar-item" style={{ fontWeight: "bold" }}>
              {user.name || <span>N/A</span>}
            </div>
            <div className="bar-item">{user.location || <span>N/A</span>}</div>
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
      <h2 className="list-header">Followers Lists</h2>
      <ul className="scroll-list">
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {users.map((item, index) => (
            <li key={index}>
              <a
                href={item.html_url}
                target="_blank"
                rel="noreferrer"
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
