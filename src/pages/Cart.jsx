import React from 'react';
import { Container, Row, Col, ListGroup, Button, Card, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import { removeFromCart, clearCart } from '../store/cartSlice';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Cart = () => {
    // Defensive selectors to prevent "undefined" errors
    const { items = [] } = useSelector((state) => state.cart || {});
    const { user } = useSelector((state) => state.auth || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calculate subtotal
    const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

    /**
     * Realistic Checkout Logic
     */
    const handleCheckout = async () => {
        // 1. Ensure user is logged in
        if (!user) {
            toast.error("Please login to proceed with checkout");
            return navigate('/login');
        }

        // 2. Show Realistic Loading State
        const loadToast = toast.loading("Connecting to ShopSphere Secure Gateway...");

        try {
            // Prepare order data for backend
            const orderItems = items.map(i => ({
                name: i.name,
                qty: i.qty,
                image: i.image,
                price: i.price,
                product: i._id
            }));

            // 3. POST to Backend (Updates Cloud DB & Stock)
            await API.post('/orders', { 
                orderItems, 
                totalAmount: total 
            });

            // 4. Show Realistic Success Message (Tick Icon)
            toast.success("Order Successful! Your premium items are being prepared for dispatch. Thank you for choosing ShopSphere.", { 
                id: loadToast, 
                duration: 6000 
            });

            // 5. Clear items from Redux and LocalStorage
            dispatch(clearCart());

            // NOTE: navigate('/') is removed so the user stays on the page as requested.

        } catch (err) {
            // 6. Detailed Error Handling
            const errorMessage = err.response?.data?.message || "Transaction timed out. Please try again.";
            toast.error(errorMessage, { id: loadToast });
        }
    };

    /**
     * UI: Empty Bag State
     */
    if (items.length === 0) {
        return (
            <Container className="text-center" style={{paddingTop: '180px', paddingBottom: '100px'}}>
                <div className="bg-light d-inline-block p-4 rounded-circle mb-4">
                    <ShoppingCart size={60} className="text-muted opacity-50" />
                </div>
                <h2 className="fw-bold tracking-tighter text-uppercase">Your bag is empty</h2>
                <p className="text-muted mb-4">Discover our high-end tech and fashion collections.</p>
                <Link to="/shop" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow">
                    Start Shopping
                </Link>
            </Container>
        );
    }

    /**
     * UI: Active Shopping Bag
     */
    return (
        <Container style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <h1 className="fw-bold mb-5 tracking-tighter text-uppercase display-6">Shopping Bag</h1>
            <Row className="gx-5">
                {/* Product List Column */}
                <Col lg={8}>
                    <ListGroup variant="flush" className="rounded-4 border shadow-sm overflow-hidden">
                        {items.map((item) => (
                            <ListGroup.Item key={item._id} className="p-4 bg-white">
                                <Row className="align-items-center">
                                    <Col xs={3} md={2}>
                                        <img src={item.image} className="img-fluid rounded-3 border" alt={item.name}/>
                                    </Col>
                                    <Col xs={6} md={5}>
                                        <h6 className="fw-bold mb-1">{item.name}</h6>
                                        <small className="text-muted d-block mb-2">{item.category}</small>
                                        <Badge bg="light" text="dark" className="border">Quantity: {item.qty}</Badge>
                                    </Col>
                                    <Col xs={3} md={2} className="text-md-center">
                                        <span className="fw-bold text-primary fs-5">${item.price}</span>
                                    </Col>
                                    <Col xs={12} md={3} className="text-end mt-3 mt-md-0">
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={() => dispatch(removeFromCart(item._id))} 
                                            className="rounded-pill border-0"
                                        >
                                            <Trash2 size={20} />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                
                {/* Summary Sidebar */}
                <Col lg={4} className="mt-5 mt-lg-0">
                    <Card className="p-4 border-0 shadow-sm bg-white rounded-4 border">
                        <h4 className="fw-bold mb-4 border-bottom pb-3">Order Summary</h4>
                        <div className="d-flex justify-content-between mb-3 text-muted">
                            <span>Subtotal</span>
                            <span className="fw-bold text-dark">${total.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-muted">
                            <span>Shipping</span>
                            <span className="text-success fw-bold">FREE</span>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                            <h5 className="fw-bold">Estimated Total</h5>
                            <h5 className="fw-bold text-primary fs-3">${total.toFixed(2)}</h5>
                        </div>
                        <Button 
                            onClick={handleCheckout} 
                            variant="primary" 
                            className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                        >
                            Complete Checkout <ArrowRight size={20} />
                        </Button>
                        <div className="mt-4 p-3 bg-light rounded-3">
                            <p className="text-muted small mb-0 text-center">
                                <CheckCircle size={14} className="me-1 text-success"/> Secure Gateway Enabled
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;