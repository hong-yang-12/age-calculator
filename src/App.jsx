import React from "react";
import arrow from "../src/assets/images/icon-arrow.svg";
import { useState } from "react";
import { useEffect } from "react";
import CounterUp from "./components/CounterUp";

const App = () => {
  const [inputForm, setInputForm] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [result, setResult] = useState({
    age_year: 0,
    age_month: 0,
    age_day: 0,
  });
  // const [result, setResult] = useState({
  //   age_year: 0 || "--",
  //   age_month: 0 || "--",
  //   age_day: 0 || "--",
  // });
  // const [result, setResult] = useState({
  //   age_year: "--",
  //   age_month: "--",
  //   age_day: "--",
  // });
  const [errors, setErrors] = useState({});

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

    //required validation
    const daysInMonth = new Date(
      inputForm?.year,
      inputForm?.month,
      0
    ).getDate();

    const validationErrors = {};
    if (!inputForm.day.trim()) {
      validationErrors.day = "day required";
    } else if (inputForm?.day < 1 || inputForm?.day > 31) {
      validationErrors.day = "The day number is not between 1-31";
    } else if (inputForm?.day > daysInMonth) {
      validationErrors.day = "The date is invalid";
    }
    if (!inputForm.month.trim()) {
      validationErrors.month = "month required";
    } else if (inputForm?.month < 1 || inputForm?.month > 12) {
      validationErrors.month = "The month number is not between 1-12";
    }

    if (!inputForm?.year.trim()) {
      validationErrors.year = "year required";
    } else if (inputForm?.year > current_year) {
      validationErrors.year = "The year is in the future";
    }

    setErrors(validationErrors); //input errors
    setResult({ age_year, age_month, age_day }); //submit form
    //reset input form
    setInputForm({
      day: "",
      month: "",
      year: "",
    });
  };
  console.log(result?.age_day, result?.age_month, result?.age_year);

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
            {errors.day && (
              <span className="birthday__style__error">{errors.day}</span>
            )}
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
            {errors.month && (
              <span className="birthday__style__error">{errors.month}</span>
            )}
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
            {errors.year && (
              <span className="birthday__style__error">{errors.year}</span>
            )}
          </div>
          <button type="submit" className="arrow" aria-label="calculate_age">
            <img className="arrow__img" src={arrow} alt="" />
          </button>
        </form>
        <div className="results">
          <p className="results__result">
            <span className="results__result__num">
              {result?.age_year === 0 ? (
                "--"
              ) : (
                <CounterUp start={0} end={result?.age_year} />
              )}
            </span>{" "}
            years
          </p>
          <p className="results__result">
            <span className="results__result__num">
              {result?.age_month === 0 ? (
                "--"
              ) : (
                <CounterUp start={0} end={result?.age_month} />
              )}
            </span>{" "}
            months
          </p>
          <p className="results__result">
            <span className="results__result__num">
              {result?.age_day === 0 ? (
                "--"
              ) : (
                <CounterUp start={0} end={result?.age_day} />
              )}
            </span>{" "}
            days
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
