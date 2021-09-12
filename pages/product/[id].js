import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import Typography from "@material-ui/core/Typography";
import ReactHtmlParser from "react-html-parser";
import Bread_Crumbs from "../../components/Bread_Crumb";
import DetailsIcon from "@material-ui/icons/Details";

import ProductItem from "../../components/product/ProductItem";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [product_other] = useState(props.product_other);

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  return (
    <div className="detail_page">
      <Head>
        <title>{product.title}</title>
      </Head>
      <Bread_Crumbs title={product.title} />
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <div className="row">
            <div className="col-md-5">
              <img
                src={product.images[0].url}
                alt="Ảnh sản phẩm"
                style={{ maxWidth: "100%" }}
              />
              {/* <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img.url} alt="Ảnh sản phẩm" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img.url} alt={product.title} />
                  </SwiperSlide>
                ))}
              </Swiper> */}
            </div>
            <div className="col-md-7 mt-1 pl-4 pl-sm-0">
              <h1 className="text-capitalize fs-largest title-product">
                {product.title}
              </h1>
              <div className="my-2">{ReactHtmlParser(product.description)}</div>
              <h5 className="text-danger">
                <div className="price">
                  {product.price_sale > 0 &&
                    product.price_sale < product.price && (
                      <span
                        className="d-block font-bold"
                        style={{ fontSize: "30px" }}
                      >
                        {product.price_sale.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    )}
                  <span
                    className={`${
                      product.price_sale > 0 &&
                      product.price_sale < product.price
                        ? "text-muted text-decoration fs-large"
                        : "text-danger fs-largest font-bold"
                    }  d-block`}
                  >
                    {product.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </h5>

              {/* <div className="row mx-0 d-flex justify-content-between">
                {product.inStock > 0 ? (
                  <h6 className="">Còn lại: {product.inStock}</h6>
                ) : (
                  <h6 className="">Hết hàng</h6>
                )}
              </div> */}

              <button
                type="button"
                className="btn btn-danger d-block mt-3 px-5 py-2 w-100"
                onClick={() => dispatch(addToCart(product, cart))}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12">
          <div className="card">
            <div className="card-body">
              <h6
                className="card-subtitle fs-medium text-success font-bold mb-2 pb-2"
                style={{ borderBottom: "1px dotted #ddd" }}
              >
                Sản phẩm được miễn phí giao hàng
              </h6>
              <div className="card-text">
                <span className="font-bold pt-2">Chính sách bán hàng</span>
                <ul className="list-none px-3" style={{ listStyle: "circle" }}>
                  <li className="py-2">Cam kết hàng chính hãng 100%</li>
                  <li className="py-2">Đổi trả trong vòng 10 ngày</li>
                  <li className="py-2">
                    Các khách hàng có địa chỉ tại NGHỆ AN trở vào PHÍA NAM sẽ
                    TẠM NGƯNG giao hàng từ ngày 20/08 đến khi dịch bệnh được
                    kiểm soát. Các khách hàng có địa chỉ tại THANH HÓA trở ra
                    PHÍA BẮC, hoạt động giao nhận sẽ diễn ra nhưng việc giao
                    hàng sẽ chậm hơn dự kiến 3-5 ngày
                  </li>
                  <li className="py-2">
                    Miễn phí giao hàng cho đơn hàng từ 800K
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content my-5">
        <Typography variant="h6" color="initial" className="font-bold mb-2">
          <DetailsIcon /> Mô tả sản phẩm
        </Typography>
        <div className="card">
          <div className="card-body">{ReactHtmlParser(product.content)}</div>
        </div>
      </div>
      {product_other && (
        <div className="other_product">
          <div className="product-category">
            <div className="title-category d-flex justify-content-between align-items-center">
              <div className="title fs-largest">Sản phẩm khác</div>
            </div>
            <div className="products py-3">
              {product_other.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await getData(`products`);
  const paths = res.product.map((item) => ({
    params: { id: item._id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const res = await getData(`product/${id}`);
  // server side rendering
  return {
    props: { product: res.product, product_other: res.product_other }, // will be passed to the page component as props
  };
};

export default DetailProduct;
