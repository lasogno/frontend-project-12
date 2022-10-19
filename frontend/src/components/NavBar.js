import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useAuth } from './providers/AuthProvider';

const NavBar = () => {
  const { t } = useTranslation();
  const { isLoggedIn, onLogout } = useAuth();
  return (
    <Navbar
      bg="white"
      expand="lg"
      variant="light"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand href="/">{t('logo')}</Navbar.Brand>
        {isLoggedIn && (
        <Button
          onClick={onLogout}
        >
          {t('authorization.logout')}
        </Button>
        )}
      </Container>
    </Navbar>
  );
};
export default NavBar;
