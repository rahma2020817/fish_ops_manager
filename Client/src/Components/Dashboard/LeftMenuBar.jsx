import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function LeftMenuBar() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("DIANNEL SOFTWARE");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % title.length);
    }, 400); // Adjust the interval to control the speed of animation (milliseconds)

    return () => clearInterval(interval);
  }, [title]);


  return (
    <div className="flex flex-col">
      <div>
        <br></br>
        <img
          className="m-auto"
          width={100}
          src="src/assets/icons/logo1.webp"
        />
      </div>
      <div className="w-full bg-white flex items-center justify-center">
        <h2 className="text-4xl text-center font-bold">
          {title.substr(0, currentIndex + 1)}
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center mt-14 bg-blue-200">
        <div className="m-auto w-full  flex-col  flex  items-center justify-center bg-white">
          {/* HOME */}
          <div className=" w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-8 mb-2 flex items-center">
            <div className="w-1/5">
              <svg
                className="m-auto"
                width="33"
                height="31"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 16.1948V13.3409M8.371 1.78253L2.7115 5.77801C1.7665 6.44392 1 7.86136 1 8.93633V15.9855C1 18.1925 2.9845 20 5.4205 20H17.5795C20.0155 20 22 18.1925 22 15.995V9.06952C22 7.91844 21.1495 6.44392 20.11 5.78752L13.621 1.66837C12.151 0.736093 9.7885 0.783659 8.371 1.78253Z"
                  //Chane stroke value to make a change in color
                  stroke="#0162B2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
            </div>
            <Link to={"/home"}>
              <div className="inline ml-2 mt-1">
                <button className="inline navMenuFont">Home</button>
              </div>
            </Link>
          </div>

          {/* Fridge*/}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-10 mb-2 flex items-center">
            {" "}
            <div className="w-1/6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="64" x2="128" y2="192" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><polyline points="104 40 128 64 152 40" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><polyline points="104 216 128 192 152 216" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><line x1="72.6" y1="96" x2="183.4" y2="160" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><polyline points="39.8 104.8 72.6 96 63.8 63.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><polyline points="192.2 192.8 183.4 160 216.2 151.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><line x1="72.6" y1="160" x2="183.4" y2="96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><polyline points="63.8 192.8 72.6 160 39.8 151.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><polyline points="216.2 104.8 183.4 96 192.2 63.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /></svg>             </div>
            <Link to={"/fridge"}>
              <div className="inline ml-4 mt-1">
                <button className="inline navMenuFont">Fridge</button>
              </div>
            </Link>
          </div>

          {/* Recipes */}

          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-8 mb-2 flex items-center">
            <div className="w-1/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="m-auto bi bi-receipt-cutoff" width="26" height="32" fill="currentColor" viewBox="0 0 16 16"> <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zM11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" /> <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293 2.354.646zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118l.137-.274z" /> </svg>
            </div>
            <Link to={"/createrecipe"}>
              <div className="inline  ml-3 mt-1 ">
                <button className="inline navMenuFont">Recipes</button>
              </div>
            </Link>
          </div>

          {/* FORUM */}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-8 mb-2 flex items-center">
            {" "}
            <div className="w-1/5">
              <svg
                className="m-auto"
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.1172 3.36515C18.1066 3.36515 19.7064 4.82076 19.7064 6.61014C19.7064 8.36244 18.1681 9.79024 16.2505 9.85514C16.1619 9.84586 16.0724 9.84586 15.9839 9.85514M18.0964 18.1994C18.8347 18.0603 19.532 17.7915 20.1063 17.3928C21.706 16.308 21.706 14.5187 20.1063 13.4339C19.5423 13.0445 18.8552 12.7849 18.1271 12.6366M8.68247 9.73461C8.57993 9.72534 8.45687 9.72534 8.34407 9.73461C7.16703 9.69848 6.05176 9.24956 5.23444 8.48293C4.41712 7.7163 3.96194 6.69215 3.96528 5.62737C3.96528 3.35587 5.99572 1.51086 8.5184 1.51086C9.7246 1.49119 10.89 1.90554 11.7583 2.66276C12.6266 3.41997 13.1267 4.45803 13.1484 5.54856C13.1702 6.6391 12.7119 7.69279 11.8744 8.47782C11.0368 9.26286 9.88867 9.71494 8.68247 9.73461ZM3.55509 13.1558C1.07343 14.6577 1.07343 17.1054 3.55509 18.5981C6.37515 20.304 11.0001 20.304 13.8201 18.5981C16.3018 17.0961 16.3018 14.6485 13.8201 13.1558C11.0103 11.4591 6.3854 11.4591 3.55509 13.1558V13.1558Z"
                  stroke="#333232"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Link to={"/forum"}>
              <div className="inline ml-2 mt-1">
                <button className="inline navMenuFont">Forum</button>
              </div>
            </Link>
          </div>

          {/* Map*/}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-12 mb-2 flex items-center">
            {" "}
            <div className="w-9">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="116" cy="116" r="84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /></svg>             </div>
            <Link to={"/map"}>
              <div className="inline ml-3 mt-1">
                <button className="inline navMenuFont">Maps</button>
              </div>
            </Link>
          </div>


          {/* SHOP */}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-12 mb-2 flex items-center">
            <div className="w-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><circle cx="80" cy="204" r="20" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><circle cx="184" cy="204" r="20" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /><path d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" /></svg>              </div>
            <Link to={"/Shop"}>
              <div className="inline ml-3 mt-1">
                <button className="inline navMenuFont">SHOP</button>
              </div>
            </Link>
          </div>

          {/* Newsletter */}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-10 mb-2 flex items-center">
            <div className="w-1/5">
              <svg width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01" /><path d="M21 44L20 36" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M44 44V12H25L26 20L27 28L28 36L21 44H44Z" fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M27 28H35" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M26 20H35" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M4 4H24L25 12L26 20L27 28L28 36H20H4V4Z" fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12H17" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 20H18" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 28H19" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
            <Link to={"/News"}>
              <div className="inline ml- mt-1">
                <button className="inline navMenuFont">Newsletter</button>
              </div>
            </Link>
          </div>

          {/* Unit conversion */}

          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-10 mb-2 flex items-center">
            <div className="w-1/5">
              <svg width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01" /><path d="M16 22L10 12L4 22" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M10 28C13.3137 28 16 25.3137 16 22H4C4 25.3137 6.68629 28 10 28Z" fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M44 22L38 12L32 22" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M38 28C41.3137 28 44 25.3137 44 22H32C32 25.3137 34.6863 28 38 28Z" fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 6V42" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12H24H38" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12H24H38" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /><path d="M38 42H24H10" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
            <Link to={"/unitconversion"}>
              <div className="inline ml-1 mt-1">
                <button className="inline navMenuFont">Conversion</button>
              </div>
            </Link>
          </div>

          {/* BMI */}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-10 mb-2 flex items-center">
            <div className="w-1/5">
              <svg width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillpacity="0.01" /><path d="M35 25C27.89 22.42 20.11 22.42 13 25L12 14C19 11 29 11 36 14L35 25Z" fill="none" stroke="#333" strokeWidth="1" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 23L21 18" stroke="#333" strokeWidth="1" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M42 39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39L6 9C6 7.34315 7.34315 6 9 6H39C40.6569 6 42 7.34315 42 9V39Z" stroke="#333" strokeWidth="1" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M29 23.4553C25.6869 22.9349 22.3131 22.9349 19 23.4553" stroke="#333" strokeWidth="1" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <Link to={"/Bmi"}>
              <div className="inline ml-2 mt-1">
                <button className="inline navMenuFont">BMI</button>
              </div>
            </Link>
          </div>

          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-8 mb-2 flex items-center">
            <div className="w-1/5">
              <svg
                className="m-auto"
                width="26"
                height="32"
                viewBox="0 0 26 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.8571 1H6.14286M19.8571 31H6.14286M7 26.5H19C22.9943 26.5 25 24.745 25 21.25V10.75C25 7.255 22.9943 5.5 19 5.5H7C3.00571 5.5 1 7.255 1 10.75V21.25C1 24.745 3.00571 26.5 7 26.5Z"
                  stroke="#333232"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 19V13M18.1429 19V16M7.85718 19V17.5"
                  stroke="#333232"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Link to={"/report"}>
              <div className="inline ml-2 mt-1">
                <button className="inline navMenuFont">Reports</button>
              </div>
            </Link>
          </div>

          {/* SETTINGS */}
          <div className="w-full bg-white hover:bg-blue-100 transition-all duration-[850ms] hover:rounded-lg ease-out py-2  ml-8 mb-2 flex items-center">
            <div className="w-1/5">
              <svg
                className="m-auto"
                width="28"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.35474 14.2072V12.0512C1.35474 10.7772 2.41405 9.72371 3.72261 9.72371C5.97833 9.72371 6.90056 8.15573 5.76647 6.23251C5.11842 5.13002 5.50475 3.69679 6.63884 3.0598L8.79486 1.84707C9.7794 1.27132 11.0506 1.61432 11.6363 2.58206L11.7734 2.8148C12.895 4.73803 14.7395 4.73803 15.8736 2.8148L16.0107 2.58206C16.5964 1.61432 17.8676 1.27132 18.8521 1.84707L21.0081 3.0598C22.1422 3.69679 22.5286 5.13002 21.8805 6.23251C20.7464 8.15573 21.6686 9.72371 23.9244 9.72371C25.2205 9.72371 26.2922 10.7649 26.2922 12.0512V14.2072C26.2922 15.4811 25.2329 16.5346 23.9244 16.5346C21.6686 16.5346 20.7464 18.1026 21.8805 20.0258C22.5286 21.1406 22.1422 22.5615 21.0081 23.1985L18.8521 24.4113C17.8676 24.987 16.5964 24.644 16.0107 23.6763L15.8736 23.4435C14.7519 21.5203 12.9075 21.5203 11.7734 23.4435L11.6363 23.6763C11.0506 24.644 9.7794 24.987 8.79486 24.4113L6.63884 23.1985C6.0956 22.8911 5.69865 22.3843 5.5351 21.7895C5.37154 21.1947 5.45475 20.5604 5.76647 20.0258C6.90056 18.1026 5.97833 16.5346 3.72261 16.5346C2.41405 16.5346 1.35474 15.4811 1.35474 14.2072V14.2072Z"
                  stroke="#333232"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Link to={"/settings"}>
              <div className="inline ml-2 mt-1">
                <button className="inline navMenuFont">Settings</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenuBar;
