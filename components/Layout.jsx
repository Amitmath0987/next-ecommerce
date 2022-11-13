import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="layout">
      <Head>
        <title>
          {`ASM Headphones ${
            router?.query?.slug ? `| ${router?.query?.slug}` : ""
          }`}
        </title>
        <meta
          name="description"
          content="Checkout our cool trendy headphones,earphones,watches and many more..."
          key="desc"
        />
        <meta property="og:title" content="ASM Headphones" />
        <meta
          property="og:description"
          content="Get the best class earphones and headphones at your dorstep."
        />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/h9g666ls/production/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
