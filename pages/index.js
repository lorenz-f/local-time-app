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

  {/* setting variables intended to return various items from the Date object */}

  let time = new Date().toString();
  let dayOfWeek = new Date().getDay();
  let dayOfMonth = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let hours = parseInt(time.slice(16, 18));

  {/* API call to fetch the user's location */}

  useEffect(() => {
    async function locationCall() {
      const res = await fetch("http://ip-api.com/json/");
      const locationData = await res.json();
      setLocationData(locationData);
    }
    locationCall();
  }, []);

  {/* API call to quote generator */}

  useEffect(() => {
    async function apiCall() {
      const res = await fetch("https://api.quotable.io/random");
      const quote = await res.json();
      setQuote(quote);
      console.log(quote);
    }
    apiCall();
  }, []);

  {/* separate API handler for additional fetches based on the user refreshing the page */}

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

  return (
    <>
      <div
        className={`flex flex-col w-screen h-screen px-36 pt-20 pb-10 transition-all duration-300 ease-out ${
          expanded ? "backdrop-blur-sm" : ""
        }`}
      >

        {/* checks whether the quote generator is hidden from the page or not before dispatching a style change */}

        <div
          className={`${quotePosition} order-1 w-full h-[25%] transition-all duration-300 ease-out ${
            quoteVisible
              ? "opacity-0"
              : focusQuote
              ? ""
              : expanded
              ? "blur-sm"
              : ""
          }`}
        >
          <div
            className={`${
              quotePosition == "px-[25%]"
                ? " "
                : quotePosition == "pr-[50%]"
                ? " "
                : " "
            } font-playfairDisplay w-full order-1 space-y-8 flex flex-col text-3xl`}
          >
            <p>{quote.content}</p>
            <p className="font-bold text-2xl">- {quote.author}</p>
            <svg
              onClick={() => setRefresh(true)}
              className="scale-75"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
            >
              <path d="M9.8 31.45q-1-1.8-1.4-3.625Q8 26 8 24.1q0-6.55 4.725-11.275Q17.45 8.1 24 8.1h2.15l-4-4 1.95-1.95 7.45 7.45-7.45 7.45-2-2 3.95-3.95H24q-5.35 0-9.175 3.825Q11 18.75 11 24.1q0 1.45.275 2.75t.675 2.45ZM23.8 46l-7.45-7.45 7.45-7.45 1.95 1.95-4 4H24q5.35 0 9.175-3.825Q37 29.4 37 24.05q0-1.45-.25-2.75T36 18.85l2.15-2.15q1 1.8 1.425 3.625Q40 22.15 40 24.05q0 6.55-4.725 11.275Q30.55 40.05 24 40.05h-2.25l4 4Z" />
            </svg>
          </div>
        </div>

        <div
          className={`flex flex-row order-2 transition-all duration-300 ease-out ${
            expanded ? "h-[50%]" : "h-[75%]"
          }  w-full`}
        >
          <div
            className={`order-2 flex-col flex transition-all duration-300 ease-out self-end ${
              expanded
                ? "text-transparent bg-clip-text bg-gradient-to-b from-[#312E81] to-[#FFB6C1]"
                : "text-[#FFB6C1]"
            }`}
          >

            {/* checks time and dispatches a relevant greeting */}

            <div className="text-[30px]">
              {hours < 12
                ? "Good morning"
                : hours >= 12 && hours < 17
                ? "Good afternoon"
                : "Good evening"}
              , it's
            </div>
            <Clock
              className="text-[220px] mt-[-80px] text-left"
              format={"HH:mm"}
              ticking={true}
              timezone={locationData.timezone}
            />

            <div className="flex flex-row mt-[-75px]">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path
                  fill="#FFB6C1"
                  d="M24 23.5q1.45 0 2.475-1.025Q27.5 21.45 27.5 20q0-1.45-1.025-2.475Q25.45 16.5 24 16.5q-1.45 0-2.475 1.025Q20.5 18.55 20.5 20q0 1.45 1.025 2.475Q22.55 23.5 24 23.5ZM24 44q-8.05-6.85-12.025-12.725Q8 25.4 8 20.4q0-7.5 4.825-11.95Q17.65 4 24 4q6.35 0 11.175 4.45Q40 12.9 40 20.4q0 5-3.975 10.875T24 44Z"
                />
              </svg>
              <div className="b-[400px] text-[30px] tracking-wider uppercase">
                {locationData.city}, {locationData.region}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="self-end ml-auto mr-0 order-3 w-64 flex flex-row items-center justify-center text-[#FFB6C1] border-transparent border-4 text-4xl h-20 rounded-full hover:border-[#FFB6C1] hover:text-transparent hover:bg-[#FFB6C1] hover:text-[#312E81] transition-all"
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

      <div
        className={`${
          expanded ? "mt-[-12%]" : "mt-0"
        } absolute flex flex-row bg-gray-300 opacity-90 transition-all duration-300 ease-out h-[300px] w-screen`}
      >
        <div className=" w-[50%] py-12 px-20 font-playfairDisplay">
          <h1 className=" text-3xl">
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
          <p className="text-8xl px-10">
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
        <div
          onMouseEnter={() => setFocusQuote(true)}
          onMouseLeave={() => setFocusQuote(false)}
          className="flex flex-col items-center border-l border-black w-[25%] mt-[1.5%] mb-[5%] font-playfairDisplay text-3xl"
        >
          <h1 className="font-bold">Quote</h1>
          <div
            onClick={() => setQuoteVisible(!quoteVisible)}
            className="flex flex-row mt-[9.5%] mb-0 hover:cursor-pointer hover:font-bold"
          >
            {!quoteVisible ? "On" : "Off"}
          </div>
        </div>
        <div
          onMouseEnter={() => setFocusQuote(true)}
          onMouseLeave={() => setFocusQuote(false)}
          className="flex flex-col items-center border-l border-black w-[25%] mt-[1.5%] mb-[5%] font-playfairDisplay text-3xl"
        >
          <h1 className="font-bold">Quote Placement</h1>
          <ul className="flex flex-row mt-[10%] space-x-8">
            <button
              className="hover:cursor-pointer hover:font-bold"
              onClick={() => setQuotePosition("pr-[50%]")}
            >
              Left
            </button>
            <div className="border-l border-black" />
            <button
              className="hover:cursor-pointer hover:font-bold"
              onClick={() => setQuotePosition("px-[25%]")}
            >
              Center
            </button>
            <div className="border-l border-black" />
            <button
              className="hover:cursor-pointer hover:font-bold"
              onClick={() => setQuotePosition("pl-[50%]")}
            >
              Right
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}
