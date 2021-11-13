
import React from "react";
import "./Home.css";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { API, graphqlOperation } from "aws-amplify";
import { listListitems } from "../graphql/queries";
import Amplify from 'aws-amplify';
import config from "../aws-exports";
import { useAppContext } from "../lib/contextLib";
import {AmplifyS3Image} from "@aws-amplify/ui-react";
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
      setItems(items);
      setFetching(false);
    } catch (err) {
      console.log('error');
    }
    setFetching(false);
  }

return (
  <>
 {isAuthenticated ? (
  <LinkContainer to="/notes/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <span className="ml-2 font-weight-bold">List a new item</span>
        </ListGroup.Item>
      </LinkContainer>
      ):(<span className="ml-2 font-weight-bold">Sale Items</span>
      )}
      {items.map((item) => (
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

