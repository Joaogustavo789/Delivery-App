import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Col } from 'reactstrap';
import '../CustomerPage.css';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  const history = useHistory();

  return (
    <Col xs="12" md="5">
      <div
        role="button"
        tabIndex={ 0 }
        onKeyDown={ () => history.push(`/customer/orders/${id}`) }
        onClick={ () => history.push(`/customer/orders/${id}`) }
        className="orderCard shadow-sm p-3 d-flex border rounded
        justify-content-around align-items-center"
      >
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          Pedido:
          {' '}
          { id }
        </span>
        <span
          data-testid={ `customer_orders__element-delivery-status-${id}` }
          className={ `${status === 'Em Trânsito' ? 'EmTransito' : status}
          p-3 rounded fw-bold` }
        >
          { status }

        </span>
        <div className="d-flex flex-column gap-1">
          <span data-testid={ `customer_orders__element-order-date-${id}` }>
            { new Date(saleDate).toLocaleDateString('pt-br') }
          </span>
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            R$
            { totalPrice.replace('.', ',') }
          </span>
        </div>
      </div>
    </Col>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};
