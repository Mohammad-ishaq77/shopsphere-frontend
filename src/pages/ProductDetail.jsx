import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import API from '../api/axios';
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
            } catch (err) {
                toast.error("Product not found");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = () => {
        // DEFENSIVE CHECK: Prevent crash if product is null
        if (!product || !product._id) {
            toast.error("Error: Product data not loaded.");
            return;
        }

        dispatch(addToCart({ 
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock,
            qty: qty 
        }));
        
        toast.success("Added to shopping bag!");
        navigate('/cart');
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <Container style={{ paddingTop: '120px' }}>
            <Button variant="link" onClick={() => navigate(-1)} className="text-dark p-0 mb-4 text-decoration-none d-flex align-items-center gap-1">
                <ChevronLeft size={18}/> Back to Shop
            </Button>
            
            <Row className="gx-5">
                <Col md={6} className="mb-4">
                    <img src={product.image} className="img-fluid rounded-5 shadow-sm border" alt={product.name} />
                </Col>
                
                <Col md={6}>
                    <Badge bg="light" text="dark" className="mb-2 border text-uppercase px-3 py-2 rounded-pill">{product.category}</Badge>
                    <h1 className="fw-bold display-5 mb-3">{product.name}</h1>
                    <h2 className="text-primary fw-bold mb-4">${product.price}</h2>
                    <p className="text-muted mb-5 leading-relaxed">{product.description}</p>
                    
                    <div className="bg-light p-4 rounded-4 mb-4 border">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <span className="fw-bold text-secondary">Status</span>
                            <span className={product.stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        
                        {product.stock > 0 && (
                            <Row className="align-items-center">
                                <Col xs={4}><span className="fw-bold text-secondary">Quantity</span></Col>
                                <Col xs={8}>
                                    <Form.Select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="rounded-pill">
                                        {[...Array(product.stock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        )}
                    </div>

                    <Button onClick={handleAddToCart} disabled={product.stock === 0} className="btn-primary w-100 py-3 rounded-pill fs-5 shadow">
                        <ShoppingBag size={24} className="me-2" /> Add to Shopping Bag
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;