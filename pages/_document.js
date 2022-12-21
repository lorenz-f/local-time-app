import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />{" "}
        {/* watch if setting cross origin affects anything */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body
        id={`sm:bodystyle`}        
        className="bg-[url(/horizon.jpg)] sm:bg-gradient-to-t sm:from-[#312E81] sm:to-[#FFB6C1] sm:overflow-x-hidden sm:overflow-y-hidden h-screen w-screen bg-cover bg-no-repeat font-montserrat overflow-hidden m-0 transition-all duration-300 ease-in"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/* 

<body className = "bg-[url(/horizon.jpg)] h-[100vh] w-[100vw] bg-cover bg-no-repeat font-montserrat overflow-hidden m-0 transition-all duration-300 ease-in">
        <Main />
        <NextScript />
      </body>

*/
