import React, { useState } from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { ShoppingBag, User, Search, LogOut, ClipboardList, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);
    const { user } = useSelector((state) => state.auth || {});
    const { items = [] } = useSelector((state) => state.cart || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        setExpanded(false);
        navigate('/login');
    };

    return (
        <Navbar 
            expanded={expanded} 
            onToggle={(navExpanded) => setExpanded(navExpanded)} 
            expand="lg" 
            fixed="top" 
            variant="dark"
            className="py-3 bg-black border-bottom border-secondary shadow-lg"
            style={{ backgroundColor: '#000000 !important' }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)} className="fw-bold fs-3 tracking-tighter text-white">
                    SHOP<span style={{color: '#6366f1'}}>SPHERE.</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto fw-medium">
                        <Nav.Link as={Link} to="/" className="text-white opacity-75 hover-opacity-100" onClick={() => setExpanded(false)}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/shop" className="text-white opacity-75 hover-opacity-100" onClick={() => setExpanded(false)}>Shop</Nav.Link>
                    </Nav>
                    
                    <div className="d-flex align-items-center gap-4 py-3 py-lg-0">
                        <Link to="/shop" onClick={() => setExpanded(false)} className="text-white opacity-75 hover-opacity-100"><Search size={20} /></Link>
                        
                        <Link to="/cart" onClick={() => setExpanded(false)} className="position-relative text-white">
                            <ShoppingBag size={24} className="opacity-75 hover-opacity-100" />
                            {items.length > 0 && (
                                <Badge pill bg="primary" className="position-absolute top-0 start-100 translate-middle">
                                    {items.length}
                                </Badge>
                            )}
                        </Link>

                        {user ? (
                            <NavDropdown 
                                title={<span className="fw-bold text-white"><User size={20} className="me-1"/> {user.name}</span>} 
                                id="user-dropdown"
                                align="end"
                                className="dark-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/orders" onClick={() => setExpanded(false)}>
                                    <ClipboardList size={16} className="me-2"/> My Orders
                                </NavDropdown.Item>
                                {user.isAdmin && (
                                    <NavDropdown.Item as={Link} to="/admin" onClick={() => setExpanded(false)} className="text-primary fw-bold">
                                        <LayoutDashboard size={16} className="me-2"/> Admin Panel
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                    <LogOut size={16} className="me-2" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Link to="/login" onClick={() => setExpanded(false)} className="btn btn-primary rounded-pill px-4 fw-bold">Login</Link>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;