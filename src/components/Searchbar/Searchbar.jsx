import PropTypes from "prop-types";
import { useState } from "react";
import s from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = ({ target: { value } }) => setValue(value.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(value);
    setValue("");
  };

  return (
    <div className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.formButton}>
          <span className={s.formButtonLabel}>Search</span>
        </button>

        <input
          className={s.formInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={value}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
