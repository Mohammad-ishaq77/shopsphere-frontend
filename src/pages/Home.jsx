import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch only first 4 products for the 'Featured' section
                const { data } = await API.get('/products');
                setProducts(data.slice(0, 4)); 
            } catch (err) {
                console.error(err);
                toast.error("Connecting to server...");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero Section */}
            <div className="py-5 mb-5 border-bottom" style={{ backgroundColor: '#f8fafc' }}>
                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                            <h6 className="text-uppercase fw-bold text-primary mb-3" style={{letterSpacing: '3px'}}>
                                Future of Retail
                            </h6>
                            <h1 className="display-2 fw-bold mb-4 tracking-tighter" style={{ lineHeight: '0.9' }}>
                                Style defined <br/> by <span style={{color: '#6366f1', fontStyle: 'italic'}}>Details.</span>
                            </h1>
                            <p className="lead text-secondary mb-5 pe-lg-5">
                                Experience the intersection of high-end technology and minimalist luxury. Curated specifically for the modern lifestyle.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    className="rounded-pill px-5 py-3 shadow-lg fw-bold"
                                    onClick={() => navigate('/shop')} 
                                >
                                    Explore Store <ArrowRight className="ms-2" size={20} />
                                </Button>
                                <Button 
                                    variant="outline-dark" 
                                    size="lg" 
                                    className="rounded-pill px-5 py-3 fw-bold"
                                    onClick={() => navigate('/register')}
                                >
                                    Join Now
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="position-relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000" 
                                    className="img-fluid rounded-5 shadow-2xl" 
                                    alt="Hero Product" 
                                    style={{ transform: 'rotate(-2deg)' }}
                                />
                                <div className="position-absolute top-100 start-0 translate-middle bg-white p-4 rounded-4 shadow border d-none d-md-block">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary text-white p-2 rounded-circle">
                                            <Star size={20} fill="currentColor"/>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-0">4.9/5 Rating</h6>
                                            <small className="text-muted">Trustpilot Verified</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Featured Product Grid */}
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h6 className="text-primary fw-bold text-uppercase mb-2">Editor's Choice</h6>
                        <h2 className="fw-bold display-6 tracking-tighter">Featured Products</h2>
                    </div>
                    <Link to="/shop" className="btn btn-link text-primary fw-bold text-decoration-none">
                        View All Collections <ArrowRight size={18} />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3 text-muted">Fetching latest trends...</p>
                    </div>
                ) : products.length > 0 ? (
                    <Row g={4}>
                        {products.map((product) => (
                            <Col key={product._id} sm={6} lg={3} className="mb-4">
                                <Card as={Link} to={`/product/${product._id}`} className="h-100 p-3 border-0 shadow-hover text-decoration-none text-dark transition">
                                    <div className="rounded-4 overflow-hidden mb-3 bg-light">
                                        <Card.Img 
                                            variant="top" 
                                            src={product.image} 
                                            style={{height: '280px', objectFit: 'cover'}} 
                                        />
                                    </div>
                                    <Card.Body className="p-0">
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <small className="text-muted text-uppercase fw-bold" style={{fontSize: '10px'}}>{product.category}</small>
                                            <div className="d-flex text-warning">
                                                <Star size={10} fill="currentColor"/>
                                                <Star size={10} fill="currentColor"/>
                                                <Star size={10} fill="currentColor"/>
                                            </div>
                                        </div>
                                        <Card.Title className="fw-bold text-truncate" style={{fontSize: '1.1rem'}}>{product.name}</Card.Title>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <h5 className="fw-bold mb-0 text-primary">${product.price}</h5>
                                            <div className="bg-light p-2 rounded-circle hover-bg-primary transition">
                                                <ShoppingCart size={18} className="text-primary" />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5 border rounded-5 bg-light">
                        <p className="text-muted mb-0">No products found. Please add some from the Admin panel.</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Home;