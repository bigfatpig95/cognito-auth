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
import Button from 'react-bootstrap/Button'
import { API, graphqlOperation,Storage } from "aws-amplify";// new
import { listListitems } from "./graphql/queries";// new


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
            <Nav.Link>About Us</Nav.Link>
          </LinkContainer>
          
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
          
          variant="primary"
         
        >
          Search
        </LoaderButton>
  </InputGroup>
  </Form>



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
      </div>
    )
  );

              }
export default App;