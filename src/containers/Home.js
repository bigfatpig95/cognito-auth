import React from "react";
import "./Home.css";

import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { API, graphqlOperation } from "aws-amplify";
import { listListitems } from "../graphql/queries";
import { createListitem } from "../graphql/mutations";
import { deleteListitem } from "../graphql/mutations";
import {updateListitem} from "../graphql/mutations";
import {getListitem} from "../graphql/queries";
import Amplify from 'aws-amplify';
import config from "../aws-exports";

import { onError } from "../lib/errorLib";
import { Auth } from 'aws-amplify'

import { useAppContext } from "../lib/contextLib";

import {AmplifyS3Image} from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";

Amplify.configure(config);





export default function Home() {
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(false);

  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setFetching(true);
    try {
      const itemData = await API.graphql(graphqlOperation(listListitems));
      
      const items = itemData.data.listListitems.items;
      console.log('items' , items)
      setItems(items);
      setFetching(false);
      
    } catch (err) {
      console.error(err);
    }
    setFetching(false);
  }



 /* const [listForm, setListForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    
  });*/


 /* const handleChange = (key) => {
    return (e) => {
      setListForm({
        ...listForm,
        [key]: e.target.value
      });
    }
  }*/

 /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isAuthenticated)
    API.graphql({ query: createListitem, variables: { input: listForm }, authMode: "AMAZON_COGNITO_USER_POOLS" }).then(e => {
    //API.graphql(graphqlOperation(createListitem, { input: listForm, authMode: "AMAZON_COGNITO_USER_POOLS" })).then(e => {
      setListForm({
        name: "",
        description: "",
        category: "",
        price: "",
      });
      return fetchItems();
    }).catch(err => {
        console.log(isAuthenticated)
        console.error(err);
    });
  }

  async function deleteItem({ id }) {
   try{
    console.log(id)
    const test = await API.graphql({ query: getListitem, variables: { id: id }});
   //  await API.graphql({ query: queries.getTodo, variables: { id: {id} }});
     console.log(test.data.getListitem.name)
    await API.graphql({ query: deleteListitem, variables: { input: { id } }, authMode: "AMAZON_COGNITO_USER_POOLS"});
   // const newItemsArray = items.filter(item => item.id !== id);
   // setItems(newItemsArray);
    return fetchItems();
  }
 catch (err) {
  console.error(err);
}
  }

  async function updateItem({ id }) {
    try{
     await API.graphql({ query: updateListitem, variables: { input: { id } }, authMode: "AMAZON_COGNITO_USER_POOLS"});
    // const newItemsArray = items.filter(item => item.id !== id);
    // setItems(newItemsArray);
     return fetchItems();
   }
  catch (err) {
   console.error(err);
 }
   }
*/

function renderItemsList(items) {
  console.log('itemlist')
  return (
    
    <>
      <LinkContainer to="/notes/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <span className="ml-2 font-weight-bold">List a new item</span>
        </ListGroup.Item>
      </LinkContainer>
      {items.map(({ itemId, description, category ,price, image, createdAt }) => (
        <LinkContainer key={itemId} to={`/notes/${itemId}`}>
          <ListGroup.Item action>
            <span className="font-weight-bold">
              {description.trim().split("\n")[0]}
              {category}
              {image}
            </span>
            <br />
            <span className="text-muted">
              Created: {new Date(createdAt).toLocaleString()}
            </span>
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </>
  );
}

function renderItems() {
  console.log('renderitems')
  return (
    <div className="items">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Items</h2>
      <ListGroup>{!isLoading && renderItemsList(items)}</ListGroup>
    </div>
  );
}

return (
  <>
  <LinkContainer to="/notes/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <span className="ml-2 font-weight-bold">List a new item</span>
        </ListGroup.Item>
      </LinkContainer>
      {items.map((item) => (
      //{items.map(({ id, description, category ,price, image, createdAt }) => (
        <LinkContainer key={item.id} to={`/notes/${item.id}`}>
          <ListGroup.Item action>
            
          <div>
            <span className="font-weight-bold">
              Name: {item.name.trim().split("\n")[0]}       
              
            </span>
            </div>



          <div>
            <span className="font-weight-bold">
              Description: {item.description.trim().split("\n")[0]}       
              
            </span>
            </div>
            <div>
            <span className="font-weight-bold">
            Category: {item.category}
            </span>
            </div>
            <div>
            <span className="font-weight-bold">
              Price: {item.price}
              </span>
              </div>
              
              <div>
              <span className="font-weight-bold">
                 <AmplifyS3Image style={{"--height": "150px"}} path={item.image} />
                
                 
              </span>
              </div>
              
            <br />
            <span className="text-muted">
              Created: {new Date(item.createdAt).toLocaleString()}
            </span>
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </>
  );
}



  /*return (
    <div className="App">
      <header className="App-header"><h1>Item Store</h1></header>
      <div className="wrapper">
      <div>
        {fetching ? (
          <p>Fetching Items...</p>
        ) : (
          <div>
            <h2>Our Items:</h2>
            {items.length > 0 ? (
              <ul>
                {items.map((item) => (
                  <div key={item.id || item.name}> 
                  <li>
                  <div>
                   <AmplifyS3Image style={{"--height": "150px"}} path={item.image} />
                  </div>
                  <Link to={`/note/${item.id}`}>
                  {item.name} - {item.description}
                 </Link>
                  
                    <p>{item.name} - {item.description} - {item.category} - {item.price}</p>
                    <button onClick={() => deleteItem(item)}>Delete item</button>
                    <button onClick={() => deleteItem(item)}>Edit item</button>
                  </li>

                  </div>
                ))}
              </ul>
            ) : (
              <p>We don't have any books right now <span role="img">😢</span></p>
            )}
          </div>
        )}
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <h2>Add new Item</h2>
        <input placeholder="Item Name" type="text" onChange={handleChange("name")} />
        <input placeholder="Description" type="text" onChange={handleChange("description")} />
        <input placeholder="category" type="text" onChange={handleChange("category")} />
        <input placeholder="price" type="text" onChange={handleChange("price")} />
        <button type="submit">Add Item</button>
      </form>
      </div>
    </div>
  );
}*/












    /*<div className="Home">
      <div className="lander">
        <h1>Team 18</h1>
        <p className="text-muted">A simple marketplace</p>
      </div>
    </div>
  );
}*/