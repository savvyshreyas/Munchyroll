import { useState, useEffect } from "react";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children, useHead = true }) {
  const [hour, setHour] = useState();

  useEffect(() => {
    const time = new Date();
    setHour(time.getHours());
  });

  var backgroundClass;

  // Define the time ranges for day and night
  const dawn = "06"; // 6 AM
  const noon = "12"; // 12 PM
  const dusk = "16"; // 4 PM
  const night = "20"; // 8 PM

  if (hour >= dawn && hour < noon) {
    backgroundClass = "from-[#CF9E57] to-[#19547B]";
  } else if (hour >= noon && hour < dusk) {
    backgroundClass = "from-[#507b98] to-[#003973]";
  } else if (hour >= dusk && hour < night) {
    backgroundClass = "from-[#7b3737] to-[#2C3E50]";
  } else {
    backgroundClass = "from-[#141E30] to-[#243B55]";
  }

  return (
    <div className={`bg-gradient-to-t ${backgroundClass}`}>
      {useHead && (
        <Head>
          <title>Munchyroll</title>
          <meta name="title" content="AnimeZia" />
          <meta
            name="description"
            content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
          <meta
            property="og:title"
            content="Munchyroll"
          />
          <meta
            property="og:description"
            content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_URL} />
          <meta
            property="twitter:title"
            content="Munchyroll"
          />
          <meta
            property="twitter:description"
            content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
          />
          <meta name="theme-color" content="#C4AD8A" />
        </Head>
      )}
      <Header />
      <div className=" flex ">
        <div className="  z-10 w-full   px-5 sm:px-10 min-h-[90vh] mt-10 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
