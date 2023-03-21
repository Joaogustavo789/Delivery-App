import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { capitalizeFirstLetter } from '../../../utils/strings';

export default function ProductCard({ product, cart, setCart }) {
  const [quantity, setQuantity] = useState(0);
  const [priceFormatted, setPriceFormatted] = useState('');

  function editProductQuantity() {
    const storage = localStorage.getItem('cart');
    const parseStorage = JSON.parse(storage);

    if (parseStorage.length) {
      console.log('dentro', parseStorage.length);
      const storageCheck = parseStorage
        .filter((element) => element.name !== product.name);
      const updateState = [
        ...storageCheck,
        {
          name: product.name,
          quantity,
          price: product.price,
          id: product.id,
        }];
      return setCart(updateState);
    }

    const updateState = [
      ...cart,
      {
        name: product.name,
        quantity,
        price: product.price,
        id: product.id,
      }];
    return setCart(updateState);
  }

  function handleOnClickAddProduct() {
    setQuantity((prevState) => prevState + 1);
  }

  function handleOnClickRemoveProduct() {
    setQuantity(((prevState) => ((prevState - 1) < 0
      ? 0
      : prevState - 1)));
  }

  function formatProductPriceOnProduceChanges() {
    if (!product) return;

    const productPriceFormatted = product.price.toString().replace('.', ',');
    setPriceFormatted(productPriceFormatted);
  }

  useEffect(() => {
    formatProductPriceOnProduceChanges();
  }, [product]);

  useEffect(() => {
    editProductQuantity();
  }, [quantity]);

  useEffect(() => {
    setCart([]);
  }, []);

  return (
    <div
      className="d-flex
          justify-content
          flex-wrap
          border border-light-subtle
          container-card
          cardDimension"
    >
      <section
        className="d-flex
          justify-content-center
          flex-wrap
          w-100
          h-100"
      >
        <div
          className="
        d-flex
        justify-content-start
        h-25 w-100"
        >
          <p
            className="d-flex
          justify-content-start
          text-black
          font-Roboto
          fs-5 fw-bold
          h-25
          py-2
          px-3"
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            R$
            {' '}
            {priceFormatted}
          </p>
        </div>
        <img
          className="d-flex
          justify-content-center
          img"
          src={ product.urlImage }
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          alt={ `${capitalizeFirstLetter(product.name)} illustration.` }
        />
      </section>

      <section
        className="d-flex
        justify-content-center
        flex-wrap
        infCard
        align-self-center
        "
      >
        <p
          className="d-flex
            justify-content-center
            flex-nowrap
            nameProducts
            w-100"
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          { product.name }
        </p>

        <div
          className="d-flex
        justify-content-center
        flex-nowrap
        inputQuantity
        "
        >
          <button
            className="btnAddOrRemove
            rounded-start
            text-white"
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ handleOnClickAddProduct }
          >
            +
          </button>

          <input
            className="inputQuantityNumber"
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            value={ quantity }
            onChange={ ({ target: { value } }) => {
              setQuantity(Number(value));
              product.quantity = Number(quantity);
            } }
          />

          <button
            className="btnAddOrRemove
            rounded-end
            text-white"
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            type="button"
            onClick={ handleOnClickRemoveProduct }
          >
            -
          </button>
        </div>
      </section>
    </div>

  );
}

ProductCard.propTypes = {
  cart: PropTypes.arrayOf(Object).isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    productId: PropTypes.number,
    quantity: PropTypes.number,
    urlImage: PropTypes.string,
  }).isRequired,
  setCart: PropTypes.func.isRequired,
};
