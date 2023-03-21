import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Col } from 'reactstrap';

export default function SaleCard({ sale }) {
  const history = useHistory();
  const { id } = sale;

  const directToDetails = () => {
    history.push(`/seller/orders/${id}`);
  };

  return (
    <Col xs="12" lg="5">
      <div
        onClick={ directToDetails }
        // referencia JSX ESLint
        onKeyDown={ () => {} }
        role="button"
        tabIndex={ 0 }
        className="orderCard shadow-sm p-3 d-flex border rounded
        align-items-center justify-content-around"
      >
        <div
          data-testid={ `seller_orders__element-order-id-${id}` }
          className="fw-bold text-center p-4 ps-2"
        >
          Pedido:
          {' '}
          {sale.id}
        </div>

        <div className="d-flex flex-column gap-2 flex-grow-1">
          <div className="d-flex gap-3">
            <div
              data-testid={ `seller_orders__element-delivery-status-${id}` }
              className={ `${sale.status === 'Em Trânsito' ? 'EmTransito' : sale.status}
                  p-3 rounded fw-bold flex-grow-1 text-center` }
            >
              {sale.status}
            </div>

            <div className="d-flex flex-column justify-content-center">
              <div data-testid={ `seller_orders__element-order-date-${id}` }>
                {new Date(sale.saleDate).toLocaleDateString('pt-br')}
              </div>
              <div data-testid={ `seller_orders__element-card-price-${id}` }>
                R$
                {' '}
                {sale.totalPrice.replace('.', ',')}
              </div>
            </div>
          </div>

          <div
            data-testid={ `seller_orders__element-card-address-${id}` }
            className="py-1 px-3 border"
          >
            Endereço:
            {' '}
            {sale.deliveryAddress}
            ,
            {sale.deliveryNumber}
          </div>

        </div>
      </div>
    </Col>
  );
}

SaleCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};
