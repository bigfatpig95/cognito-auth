
import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { getListitem } from "../graphql/queries";
import { deleteListitem } from "../graphql/mutations";
import { updateListitem } from "../graphql/mutations";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./Notes.css";
import Image from 'react-bootstrap/Image'
import { useAppContext } from "../lib/contextLib";
import Auth from "@aws-amplify/auth";

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAuthenticated } = useAppContext();
  const [currentUser, setCurrentUser] = useState([]);
  const imageRef = useRef();
  const [listForm, setListForm] = useState({
    name: "",
    description: "",  
    category: "",
    image: "",   
  });
  
  const handleChange = (key) => {
     return (e) => {
       setListForm({
         ...listForm,
         [key]: e.target.value
       });
     }
   }

  useEffect(() => {
    fetchItems();
  },[]);

  async function fetchItems() {
    setFetching(true);
    try {
      const itemData = await API.graphql({ query: getListitem, variables: { id: id }});
      const items = itemData.data.getListitem;
      const owner = await Auth.currentUserInfo();
      try{
     if (owner.attributes['sub'] !== items.owner){
      setCurrentUser('false')
     }else{
      setCurrentUser('true')
     }
    }catch (err) {
      console.log('erorr')
      setCurrentUser('false')
    }
      setItems(items);
      setListForm({
        name: items.name,
        description: items.description,  
        category: items.category,
        image: items.image,
      });   
      setFetching(false);
    } catch (err) {
      console.log('erorr')
    }
    setFetching(false);
  }  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
   
  var fileName = Date.now() + ".jpg";
  setIsLoading(true);

  if (imageRef.current.files[0]){
    await Storage.remove(items.image)
    Storage.put(fileName, imageRef.current.files[0]).then(res => {
    API.graphql({ query: updateListitem, variables: { input: {...listForm, id: id, image: fileName }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
    .then((e) => {
       setListForm({
         id:"",
         name: "",
         description: "",
         category: "",
         price: "",
       });
       history.push("/");
  })
})}

else{
    API.graphql({ query: updateListitem, variables: { input: {...listForm, id: id }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
    .then((e) => {
      setListForm({
        id:"",
        name: "",
        description: "",
        category: "",
        price: "",
        });
        history.push("/");
    })
  }}
  
  async function handleDelete({id}) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    await API.graphql({ query: deleteListitem, variables: { input: { id } }, authMode: "AMAZON_COGNITO_USER_POOLS"});
    history.push("/");
  }
 function rendernote(){

  if (currentUser === 'true'){
  return (
    <div className="Notes">
      <Image src={'https://carousell82244-staging.s3.ap-southeast-1.amazonaws.com/public/' + items.image} fluid />

      {items && (
        
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3" controlId="ItemName">
          <Form.Label>Item Name</Form.Label>          
          <Form.Control defaultValue = {items.name} type="text" onChange={handleChange("name")} onSelect={handleChange("name")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>          
          <Form.Control defaultValue = {items.description} type="text" onChange={handleChange("description")} onSelect={handleChange("description")} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={handleChange('category')} >
          <option>Choose...</option>
          <option>Electronic</option>
          <option>Books</option>
          <option>Music</option>
          <option>Others</option>
        </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control defaultValue = {items.price} type="number" onChange={handleChange("price")} onSelect={handleChange("price")} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control type="file" multiple accept='image/jpg' ref={imageRef} />    
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={() => handleDelete(items)}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
        
      )}
    </div>
  );
            }
            else{
              return(
                <div className="Notes">
                  <Image src={'https://carousell82244-staging.s3.ap-southeast-1.amazonaws.com/public/' + items.image} fluid />
                  {items && (       
                    <Form>                      
                      <Form.Group className="mb-3" controlId="ItemName">
                      <Form.Label>Item Name</Form.Label>                      
                      <Form.Control defaultValue = {items.name} type="text" readOnly />
                      </Form.Group>            
                      <Form.Group className="mb-3" controlId="Description">
                      <Form.Label>Description</Form.Label>                      
                      <Form.Control defaultValue = {items.description} type="text" readOnly />
                      </Form.Group>            
                      <Form.Group className="mb-3" controlId="category">
                      <Form.Label>Category</Form.Label>                      
                      <Form.Control defaultValue = {items.category} type="text" readOnly />
                      </Form.Group>            
                      <Form.Group className="mb-3" controlId="price">
                      <Form.Label>Price</Form.Label>                      
                      <Form.Control defaultValue = {items.price} type="text" readOnly />
                      </Form.Group>                      
                      </Form>
                      )
              }
              </div>
                 ) }
            }
  function displaynote(){
    return(
    <div className="Notes">
      <Image src={'https://carousell82244-staging.s3.ap-southeast-1.amazonaws.com/public/' + items.image} fluid />
      {items && (
        <Form> 
          <Form.Group className="mb-3" controlId="ItemName">
          <Form.Label>Item Name</Form.Label>          
          <Form.Control defaultValue = {items.name} type="text" readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>          
          <Form.Control defaultValue = {items.description} type="text" readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>          
          <Form.Control defaultValue = {items.category} type="text" readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>          
          <Form.Control defaultValue = {items.price} type="text" readOnly />
          </Form.Group>          
          </Form>
          )
  }
  </div>
     ) }
          return (
            <div className="note">
              {isAuthenticated === true ? rendernote(): displaynote()}
            </div>
          );
        }
  