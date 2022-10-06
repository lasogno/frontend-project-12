import { Nav, Navbar, Container } from 'react-bootstrap';

const Footer = () => {
    return(
        <Navbar bg="white" className="shadow-sm" as={'div'} fixed="bottom">
          <Container>
            <Navbar.Brand href="/">Online Chat</Navbar.Brand>
            <Nav.Link href="https://github.com/lasogno">
          Created by Alisa Lobanova
            </Nav.Link>
          </Container>
        </Navbar>
    )
};

export default Footer;