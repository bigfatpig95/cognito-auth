import React, { useRef, useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Col  from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import config from "../config";
import "./NewNote.css";

import { API, graphqlOperation,Storage } from "aws-amplify";// new
import { listListitems } from "../graphql/queries";// new
import { createListitem } from "../graphql/mutations";

import { s3Upload } from "../lib/awsLib";



export default function NewNote() {
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]); 
  const [fetching, setFetching] = useState(false); // new


  //useEffect(() => {
  //  fetchItems();
  //}, []);

 /* async function fetchItems() {
    setFetching(true);
    
    try {
      const itemData = await API.graphql(graphqlOperation(listListitems));
      
      const items = itemData.data.listListitems.items;
      
      setItems(items);
      setFetching(false);
      console.log(items)
    } catch (err) {
      console.error(err);
    }
    setFetching(false);
  }
*/
  const imageRef = useRef();

  const [listForm, setListForm] = useState({
    name: "",
    description: "",  
    category: "",
    image: "",
    price: "",
    
    
  });

  const handleChange = (key) => {
   // console.log(listForm)
   // console.log(key)
    return (e) => {
      console.log(e.target.value)
      console.log(key)
      setListForm({
        ...listForm,
        [key]: e.target.value
      });
    }
  }

  function validateForm() {
    //console.log(listForm)
    return listForm.name.length > 0;
  }

  function handleFileChange(event) {
    console.log(event)

    file.current = event.target.files[0];
   // return (e) => {
     // setListForm({
     //   ...listForm,
     //   [event]: e.target.value
    //  });
   // }
  }

 /* async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);
  }*/

  async function handleSubmit(event) {
  event.preventDefault();


  var fileName = Date.now() + ".jpg";
  setIsLoading(true);
    Storage.put(fileName, imageRef.current.files[0]).then(res => {
      API.graphql({ query: createListitem, variables: { input: {...listForm, image: fileName }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
     // API.graphql(graphqlOperation(createListitem, { input: {
     //   ...listForm,
     //   image: fileName
     // }}))
      .then((e) => {
        setListForm({
          name: "",
          description: "",
          category: "",
          price: "",
        });
        //window.location.href= "/";
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
    })
  };




  //  file.current = event.target.files[0];
   /* if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);
    
    const attachment = file.current ? await s3Upload(file.current) : null;
    console.log('test')
    console.log(attachment)
    setListForm({...listForm, image: attachment});
    console.log(listForm)
    API.graphql({ query: createListitem, variables: { input: {listForm }, authMode: "AMAZON_COGNITO_USER_POOLS" }).then(e => {
    //API.graphql(graphqlOperation(createListitem, { input: listForm, authMode: "AMAZON_COGNITO_USER_POOLS" })).then(e => {
      console.log(e)
      setListForm({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });
      console.log(listForm)
      history.push("/");
    }).catch(err => {
      //  console.log(isAuthenticated)
        console.error(err);
        setIsLoading(false);
    });
  }
  */

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="ItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control placeholder="Enter Item Name" type="text" onChange={handleChange("name")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Enter Item Description" type="text" onChange={handleChange("description")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Control placeholder="Enter Item category" type="text" onChange={handleChange("category")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price</Form.Label>
          <Form.Control  placeholder="Enter Item price" type="text" onChange={handleChange("price")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control type="file" accept='image/jpg' ref={imageRef} />
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


/*<Form.Group as={Col} controlId="formGridState">
        <Form.Label>Cat</Form.Label>
        <Form.Select defaultValue="Choose..." onChange={handleChange('Cat')}>
          <option>Choose...</option>
          <option>Electronic</option>
          <option>Books</option>
          <option>Music</option>
          <option>Cloth</option>
        </Form.Select>
      </Form.Group>*/