import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import getAllProductsService from '../../services/getAllProductsService';
import ProductCard from './components/ProductCard';
import './Products.css';

export default function ProductsPage() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  function getTotalPrice() {
    const values = Object.values(cart);
    const total = values
      .reduce((acc, cur) => ((cur.quantity * Number(cur.price)) + acc), 0);
    setTotalPrice(total);
    if (total > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    async function getAllProducts() {
      const response = await getAllProductsService();
      setProducts(response.data.message);
    }

    getAllProducts();

    const verifyCart = JSON.parse(localStorage.getItem('cart'));
    if (!verifyCart) localStorage.setItem('cart', '[]');
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    getTotalPrice();
  }, [cart]);

  return (
    <div>
      <Navbar />
      <section
        className="d-flex
        flex-wrap
        w-100
      "
      >

        <button
          className="btn-viwe-cart
          btnPosition
          fs-4
          "
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ isDisabled }
        >
          <span> Ver Carrinho: R$ </span>
          <span data-testid="customer_products__checkout-bottom-value">
            {' '}
            {totalPrice.toLocaleString('pt-br', {
              style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2,
            })}
            {' '}
          </span>
        </button>
        <div
          className="d-flex
        flex-wrap
        gap-4
        justify-content-center
        container-card-products
        h-50 w-100
        "
        >
          {
            products.map((product) => (
              <ProductCard
                key={ product.id }
                product={ product }
                cart={ cart }
                setCart={ setCart }
              />))
          }
        </div>
      </section>
    </div>
  );
}
