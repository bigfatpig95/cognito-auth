import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listListitems } from "../graphql/queries";
import { LinkContainer } from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {AmplifyS3Image} from "@aws-amplify/ui-react";

export default function Search() {

    const [items, setItems] = useState([]);
    const [fetching, setFetching] = useState(false);

    const history = useHistory();
    const data = history.location.state?.data
    console.log(data)

    useEffect(() => {
        fetchItems();
      }, []);
    
      async function fetchItems() {
        setFetching(true);
        try {
          const itemData = await API.graphql(graphqlOperation(listListitems, {
            filter: {
                name: {
                    eq : data,
                   // gt : data
                }
            }
        }));
          
          const items = itemData.data.listListitems.items;
          console.log(items.length)
          console.log('items' , items)
          setItems(items);
          setFetching(false);
          
        } catch (err) {
          console.error(err);
        }
        setFetching(false);
      }
      return (
        <>
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
