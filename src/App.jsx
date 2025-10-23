import arrow from "../src/assets/images/icon-arrow.svg";
import { useState } from "react";
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

    const validationErrors = {};
    const { day, month, year } = inputForm;
    const daysInMonth = new Date(year, month, 0).getDate();

    if (!day) validationErrors.day = "Day is required";
    else if (day < 1 || day > 31) validationErrors.day = "Invalid day";
    else if (day > daysInMonth) validationErrors.day = "Date doesn't exist";

    if (!month) validationErrors.month = "Month is required";
    else if (month < 1 || month > 12) validationErrors.month = "Invalid month";

    if (!year) validationErrors.year = "Year is required";
    else if (year > current_year)
      validationErrors.year = "Year cannot be in the future";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let age_year = current_year - year;
      let age_month = current_month - month;
      let age_day = current_day - day;

      if (age_day < 0) {
        age_month -= 1;
        const prevMonthDays = new Date(
          current_year,
          current_month - 1,
          0
        ).getDate();
        age_day += prevMonthDays;
      }

      if (age_month < 0) {
        age_year -= 1;
        age_month += 12;
      }

      setResult({ age_year, age_month, age_day });
    }
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
              type="number"
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
