import PropTypes from 'prop-types';

export default function ProductDetailsRowOrder({
  product,
  quantity,
  index }) {
  return (
    <div className="row-order">
      <div className="order-number">
        {index + 1}
      </div>
      <div className="order-product">
        {product.name}
      </div>
      <div className="order-quantity">
        {quantity}
      </div>
      <div className="unit-price">
        {((product.price)).toString().replace('.', ',')}
      </div>
      <div className="product-total-price">
        {(Number(product.price.replace(',', '.')) * Number(quantity)).toFixed(2)
          .toString().replace('.', ',')}
      </div>
    </div>
  );
}
// referencia PropTypes https://stackoverflow.com/questions/41771217/react-linter-airbnb-proptypes-array
ProductDetailsRowOrder.propTypes = {
  product: PropTypes.arrayOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
