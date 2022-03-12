import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg='light' expand='lg' className='mb-3'>
      <Container>
        <Navbar.Brand className='issue-brand' href='#home'>
          Issue Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/issues/add'>
              Add Issue
            </Nav.Link>
            <Nav.Link as={Link} to='/issues'>
              Issues
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
