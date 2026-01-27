import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Card, Spinner } from 'react-bootstrap';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { PlusCircle, Trash2, Package } from 'lucide-react';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '', price: '', description: '', category: 'Electronics', image: '', stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data);
        } catch (err) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/products', formData);
            toast.success("Product added successfully!");
            setFormData({ name: '', price: '', description: '', category: 'Electronics', image: '', stock: '' });
            fetchProducts();
        } catch (err) {
            toast.error(err.response?.data?.message || "Creation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await API.delete(`/products/${id}`);
                toast.success("Product removed");
                fetchProducts();
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <Container style={{ paddingTop: '120px' }}>
            <h1 className="fw-bold mb-5 tracking-tighter"><Package size={40} className="me-2 text-primary"/>ADMIN CONSOLE</h1>
            
            <Row className="gx-5">
                {/* Add Product Form */}
                <Col lg={4} className="mb-5">
                    <Card className="p-4 border-0 shadow-sm rounded-4 border">
                        <h5 className="fw-bold mb-4">Add New Product</h5>
                        <Form onSubmit={handleCreate}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Name</Form.Label>
                                <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="rounded-3 bg-light border-0 py-2" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Price ($)</Form.Label>
                                <Form.Control type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="rounded-3 bg-light border-0 py-2" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Stock</Form.Label>
                                <Form.Control type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required className="rounded-3 bg-light border-0 py-2" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Category</Form.Label>
                                <Form.Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="rounded-3 bg-light border-0 py-2">
                                    <option>Electronics</option><option>Fashion</option><option>Accessories</option><option>Home</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Image URL</Form.Label>
                                <Form.Control type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required className="rounded-3 bg-light border-0 py-2" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold">Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="rounded-3 bg-light border-0" />
                            </Form.Group>
                            <Button type="submit" className="w-100 rounded-pill py-2 fw-bold"><PlusCircle size={18} className="me-2"/>Create Product</Button>
                        </Form>
                    </Card>
                </Col>

                {/* Product List */}
                <Col lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden border">
                        <Table responsive hover className="mb-0 align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className="text-end pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={p.image} width="40" height="40" className="rounded-2 object-fit-cover" />
                                                <span className="fw-bold small">{p.name}</span>
                                            </div>
                                        </td>
                                        <td>{p.category}</td>
                                        <td>${p.price}</td>
                                        <td>{p.stock}</td>
                                        <td className="text-end pe-4">
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)} className="rounded-pill border-0">
                                                <Trash2 size={18} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;