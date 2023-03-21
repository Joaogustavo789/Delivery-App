import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProductDetailsRowOrder from '../../components/ProductDetailsRowOrder';
import getAllUsers from '../../services/getAllUsers';
import getSaleProducts from '../../services/getSaleProducts';
import updateOrderStatus from '../../services/updateOrderStatus';
import './CustomerOrderDetailsPage.css';

export default function CustomerOrderDetailsPage() {
  // const orders = useProductsRowsMocks();
  const [products, setProducts] = useState([]);
  const [sellerName, setSellerName] = useState([]);
  const [saleStatus, setSaleStatus] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getSale() {
      const allUsers = await getAllUsers();
      const saleProductsResult = await getSaleProducts(id);
      const sales = saleProductsResult.data.message;
      if (sales.length > 0) {
        const { status } = sales[0].sales;
        setSaleStatus(status);
        const { sellerId } = sales[0].sales;
        const userName = allUsers.data.message.find((user) => user.id === sellerId).name;
        setSellerName(userName);
        setProducts(sales);
      }
    }
    getSale();
  }, []);

  async function handleClick() {
    await updateOrderStatus(id, 'Entregue');
    setSaleStatus('Entregue');
  }

  function getTotalPrice() {
    if (products.length > 0) {
      const totalPrice = products.reduce((acc, cur) => (
        acc + (Number(cur.quantity) * Number(cur.products.price))
      ), 0);
      return totalPrice.toFixed(2).toString().replace('.', ',');
    }
  }

  return (
    <div>
      <Navbar />
      <div className="customer-order-container">
        <h3 className="order-title">Detalhes do pedido</h3>
        <div className="order-details">
          <div className="order-description py-3">
            <span>{`Pedido ${id} `}</span>
            <span>{`Vendedor(a) ${sellerName} `}</span>
            <span>
              { products.length > 0
            && new Date(products[0].sales.saleDate).toLocaleDateString('pt-br')}
            </span>
            <span>{`Status do pedido: ${saleStatus} `}</span>
            <button
              type="button"
              onClick={ handleClick }
              disabled={ saleStatus !== 'Em Trânsito' }
              className="btn btn-secondary"
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>
          <div>
            {products.map((order, index) => (
              <ProductDetailsRowOrder
                key={ order.products.id }
                product={ order.products }
                quantity={ order.quantity }
                index={ index }
                pageName="order_details"
              />
            ))}
          </div>
          <div className="total-price-div">
            <div className="total-price">
              <span>Total: &nbsp;</span>
              <span>
                { getTotalPrice() }
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
