import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return(
        <Navbar bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">Online Chat</Navbar.Brand>
          </Container>
        </Navbar>
    )
};

export default Header;