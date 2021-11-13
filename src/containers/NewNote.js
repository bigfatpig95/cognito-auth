import React, { useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Col  from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./NewNote.css";
import { API,Storage } from "aws-amplify";
import { createListitem } from "../graphql/mutations";

export default function NewNote() {
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const imageRef = useRef();
  const [listForm, setListForm] = useState({
    name: "",
    description: "",  
    category: "",
    image: "",
    price: "",
  });

  const handleChange = (key) => {
    return (e) => {
      setListForm({
        ...listForm,
        [key]: e.target.value
      });
    }
  }
  function validateForm() {
    if (listForm.category !== 'Choose...' && listForm.category !== '')
    return true;
  }

  async function handleSubmit(event) {
  event.preventDefault();
  
  var fileName = Date.now() + ".jpg";
  setIsLoading(true);
  if (imageRef.current.files[0]){
    Storage.put(fileName, imageRef.current.files[0]).then(res => {
      API.graphql({ query: createListitem, variables: { input: {...listForm, image: fileName }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
      .then((e) => {
        setListForm({
          name: "",
          description: "",
          category: "",
          price: "",
        });
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
    })
  }else{
    API.graphql({ query: createListitem, variables: { input: {...listForm }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
   .then((e) => {
     setListForm({
       name: "",
       description: "",
       category: "",
       price: "",
     });
     history.push("/");
   })
   .catch((err) => {
     console.log('error');
     setIsLoading(false);
   });
  }
}
  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="ItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control placeholder="Enter Item Name" type="text" onChange={handleChange("name")} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Enter Item Description" type="text" onChange={handleChange("description")} required />
          <Form.Control.Feedback type="invalid">
              Please choose a username.
        </Form.Control.Feedback>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>category</Form.Label>
        <Form.Select defaultValue="Choose..." onChange={handleChange('category')} >
          <option>Choose...</option>
          <option>Electronic</option>
          <option>Books</option>
          <option>Music</option>
          <option>Others</option>
        </Form.Select>
      </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price</Form.Label>          
          <Form.Control  placeholder="Enter Item price" type="number" onChange={handleChange("price")} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control type="file" accept='image/jpg' ref={imageRef} required/>
        </Form.Group>

        <div className='mt-3'>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
        </div>
      </Form>
    </div>
  );
}
