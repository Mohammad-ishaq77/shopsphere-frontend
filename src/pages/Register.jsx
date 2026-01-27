import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/auth/register', formData);
            toast.success("Account created! You can now login.");
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Card className="p-4 p-md-5 border-0 shadow-lg rounded-5" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="text-center mb-5">
                    <h2 className="fw-bold tracking-tighter display-6">Join Us</h2>
                    <p className="text-muted">Create an account to start shopping at ShopSphere</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-uppercase text-muted">Full Name</Form.Label>
                        <div className="position-relative">
                            <User className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="text" 
                                placeholder="your name"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="ps-5 py-3 rounded-4 bg-light border-0"
                                required 
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-uppercase text-muted">Email Address</Form.Label>
                        <div className="position-relative">
                            <Mail className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="email" 
                                placeholder="name@example.com"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="ps-5 py-3 rounded-4 bg-light border-0"
                                required 
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-uppercase text-muted">Password</Form.Label>
                        <div className="position-relative">
                            <Lock className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="password" 
                                placeholder="Min. 6 characters"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="ps-5 py-3 rounded-4 bg-light border-0"
                                required 
                            />
                        </div>
                    </Form.Group>

                    <Button 
                        disabled={loading} 
                        type="submit" 
                        variant="primary" 
                        className="w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        {loading ? 'Processing...' : 'Create Account'} <ArrowRight size={20} />
                    </Button>
                </Form>

                <div className="text-center mt-4">
                    <p className="text-muted mb-0">Already a member? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link></p>
                </div>
            </Card>
        </Container>
    );
};

export default Register;