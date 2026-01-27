import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await API.post('/auth/login', { email, password });
            dispatch(setCredentials({ user: data, token: data.token }));
            toast.success(`Welcome back, ${data.name}!`);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Card className="p-4 p-md-5 border-0 shadow-lg rounded-5" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="text-center mb-5">
                    <h2 className="fw-bold tracking-tighter display-6">Welcome Back</h2>
                    <p className="text-muted">Enter your details to access your ShopSphere account</p>
                </div>

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-uppercase text-muted">Email Address</Form.Label>
                        <div className="position-relative">
                            <Mail className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
                            <Form.Control 
                                type="email" 
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={20} />
                    </Button>
                </Form>

                <div className="text-center mt-4">
                    <p className="text-muted mb-0">Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register</Link></p>
                </div>
            </Card>
        </Container>
    );
};

export default Login;