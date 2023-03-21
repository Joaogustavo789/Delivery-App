import PropTypes from 'prop-types';
import { useState } from 'react';
import { Col } from 'react-bootstrap';

export default function ProductDetailsRow({
  product,
  index,
  hasRemoveBtn,
  // pageName,
  reRenderFunc }) {
  const [, setShouldRender] = useState(true);

  function handleOnClickRemoveProduct() {
    const deliveryCart = JSON.parse(localStorage.getItem('cart'));
    const newDelivertCart = deliveryCart.filter((p) => {
      if (p.name === product.name) return;
      return p;
    });

    localStorage
      .setItem('cart', JSON.stringify(newDelivertCart));

    setShouldRender(deliveryCart);
    reRenderFunc();
  }

  // customer_checkout__element-order-table-item-number

  // return product[1].quantity > 0 && shouldRender && (
  return product.quantity > 0 && (
    <Col
      className="d-flex gap-4 justify-content-between
    px-5 py-2 mx-2 border item_checkout align-items-center"
    >
      <div
        data-testid={
          `customer_checkout__element-order-table-item-number-${index}`
        }
      >
        {index + 1}
      </div>

      <div
        data-testid={
          `customer_checkout__element-order-table-name-<index>-${index}`
        }
      >
        {product.name}
      </div>

      <div
        data-testid={
          `customer_checkout__element-order-table-quantity-${index}`
        }
      >
        {'Quantidade: '}
        {product.quantity}
      </div>

      <div
        data-testid={
          `customer_checkout__element-order-table-unit-price-${index}`
        }
      >
        {'Preço un. R$ '}
        {((product.price)).toString().replace('.', ',')}
      </div>

      <div
        data-testid={
          `customer_checkout__element-order-table-sub-total-${index}`
        }
      >
        Total:
        {' R$ '}
        {(Number(product.price.replace(',', '.')) * Number(product.quantity))
          .toFixed(2).toString().replace('.', ',')}
      </div>
      {
        hasRemoveBtn && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={ handleOnClickRemoveProduct }
            data-testid={
              `customer_checkout__element-order-table-remove-${index}`
            }
          >
            Remover
          </button>
        )
      }
    </Col>
  );
}
// referencia PropTypes https://stackoverflow.com/questions/41771217/react-linter-airbnb-proptypes-array
ProductDetailsRow.propTypes = {
  product: PropTypes.arrayOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  hasRemoveBtn: PropTypes.bool.isRequired,
  // pageName: PropTypes.string.isRequired,
  reRenderFunc: PropTypes.func.isRequired,
};
