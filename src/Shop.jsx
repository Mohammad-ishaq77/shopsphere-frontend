import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { ShoppingCart, Search, Filter } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Electronics', 'Accessories', 'Fashion', 'Home'];

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await API.get('/products');
            setProducts(data);
            setFilteredProducts(data);
        };
        fetchProducts();
    }, []);

    // Logic for Search and Category Filtering
    useEffect(() => {
        let result = products;
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }
        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setFilteredProducts(result);
    }, [searchTerm, activeCategory, products]);

    return (
        <Container style={{ paddingTop: '120px' }}>
            <Row className="mb-5 align-items-center">
                <Col md={6}>
                    <h1 className="fw-bold display-6 mb-0">Discover Everything</h1>
                </Col>
                <Col md={6}>
                    <InputGroup className="shadow-sm rounded-pill overflow-hidden">
                        <InputGroup.Text className="bg-white border-0 ps-4">
                            <Search size={18} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search for products..."
                            className="border-0 py-3 shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {/* Sidebar Filters */}
                <Col lg={3} className="mb-4">
                    <div className="bg-white p-4 rounded-4 border shadow-sm">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <Filter size={18} /> Categories
                        </h5>
                        {categories.map(cat => (
                            <div 
                                key={cat} 
                                onClick={() => setActiveCategory(cat)}
                                className={`py-2 px-3 rounded-3 cursor-pointer mb-1 transition ${activeCategory === cat ? 'bg-primary text-white' : 'hover-bg-light text-secondary'}`}
                                style={{ cursor: 'pointer' }}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Product List */}
                <Col lg={9}>
                    <Row g={4}>
                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                            <Col key={product._id} md={6} lg={4} className="mb-4">
                                <Card as={Link} to={`/product/${product._id}`} className="h-100 p-3 border-0 text-decoration-none text-dark shadow-hover">
                                    <div className="rounded-4 overflow-hidden mb-3">
                                        <Card.Img variant="top" src={product.image} style={{height: '220px', objectFit: 'cover'}} />
                                    </div>
                                    <Card.Body className="p-0">
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '10px'}}>{product.category}</small>
                                        <Card.Title className="fw-bold mt-1 text-truncate">{product.name}</Card.Title>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <h5 className="fw-bold mb-0 text-primary">${product.price}</h5>
                                            <Button variant="outline-primary" className="rounded-circle p-2">
                                                <ShoppingCart size={16} />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) : (
                            <div className="text-center py-5">
                                <Search size={40} className="text-muted mb-3" />
                                <h5>No products found matching your criteria.</h5>
                            </div>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;