import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Card, Spinner } from 'react-bootstrap';
import API from '../api/axios';
import { ClipboardList } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders/myorders');
                setOrders(data);
            } catch (err) {
                console.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <Container style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <h1 className="fw-bold mb-5 tracking-tighter"><ClipboardList size={40} className="me-2 text-primary"/>MY ORDERS</h1>
            
            {orders.length === 0 ? (
                <div className="text-center py-5 bg-white rounded-5 border shadow-sm">
                    <p className="text-muted mb-0">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden border">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th className="pe-4">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className="ps-4 font-monospace small">{order._id}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="fw-bold">${order.totalAmount}</td>
                                    <td>
                                        <Badge bg={order.status === 'Delivered' ? 'success' : 'warning'} className="rounded-pill px-3">
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="pe-4 small">{order.orderItems.length} items</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}
        </Container>
    );
};

export default Orders;