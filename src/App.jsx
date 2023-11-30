import React from "react";
import arrow from "../src/assets/images/icon-arrow.svg";
import { useState } from "react";

const App = () => {
  const [inputForm, setInputForm] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [result, setResult] = useState({
    age_year: "--",
    age_month: "--",
    age_day: "--",
  });

  const today = new Date();
  const current_year = today.getFullYear();
  const current_month = today.getMonth() + 1; // Months are zero-indexed
  const current_day = today.getDate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputForm({ ...inputForm, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let age_year = current_year - parseInt(inputForm?.year);
    let age_month = current_month - parseInt(inputForm?.month);
    let age_day = current_day - parseInt(inputForm?.day);
    if (age_month < 0) {
      age_month = -1 * age_month;
    }
    if (age_day < 0) {
      age_day = -1 * age_day;
    }
    // console.log(typeof age_day);
    setResult({ age_year, age_month, age_day });
    console.log(age_year, age_month, age_day);
  };

  return (
    <div className="main">
      <div className="main__inner">
        <form onSubmit={handleSubmit} className="birthday">
          <div className="birthday__style">
            <label className="birthday__style__label" htmlFor="day">
              day
            </label>
            <input
              className="birthday__style__input"
              id="day"
              type="number"
              value={inputForm?.day}
              onChange={handleChange}
            />
          </div>
          <div className="birthday__style">
            <label className="birthday__style__label" htmlFor="month">
              month
            </label>
            <input
              className="birthday__style__input"
              id="month"
              type="number"
              value={inputForm?.month}
              onChange={handleChange}
            />
          </div>
          <div className="birthday__style">
            <label className="birthday__style__label" htmlFor="year">
              year
            </label>
            <input
              className="birthday__style__input"
              id="year"
              type="text"
              onChange={handleChange}
              value={inputForm?.year}
            />
          </div>
          <button type="submit" className="arrow">
            <img className="arrow__img" src={arrow} alt="" />
          </button>
        </form>
        <div className="results">
          <p className="results__result">
            <span className="results__result__num">{result?.age_year} </span>
            years
          </p>
          <p className="results__result">
            <span className="results__result__num">{result?.age_month} </span>
            months
          </p>
          <p className="results__result">
            <span className="results__result__num">{result?.age_day} </span>days
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
