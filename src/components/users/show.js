import React, { useState } from "react";

import ReposList from "./list/reposList";
import FollowersList from "./list/followersList";

export default function UserDetail({ user, setOpen }) {
  const [reposListOpen, setReposListOpen] = useState("none");
  const [followersListOpen, setfollowersListOpen] = useState("none");

  return (
    <>
      <span
        className="modal-close"
        onClick={() => {
          setOpen({
            index: "block",
            show: "none",
          });
          setReposListOpen("none");
          setfollowersListOpen("none");
        }}
      >
        &times;
      </span>
      <div className="show-brief">
        <img
          src={user.avatar_url}
          alt="Avatar"
          className="bar-item circle"
          style={{ width: "85px" }}
        ></img>
        <div>
          <div className="bar-item" style={{ fontWeight: "bold" }}>
            {user.name || <span>N/A</span>}
          </div>
          <div className="bar-item">{user.location}</div>
        </div>
      </div>
      <hr className="user-detail-divider"></hr>
      <div className="user-content">
        <div>
          <h4>
            Github:
            <a href={user.html_url} target="_blank" rel="noreferrer">
              <span className="show-button">{user.html_url}</span>
            </a>
          </h4>
        </div>
        <div>
          <h4>
            Repositories ({user.public_repos}) :
            <span
              className="show-button"
              onClick={() => {
                setfollowersListOpen("none");
                setReposListOpen("block");
              }}
            >
              View More
            </span>
          </h4>
        </div>
        <div>
          <h4>
            Followers ({user.followers}) :
            <span
              className="show-button"
              onClick={() => {
                setfollowersListOpen("block");
                setReposListOpen("none");
              }}
            >
              View More
            </span>
          </h4>
        </div>
      </div>

      {/* Repo modal */}
      <div style={{ display: reposListOpen }}>
        <div className="modal-content">
          {reposListOpen === "block" && user.repos_url ? (
            <ReposList
              initialUrl={`users/${user.login}/repos`}
              setOpen={setReposListOpen}
            />
          ) : null}
        </div>
      </div>
      {/* Follower modal */}
      <div style={{ display: followersListOpen }}>
        <div className="modal-content">
          {followersListOpen === "block" && user.followers_url ? (
            <FollowersList
              initialUrl={`users/${user.login}/followers`}
              setOpen={setfollowersListOpen}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
