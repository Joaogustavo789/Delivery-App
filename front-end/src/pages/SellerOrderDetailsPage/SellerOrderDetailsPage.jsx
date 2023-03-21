import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import NavbarsSeller from '../../components/NavbarSeller';
import getOneSaleDetails from '../../services/getOneSaleDetails';
import getSaleProducts from '../../services/getSaleProducts';
import updateOrderStatus from '../../services/updateOrderStatus';
import SaleProductsTable from './components/SaleProductsTable';
import './SellerDetails.css';

const PREPARANDO = 'Preparando';
const PENDENTE = 'Pendente';
const EMTRANSITO = 'Em Trânsito';
const ENTREGUE = 'Entregue';

export default function SellerOrderDetailsPage() {
  const [sale, setSale] = useState({});
  const [saleProducts, setSaleProducts] = useState([]);
  const [id, setId] = useState({});
  const [orderStatus, setOrderStatus] = useState(PENDENTE);

  useEffect(() => {
    const urlArray = (window.location.href).split('/');
    const saleId = urlArray[urlArray.length - 1];
    setId(saleId);
    async function getSale() {
      const saleResult = await getOneSaleDetails(saleId);
      const saleProductsResult = await getSaleProducts(saleId);
      setSale(saleResult.data.message);
      setSaleProducts(saleProductsResult.data.message);
    }
    getSale();
    console.log(orderStatus);
  }, [orderStatus]);

  useEffect(() => {
    setOrderStatus(sale.status);
  }, [sale]);

  const prepareOrder = async () => {
    await updateOrderStatus(id, PREPARANDO);
    setOrderStatus(PREPARANDO);
  };

  const deliveryOrder = async () => {
    await updateOrderStatus(id, EMTRANSITO);
    setOrderStatus(EMTRANSITO);
  };

  return (
    <div>
      <NavbarsSeller />
      <Container className="d-flex flex-column gap-2 mt-4">
        <Row>
          <h3>Detalhes do Pedido</h3>
        </Row>

        <Row className="d-flex align-items-center border py-3 gap-2">
          <Col className="d-flex gap-4">
            <div
              data-testid="seller_order_details__element-order-details-label-order-id"
              className="d-flex align-items-center"
            >
              Pedido
              {' '}
              {sale.id}
            </div>
            <div
              data-testid="seller_order_details__element-order-details-label-order-date"
              className="d-flex align-items-center"
            >
              {new Date(sale.saleDate).toLocaleDateString('pt-br')}
            </div>
            <div
              data-testid="seller_order_details__element-order-details-label-delivery-status"
              className={ `${orderStatus === 'Em Trânsito' ? 'EmTransito' : orderStatus}
              py-1 px-2 rounded fw-bold` }
            >
              {orderStatus}
            </div>
          </Col>
          <Col className="d-flex justify-content-end gap-2">
            <button
              type="button"
              onClick={ prepareOrder }
              data-testid="seller_order_details__button-preparing-check"
              disabled={ orderStatus === PREPARANDO || orderStatus === ENTREGUE }
              className="btn btn-secondary"
            >
              PREPARAR PEDIDO
            </button>
            <button
              type="button"
              onClick={ deliveryOrder }
              data-testid="seller_order_details__button-dispatch-check"
              disabled={
                orderStatus !== PREPARANDO
              || orderStatus === EMTRANSITO
              || orderStatus === ENTREGUE
              }
              className="btn btn-success"
            >
              SAIU PARA ENTREGA
            </button>
          </Col>
        </Row>

        <Row>
          <SaleProductsTable saleProducts={ saleProducts } />
        </Row>

        <Row className="border py-2">
          <div>
            Endereço para entrega:
            {' '}
            {sale.deliveryAddress}
            ,
            {sale.deliveryNumber}
          </div>
        </Row>
        <Row
          data-testid="seller_order_details__element-order-total-price"
        >
          <Col
            xs={ { size: 10, offset: 1 } }
            sm={ { size: 6, offset: 2 } }
            className="seller_totalPrice py-2 px-3 rounded border text-white fs-4"
          >
            Preço Total:
            {' R$'}
            {String(sale.totalPrice).replace('.', ',')}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
