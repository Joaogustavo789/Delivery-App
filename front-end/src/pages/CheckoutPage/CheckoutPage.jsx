import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProductDetailsRow from '../../components/ProductDetailsRow';
/* import useProductsRowsMocks from '../../mocks/useProductsRowsMocks'; */
import addNewOrder from '../../services/addNewOrder';
import getAllUsers from '../../services/getAllUsers';

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState('0');
  const [allSellers, setAllSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);

  /*   const mockProducts = useProductsRowsMocks(); */
  const history = useHistory();

  function getProductsFromDeliveryCart() {
    const productsFromLocalStorage = JSON
      .parse(localStorage.getItem('cart'));

    const productsWithQuantity = productsFromLocalStorage
      .filter((product) => {
        if (product.quantity > 0) return product;
        return null;
      });
    setProducts(productsWithQuantity);
  }

  function getTotalPrice() {
    const total = products.map((product) => (
      product.quantity * Number(product.price)))
      .reduce((acc, cur) => cur + acc, 0);
    setTotalPrice(total
      .toFixed(2)
      .toString()
      .replace('.', ','));
  }

  useEffect(() => {
    getProductsFromDeliveryCart();
  }, []);

  useEffect(() => {
    if (products !== 0) { getTotalPrice(); }
  }, [products]);

  async function postNewOrder() {
    const productToBeAdded = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      sellerId,
      totalPrice: Number(totalPrice.replace(',', '.')).toFixed(2),
      deliveryAddress,
      deliveryNumber: Number(deliveryNumber),
      status: 'Pendente',
      products: JSON.parse(localStorage.getItem('cart')),
    };

    console.log('Product to be added:', productToBeAdded);

    const response = await addNewOrder(productToBeAdded);

    history.push(`/customer/orders/${response.data.message.id}`);
  }

  function handleOnClickSubmitOrder() {
    postNewOrder();
  }

  async function getAllSellers() {
    const { data } = await getAllUsers();
    const allUsers = data.message;
    const allSellersFound = allUsers
      .filter((user) => user.role === 'seller');

    setAllSellers(allSellersFound);
    console.log('all sellers here', allSellersFound);
  }

  useEffect(() => {
    getAllSellers();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <section data-testid="customer_checkout__element-order-total-price"> */}
      <Container className="d-flex flex-column gap-4">
        <div>
          <h3 className="mt-3">Finalizar pedido</h3>
          <h5 className="mt-3">Produtos</h5>
          <div className="d-flex flex-column gap-4">
            <Row className="d-flex flex-column gap-4">
              {
                products.map((product, index) => (
                  <ProductDetailsRow
                    key={ `${product.quantity}-${index}-${product}` }
                    product={ product }
                    index={ index }
                    hasRemoveBtn
                    pageName="checkout"
                    reRenderFunc={ () => getProductsFromDeliveryCart() }
                  />
                ))
              }
            </Row>
            <Row>
              <h5
                data-testid="customer_checkout__element-order-total-price "
                className="text-end text-decoration-underline text-success"
              >
                {'Total Price: '}
                {totalPrice }
                {' '}
              </h5>
            </Row>
          </div>

        </div>
        <div className="border p-4 d-flex flex-column">
          <h5>Detalhes e Endereço para Entrega</h5>
          <div className="d-flex p-2 gap-2">
            <select
              data-testid="customer_checkout__select-seller"
              name="select"
              value={ sellerId }
              onChange={ ({ target: { value } }) => setSellerId(value) }
              className="form-control"
            >
              <option value={ 0 } selected disabled>
                Selecione a pessoa vendedora
              </option>
              {allSellers.map((seller) => (
                <option key={ seller.id } value={ seller.id }>{ seller.name }</option>
              )) }
            </select>

            <input
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
              type="text"
              placeholder="Sua rua aqui, seu bairro aqui"
              className="form-control"
            />

            <input
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
              type="text"
              placeholder="número"
              className="form-control"
            />

          </div>
          <button
            data-testid="customer_checkout__button-submit-order"
            type="button"
            onClick={ handleOnClickSubmitOrder }
            className="btn btn-success mx-2"
          >
            Finalizar pedido
          </button>

        </div>
      </Container>
    </div>
  );
}
