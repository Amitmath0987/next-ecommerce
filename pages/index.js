import { client } from "../lib/client";
import Head from "next/head";
import { FooterBanner, HeroBanner, Product } from "../components";
import { useRouter } from "next/router";
function Home({ productData, bannerData }) {
  return (
    <div>
      <HeroBanner bannerData={bannerData?.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {productData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const product_query = '*[_type == "product"]';
  const productData = await client.fetch(product_query);
  const banner_query = '*[_type == "banner"]';
  const bannerData = await client.fetch(banner_query);
  return { props: { productData, bannerData } };
};
export default Home;
