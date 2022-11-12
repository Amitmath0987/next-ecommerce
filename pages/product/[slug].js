import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import { useStateContext } from "../../context/StateContext";
const ProductDetail = ({ products, product }) => {
  const { image, name, details, price } = product;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { qty, incQty, decQty, addProductToCart } = useStateContext();
  return (
    <div>
      <div className="product-detail-container">
        {/* product carousel left side */}
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[carouselIndex])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={`small-image ${
                  i === carouselIndex ? "selected-image" : ""
                }`}
                onMouseEnter={() => setCarouselIndex(i)}
              />
            ))}
          </div>
        </div>
        {/* product detail right side */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {[1, 2, 3, 4].map((_, i) => (
                <AiFillStar key={i} />
              ))}
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {/* add to cart and buy now */}
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addProductToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
        {/* end of right side */}
      </div>
      <div className="maylike-products-wrapper">
        <h2>you may like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
        current
    }
}`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product_query = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(product_query);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return { props: { products, product } };
};
export default ProductDetail;
