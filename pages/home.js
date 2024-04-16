import React, { useEffect } from "react";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import ReleaseCard from "../components/small-components/ReleaseCard";
import Card from "../components/small-components/Card";
import ReactGA from "react-ga";

export async function getServerSideProps() {
  const popularResults = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/popular`,
  );
  const moviesResults = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anime-movies`,
  );
  const recentResults = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recent-release`,
  );

  const popular = await popularResults.json();
  const movies = await moviesResults.json();
  const recent = await recentResults.json();

  return {
    props: {
      popular,
      movies,
      recent,
    },
  };
}

const Home = ({ popular, movies, recent }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <>
      <Head>
        <title>Home - AnimeZia</title>
        <meta
          name="description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <meta property="og:title" content="Home - Munchyroll " />
        <meta
          property="og:description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <link rel="manifest" href="public/manifest.json" />
        <meta name="theme-color" content="#C4AD8A" />{" "}
        {/* Maybe change this to scan image and return main color */}
      </Head>
      <MainLayout useHead={false}>

        {recent && (
          <>
            <h1 className=" text-2xl font-bold">Recent Anime</h1>
            <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
              {recent &&
                recent.map((anime) => (
                  <ReleaseCard key={anime.animeId} data={anime} />
                ))}
            </div>
          </>
        )}
        <br></br>
        <br></br>
        <br></br>
        {popular && (
          <>
            <h1 className=" text-2xl font-bold">Popular Anime</h1>
            <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
              {popular &&
                popular.map((anime) => (
                  <Card key={anime.animeId} data={anime} />
                ))}
            </div>
          </>
        )}
        <br></br>
        <br></br>
        <br></br>
        {movies && (
          <>
            <h1 className=" text-2xl font-bold">Anime Movies</h1>
            <div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
              {movies &&
                movies.map((anime) => (
                  <Card key={anime.animeId} data={anime} />
                ))}
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
