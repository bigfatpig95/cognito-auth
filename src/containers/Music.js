import React from "react";

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


export default function Music() {
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
      const itemData = await API.graphql(graphqlOperation(listListitems, {
          filter: {
              category: {
                  eq : "Music"
              }
          }
      }));
      
      const items = itemData.data.listListitems.items;
      console.log('items' , items)
      setItems(items);
      setFetching(false);
      
    } catch (err) {
      console.error(err);
    }
    setFetching(false);
  }
        
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