import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar ,Nav ,Container } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';



export class Header extends Component {
    render() {
        const { isAuthenticated  } = this.props.auth0;

        
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Makeup Shop</Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to ="/">Home</Link>
                            <Link to="/Favourite">Favourite list</Link>
                            <Link to="/Profile">Profile</Link>
                             
                             {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default withAuth0(Header)
