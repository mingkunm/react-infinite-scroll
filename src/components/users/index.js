import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import UserDetail from "./show";
import api from "../../utils/axios";
import getNextUrl from "../../utils/findNextUrl";

export default function UserIndex() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(null);
  const [nextUrl, setNextUrl] = useState("users?since=0");
  const [detail, setDetail] = useState();
  const [detailDisplay, setDetailDisplay] = useState({
    index: "block",
    show: "none",
  });

  useEffect(() => {
    getInitialList();
  }, []);

  // Get initial users list for the first time
  const getInitialList = async () => {
    fetchAndSetUserDetails();
  };

  // Handle search users by user name
  const handleInput = (e) => {
    let target = e.target.value;

    if (target === "") {
      setSearch(null);
    } else {
      let resultList = [];
      const searchUser = new Promise((resolve) => {
        users.forEach((item, index, array) => {
          const name = item.name;
          if (name && name.toLowerCase().includes(target.toLowerCase())) {
            resultList.push(item);
          }
          if (index === array.length - 1) resolve(resultList);
        });
      });

      searchUser.then((res) => {
        if (res.length > 0) {
          setSearch(res);
        } else {
          setSearch([null]);
        }
      });
    }
  };

  // Fetch more data when scroll to bottom
  const fetchMoreData = () => {
    fetchAndSetUserDetails();
  };

  // Fetch name... information of each user
  const fetchAndSetUserDetails = async () => {
    const requestsList = [];

    const newUsers = await api.get(nextUrl);
    setNextUrl(getNextUrl(newUsers.headers.link));

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

  // Handle user index & detail display
  const handleUserDetail = (user) => {
    setDetail(user);
    setDetailDisplay({
      index: "none",
      show: "block",
    });
  };

  // Eash record display
  const cardContent = (user) => {
    if (user) {
      return (
        <div style={{ display: "flex" }} onClick={() => handleUserDetail(user)}>
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
      );
    } else {
      return (
        <div>
          <div className="search-result-none">no match!</div>
        </div>
      );
    }
  };

  return (
    <div className="paper">
      <div style={{ display: detailDisplay.index }}>
        <input
          type="text"
          placeholder="Search by user name..."
          onChange={handleInput}
        ></input>
        <ul>
          <InfiniteScroll
            dataLength={users.length}
            next={fetchMoreData}
            hasMore={detailDisplay.index === "block"}
            loader={<h4>Loading...</h4>}
          >
            {search
              ? search.map((item, index) => (
                  <li key={index}>{cardContent(item)}</li>
                ))
              : users.map((item, index) => (
                  <li key={index}>{cardContent(item)}</li>
                ))}
          </InfiniteScroll>
        </ul>
      </div>
      <div style={{ display: detailDisplay.show, padding: "16px" }}>
        {detail ? (
          <UserDetail user={detail} setOpen={setDetailDisplay} />
        ) : null}
      </div>
    </div>
  );
}
