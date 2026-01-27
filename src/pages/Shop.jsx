import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { ShoppingCart, Search, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');


    const categories = ['All', 'Electronics', 'Accessories', 'Fashion', 'Home'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                toast.error("Could not load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    
    useEffect(() => {
        let result = products;

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchTerm) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [searchTerm, activeCategory, products]);

    const resetFilters = () => {
        setSearchTerm('');
        setActiveCategory('All');
    };

    return (
        <Container style={{ paddingTop: '120px', minHeight: '80vh' }}>
            {/* Header & Search Area */}
            <Row className="mb-5 align-items-center">
                <Col lg={6} className="mb-4 mb-lg-0">
                    <h1 className="fw-bold display-5 tracking-tighter">THE STORE</h1>
                    <p className="text-muted">Explore our curated collection of luxury essentials.</p>
                </Col>
                <Col lg={6}>
                    <InputGroup className="shadow-sm rounded-pill overflow-hidden border">
                        <InputGroup.Text className="bg-white border-0 ps-4">
                            <Search size={20} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search products..."
                            className="border-0 py-3 shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <Button variant="white" onClick={() => setSearchTerm('')} className="border-0 pe-4">
                                <X size={18} className="text-muted" />
                            </Button>
                        )}
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {/* Sidebar Filter */}
                <Col lg={3} className="mb-5">
                    <div className="sticky-top" style={{ top: '120px' }}>
                        <div className="bg-white p-4 rounded-4 border shadow-sm">
                            <h6 className="fw-bold text-uppercase mb-4 d-flex align-items-center gap-2">
                                <Filter size={18} /> Filter By Category
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`btn text-start rounded-3 px-3 py-2 transition-all ${
                                            activeCategory === cat 
                                            ? 'btn-primary shadow-sm' 
                                            : 'btn-light border-0 text-secondary'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            
                            {(activeCategory !== 'All' || searchTerm) && (
                                <Button 
                                    variant="link" 
                                    className="text-danger text-decoration-none mt-4 p-0 small fw-bold"
                                    onClick={resetFilters}
                                >
                                    Clear all filters
                                </Button>
                            )}
                        </div>
                    </div>
                </Col>

                {/* Product Grid */}
                <Col lg={9}>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <Row g={4}>
                            {filteredProducts.map((product) => (
                                <Col key={product._id} sm={6} md={4} className="mb-4">
                                    <Card as={Link} to={`/product/${product._id}`} className="h-100 p-3 border-0 shadow-hover text-decoration-none text-dark card-transition">
                                        <div className="rounded-4 overflow-hidden mb-3 bg-light position-relative">
                                            <Card.Img 
                                                variant="top" 
                                                src={product.image} 
                                                style={{ height: '220px', objectFit: 'cover' }} 
                                            />
                                        </div>
                                        <Card.Body className="p-0">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>
                                                    {product.category}
                                                </small>
                                                {product.stock < 5 && product.stock > 0 && (
                                                    <Badge bg="warning" text="dark" style={{ fontSize: '8px' }}>Low Stock</Badge>
                                                )}
                                            </div>
                                            <Card.Title className="fw-bold text-truncate mb-2" style={{ fontSize: '1rem' }}>
                                                {product.name}
                                            </Card.Title>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="fw-bold mb-0 text-primary">${product.price}</h5>
                                                <div className="bg-light p-2 rounded-circle">
                                                    <ShoppingCart size={16} className="text-primary" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center py-5 bg-light rounded-5 border">
                            <Search size={50} className="text-muted mb-3 opacity-25" />
                            <h5 className="fw-bold text-muted">No products found</h5>
                            <p className="text-secondary small">Try adjusting your filters or search terms.</p>
                            <Button variant="primary" className="rounded-pill mt-2" onClick={resetFilters}>
                                Show all products
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;