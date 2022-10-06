import React from 'react';
import AuthForm from './AuthForm';
import { Container, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import chatImage from '../images/love-message.png';

const Login = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <Container fluid className="h-100">
                <div className="row justify-content-center align-content-center h-100">
                    <div className='col-12 col-md-8 col-xxl-6'>
                        <Card>
                            <Card.Body className='row p-5'>
                                <AuthForm />
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                <img src={chatImage} height="200" width="200"></img>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
};
export default Login;