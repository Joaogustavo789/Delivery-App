import { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import NavbarSeller from '../../components/NavbarSeller';
import getSellerOrdersService from '../../services/getSellerOrdersService';
import SaleCard from './components/SaleCard';

export default function SellerOrdersPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function getOrders() {
      const response = await getSellerOrdersService(id);
      setSales(response.data.message);
    }

    getOrders();
  }, []);

  return (
    <div>
      <NavbarSeller />
      <Container className="mt-4">
        <Row className="d-flex gap-2 justify-content-center">
          {sales.map((sale) => (
            <SaleCard key={ sale.id } sale={ sale } />
          ))}
        </Row>
      </Container>
    </div>
  );
}
