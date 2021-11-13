import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./lib/errorLib";

import Form from "react-bootstrap/Form";

import LoaderButton from "./components/LoaderButton";
import InputGroup from 'react-bootstrap/InputGroup'
import Footer from "./containers/Footer";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();


  useEffect(() => {
    onLoad();
  }, []);


  const [listForm, setListForm] = useState({
    search: ''
    
    
  });

  const handleChange = (key) => {
    history.push('/')
    return (e) => {
      console.log(e.target.value)
      console.log(key)
      setListForm({
        ...listForm,
        [key]: e.target.value
      });
    }
  }
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    history.push("/login");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    history.push("/Search", { data:  listForm.search});
  }

  async function handleSelect(event) {
  await history.push('/')
  
  history.push("/CostFilter", { data:  event});
  

  }

 
 

  return (


    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Marketplace
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/Electronic">
            <Nav.Link>Electronic</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/Music">
            <Nav.Link>Music</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/Books">
            <Nav.Link>Books</Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/Others">
            <Nav.Link>Others</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/AboutUs">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>


          <LinkContainer to="/ChatBot">
            <Nav.Link>ChatBot</Nav.Link>
          </LinkContainer>  


          <DropdownButton  variant="link"  title="Cost"  onSelect={handleSelect}>
        <Dropdown.Item  eventKey="0,100">Less Than 100</Dropdown.Item>
        <Dropdown.Item  eventKey="100,200">100 to 200</Dropdown.Item>
        <Dropdown.Item  eventKey="200,300">200 to 300</Dropdown.Item>
      </DropdownButton>
          

          <Navbar.Toggle />
          
          <Navbar.Collapse className="justify-content-end">

          <Form onSubmit={handleSubmit}>     
          <InputGroup>
          <Form.Control
          placeholder="search"
          type="text"
          onChange={handleChange("search")}
          />
    <LoaderButton
          block
          type="submit"
          variant="primary">

          Search
        </LoaderButton>
  </InputGroup>
  </Form>
  {/* <Footer /> */}



            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <Footer />
      </div>
      
    )
  );

              }
export default App;