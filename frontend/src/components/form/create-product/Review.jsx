import PropTypes from "prop-types";
import moment from 'moment'
export const ReviewList = ({ title, reviews }) => {
  return (
    <div className=" flex flex-col gap-5  mt-5 w-[90%] m-auto">
      <h4 className="text-[1.20rem] font-bold">{title}</h4>
      <ul className=" flex flex-col gap-3 capitalize">
        {reviews.map((review, index) => (
          <li
            key={index}
            className={`text-gray-400 font-semibold flex justify-between items-center `}
          >
            {review.name}{" "}
            <span className=" font-medium text-black">
              {review.value}
            </span>
          </li>
        ))}
      </ul>
      {!title.includes("Order") && (
        <div className="border-b-2 border-gray-400 pb-5 w-[90%] m-auto"></div>
      )}
    </div>
  );
};

ReviewList.propTypes = {
  title: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const Review = ({
  product_name,
  desc,
  qty,
  metrics,
  color,
  type,
  date,
  expiration_date,
  lot_no,
  pricing_model,
  price,
  currency,
  invoice_no,
  receiver,
  done_by,
}) => {

  const OrderInformationData = [
    {
      name: "Invoice No.",
      value: invoice_no,
    },
    {
      name: "Delivered By",
      value: receiver,
    },
    {
      name: "Done By",
      value: done_by,
    },
  ];
  const PricingInformationData = [
    {
      name: "Pricing Model",
      value: pricing_model,
    },
    {
      name: "Price",
      value: price,
    },
    {
      name: "Currency",
      value: currency,
    },
  ];
  const ProductInformationData = [
    {
      name: "Product Name",
      value: product_name,
    },
    {
      name: "Description",
      value: desc,
    },
    {
      name: "Quantity",
      value: qty,
    },
    {
      name: "Category",
      value: metrics,
    },
    {
      name: "Type",
      value: type,
    },
    {
      name: "Color",
      value: color,
    },
    {
      name: "Arrival Date",
      value: moment(date).format('ddd MMM DD YYYY'),
    },
    {
      name: "Expiration Date",
      value:  `${moment(expiration_date).format('ddd MMM DD YYYY')} - ${moment(expiration_date).fromNow()}`,
    },
    {
      name: "Lot No.",
      value: lot_no,
    },
  ];

  return (
    <div className=" flex flex-col gap-8 mt-5">
      <ReviewList
        title="Product Information"
        reviews={ProductInformationData}
      />
      <ReviewList
        title="Pricing Information"
        reviews={PricingInformationData}
      />
      <ReviewList 
        title="Order Information" 
        reviews={OrderInformationData} 
      />
    </div>
  );
};

Review.propTypes = {
  product_name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  metrics: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  expiration_date: PropTypes.string.isRequired,
  lot_no: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  pricing_model: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  invoice_no: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
  done_by: PropTypes.string.isRequired,
};
