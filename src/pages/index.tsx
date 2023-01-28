import type { NextPage } from "next";
import Head from "next/head";
import Arithmetic from "@/components/Arithmetic";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Arithmetic</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A fast-paced arithmetic drill." />
      </Head>
      <div className="h-screen flex flex-col items-center justify-start md:justify-center">
        <Arithmetic />
      </div>
    </div>
  );
};

export default Home;
