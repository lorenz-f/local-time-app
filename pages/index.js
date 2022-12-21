import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";

export default function Home() {
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [quote, setQuote] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [locationData, setLocationData] = useState("");
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [focusQuote, setFocusQuote] = useState(false);
  const [quotePosition, setQuotePosition] = useState("px-[25%]");

  {
    /* setting variables intended to return various items from the Date object */
  }

  let time = new Date().toString();
  let dayOfWeek = new Date().getDay();
  let dayOfMonth = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let hours = parseInt(time.slice(16, 18));

  {
    /* API call to fetch the user's location */
  }

  useEffect(() => {
    async function locationCall() {
      const res = await fetch("http://ip-api.com/json/");
      const locationData = await res.json();
      setLocationData(locationData);
    }
    locationCall();
  }, []);

  {
    /* API call to quote generator */
  }

  useEffect(() => {
    async function apiCall() {
      const res = await fetch("https://api.quotable.io/random");
      const quote = await res.json();
      setQuote(quote);
      console.log(quote);
    }
    apiCall();
  }, []);

  {
    /* separate API handler for additional fetches based on the user refreshing the page */
  }

  useEffect(() => {
    if (refresh) {
      async function refreshCall() {
        const res = await fetch("https://api.quotable.io/random");
        const quote = await res.json();
        setQuote(quote);
        setRefresh(false);
      }
      refreshCall();
    }
  }, [refresh]);

  useEffect(() => {});

  return (
    <>
      <div
        className={`sm:text-[#312E81] md:px-0 md:pt-10 md:pb-4 flex flex-col w-screen h-screen px-36 pt-20 pb-10 transition-all duration-300 ease-out ${
          expanded ? "backdrop-blur-sm xs:mt-[5%]" : ""
        }`}
      >
        {/* checks whether the quote generator is hidden from the page or not before dispatching a style change */}

        <div
          className={`${quotePosition} xs:pt-40 xs:flex xs:flex-row order-0 w-full h-[25%] transition-all duration-300 ease-out ${
            quoteVisible
              ? "opacity-0"
              : focusQuote
              ? ""
              : expanded
              ? "blur-sm 0"
              : ""
          }`}
        >
          {/* checking user-selected position to determine quote alignment */}

          <div
            className={`${
              quotePosition == "px-[25%]"
                ? " "
                : quotePosition == "pr-[50%]"
                ? " "
                : " "
            } xs:mt-12 font-playfairDisplay w-full order-1 space-y-8 flex flex-col text-3xl sm:text-lg`}
          >
            <p>{quote.content}</p>
            <p
              className={` items-center font-bold text-2xl xs:text-[#FFBC61] sm:text-lg`}
            >
              - {quote.author}
            </p>

            <svg
              onClick={() => setRefresh(true)}
              className="scale-75 xs:hidden"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
            >
              <path
                fill="#312E81"
                d="M9.8 31.45q-1-1.8-1.4-3.625Q8 26 8 24.1q0-6.55 4.725-11.275Q17.45 8.1 24 8.1h2.15l-4-4 1.95-1.95 7.45 7.45-7.45 7.45-2-2 3.95-3.95H24q-5.35 0-9.175 3.825Q11 18.75 11 24.1q0 1.45.275 2.75t.675 2.45ZM23.8 46l-7.45-7.45 7.45-7.45 1.95 1.95-4 4H24q5.35 0 9.175-3.825Q37 29.4 37 24.05q0-1.45-.25-2.75T36 18.85l2.15-2.15q1 1.8 1.425 3.625Q40 22.15 40 24.05q0 6.55-4.725 11.275Q30.55 40.05 24 40.05h-2.25l4 4Z"
              />
            </svg>
          </div>
        </div>

        <div
          className={`flex flex-row xs:block transition-all duration-300 ease-out justify-end w-full ${
            expanded ? "h-[50%]" : "h-[75%]"
          }`}
        >
          <div
            className={`order-2 flex-col flex transition-all duration-300 ease-out self-end xs:items-center xs:justify-center ${
              expanded
                ? "text-transparent bg-clip-text bg-gradient-to-b from-[#312E81] to-[#FFB6C1] xs:to-[#312E81]"
                : "text-[#FFB6C1] xs:text-[#312E81]"
            }`}
          >
            {/* checks time local to the user and dispatches a relevant greeting */}

            <div className="text-3xl xs:hidden">
              {hours < 12
                ? "Good morning"
                : hours >= 12 && hours < 17
                ? "Good afternoon"
                : "Good evening"}
              , it's
            </div>

            <Clock
              className="xxs:text-[6rem]  text-[13.75rem] mt-[-5rem] xs:mt-[-15.5rem]"
              format={"HH:mm"}
              ticking={true}
              timezone={locationData.timezone}
            />

            <div className="flex flex-row mt-[-4.688rem]">
              <svg
                className={`md:mt-1.5 xs:hidden`}
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
              >
                <path
                  fill="#FFB6C1"
                  d="M24 23.5q1.45 0 2.475-1.025Q27.5 21.45 27.5 20q0-1.45-1.025-2.475Q25.45 16.5 24 16.5q-1.45 0-2.475 1.025Q20.5 18.55 20.5 20q0 1.45 1.025 2.475Q22.55 23.5 24 23.5ZM24 44q-8.05-6.85-12.025-12.725Q8 25.4 8 20.4q0-7.5 4.825-11.95Q17.65 4 24 4q6.35 0 11.175 4.45Q40 12.9 40 20.4q0 5-3.975 10.875T24 44Z"
                />
              </svg>
              <div
                className={`xs:text-xl text-3xl mt-1.5 md:mt-10 tracking-wider uppercase`}
              >
                {locationData.city}, {locationData.region}
              </div>
            </div>
          </div>

          
          {/* controls the refresh state */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`${
              expanded ? "xs:mt-[4vh]" : ""
            } xs:mt-96 self-end ml-auto mr-0 order-3 w-64 xs:w-56 flex flex-row items-center justify-center text-[#FFB6C1] border-transparent border-4 text-4xl h-20 rounded-full hover:border-[#FFB6C1] hover:text-transparent hover:bg-[#FFB6C1] hover:text-[#312E81] transition-all`}
          >
            {expanded ? "LESS" : "MORE"}
            {hover ? (
              <svg
                className="ml-4"
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
              >
                <path
                  fill="#312E81"
                  d="M24 30.1 12.7 18.75l1.6-1.6 9.7 9.7 9.7-9.7 1.6 1.65Z"
                />
              </svg>
            ) : (
              <svg
                className="ml-4"
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
              >
                <path
                  fill="#FFB6C1"
                  d="M24 30.1 12.7 18.75l1.6-1.6 9.7 9.7 9.7-9.7 1.6 1.65Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* bottom navbar module */}

      <div
        className={`${
          expanded ? "mt-[-22vh] xs:mt-[-55vh] " : ""
        }xs:w-screen flex flex-row xs:flex-col bg-gray-300 opacity-80 transition-all duration-300 xs:h-[66vh] ease-out`}
      >
        <div
          className="flex flex-col 
         items-center w-1/2 py-[5vh] sm:py-0 xs:px-12 font-playfairDisplay sm:justify-center sm:w-full xs:h-[45vh]"
        >
          <h1 className="xs:hidden text-3xl">
            {/* assign a string value based on returned integer of zero-index week array */}
            {dayOfWeek == 6
              ? "Saturday"
              : dayOfWeek == 5
              ? "Friday"
              : dayOfWeek == 4
              ? "Thursday"
              : dayOfWeek == 3
              ? "Wednesday"
              : dayOfWeek == 2
              ? "Tuesday"
              : dayOfWeek == 1
              ? "Monday"
              : "Sunday"}
            ,
          </h1>

          <p className="text-7xl md:text-6xl sm:text-5xl xs:text-sm">
            {month == 11
              ? "December"
              : month == 10
              ? "November"
              : month == 9
              ? "October"
              : month == 8
              ? "September"
              : month == 7
              ? "August"
              : month == 6
              ? "July"
              : month == 5
              ? "June"
              : month == 4
              ? "May"
              : month == 3
              ? "April"
              : month == 2
              ? "March"
              : month == 1
              ? "February"
              : "January"}{" "}
            {dayOfMonth}, {year}
          </p>
        </div>

        {/* className=" xs:mx-0 sm:w-[33%] xs:text-4xl flex flex-col items-center border-l border-black w-1/4 mx-auto my-[4vh] font-playfairDisplay text-3xl" */}

        <div
          onMouseEnter={() => setFocusQuote(true)}
          onMouseLeave={() => setFocusQuote(false)}
          className="xs:border-t xs:h-[41vh] xs:w-full xs:space-x-[12vw] xs:flex-row xs:border-l-0 flex flex-col items-center justify-center border-l border-black w-1/4 p-8 font-playfairDisplay text-3xl"
        >
          <h1 className="font-bold">Quote</h1>

          {/* quote visibility setter */}

          <div
            onClick={() => setQuoteVisible(!quoteVisible)}
            className="flex flex-row py-[5vh] mb-0 hover:cursor-pointer hover:font-bold"
          >
            {!quoteVisible ? "Enabled" : "Disabled"}
          </div>
        </div>
        <div
          onMouseEnter={() => setFocusQuote(true)}
          onMouseLeave={() => setFocusQuote(false)}
          className="xs:text-3xl xs:border-t xs:border-l-0 xs:w-full xs:h-[20.5vh] flex flex-col items-center border-l border-black w-[25%] font-playfairDisplay text-3xl"
        >
          {/* quote placement selector for left, center and right */}
          <div className="xs:hidden">
            <div className="xs:mt-0 xs:w-screen xs:py-5 flex flex-col items-center mt-8">
              <h1 className="font-bold">Quote Placement</h1>
              <ul className="sm:gap-[1.3vw] md:gap-[1.3vw] flex flex-row py-[5vh] gap-[.8vw] xs:py-7">
                <button
                  className="hover:cursor-pointer hover:font-bold px-4"
                  onClick={() => setQuotePosition("pr-[50%]")}
                >
                  Left
                </button>
                <div className="border-l border-black " />
                <button
                  className="hover:cursor-pointer hover:font-bold px-4"
                  onClick={() => setQuotePosition("px-[25%]")}
                >
                  Center
                </button>
                <div className="border-l border-black" />
                <button
                  className="hover:cursor-pointer hover:font-bold px-4"
                  onClick={() => setQuotePosition("pl-[50%]")}
                >
                  Right
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
