import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { setSearchTerm } from "../../store/redditSlice";

const Header = () => {
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };
  return (
    <header>
      <div className="logo-container">
        <p className="logo-text">Reddit Mini</p>
        <FontAwesomeIcon icon={faReddit} className="logo-img" />
      </div>
      <form className="search-form">
        <input
          type="text"
          placeholder="Search Reddit Mini"
          value={searchTermLocal}
          aria-label="Search Reddit"
          onChange={(e) => setSearchTermLocal(e.target.value)}
        />
        <button
          icon={faMagnifyingGlass}
          type="submit"
          onClick={onSearchTermSubmit}
          aria-label="Search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
