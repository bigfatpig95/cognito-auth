import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";


import {graphqlOperation } from "aws-amplify";
import { listListitems } from "../graphql/queries";
import { getListitem } from "../graphql/queries";
import { deleteListitem } from "../graphql/mutations";
import { updateListitem } from "../graphql/mutations";

import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";

import {AmplifyS3Image} from "@aws-amplify/ui-react";

import Image from 'react-bootstrap/Image'

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const imageRef = useRef();
  const [listForm, setListForm] = useState({
    name: "",
    description: "",  
    category: "",
    image: "",
    //createdAt:"",
    //createdAt:'',
   // price:"",
    
    
  });

  const handleChange = (key) => {
    // console.log(listForm)
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
      //\const items = itemData.data.listListitems.items;
      const items = itemData.data.getListitem;
      console.log(items)
     // console.log(itemData.data.getListitem.image)
      setItems(items);
      setListForm({
        name: items.name,
        description: items.description,  
        category: items.category,
        image: items.image,
      });
      console.log(items.image)
    //  console.log(listForm)
      setFetching(false);
      //console.log(items)
      
    } catch (err) {
      console.error(err);
    }
    setFetching(false);
  }


  
  /*useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);*/

  function validateForm() {
    return listForm.name.length > 0;
  }
  
 /* function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }*/
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
   // console.log(items.image)
    /*if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }*/
  var fileName = Date.now() + ".jpg";
  
 // 
  setIsLoading(true);
  console.log(listForm)
  //console.log(imageRef)
  console.log(imageRef.current.files.length)
  if (imageRef.current.files.length >1){
    for (let i = 0; i < imageRef.current.files.length; i++) {
      console.log(imageRef.current.files[i])
    //console.log(imageRef.current.files[1])
  }
}
  if (imageRef.current.files[0]){
    await Storage.remove(items.image)
    Storage.put(fileName, imageRef.current.files[0]).then(res => {
    API.graphql({ query: updateListitem, variables: { input: {...listForm, id: id, image: fileName }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
    .then((e) => {
      // console.log('test')
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
  //  Storage.put(fileName, imageRef.current.files[0]).then(res => {
      API.graphql({ query: updateListitem, variables: { input: {...listForm, id: id }}, authMode: "AMAZON_COGNITO_USER_POOLS" })
     // API.graphql(graphqlOperation(createListitem, { input: {
     //   ...listForm,
     //   image: fileName
     // }}))
      .then((e) => {
       // console.log('test')
        setListForm({
          id:"",
          name: "",
          description: "",
          category: "",
          price: "",
        });
        history.push("/");
        //window.location.href= "/";
       // await Storage.remove(items.image)
       // setListForm({
       //   name: '',
        //  image: null});
        
  //    })
  //    .catch((err) => {
  //      console.error(err);
  //      setIsLoading(false);
  //    });
    })
  }}
  
  async function handleDelete({id}) {
    //event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
    console.log(id)

    await API.graphql({ query: deleteListitem, variables: { input: { id } }, authMode: "AMAZON_COGNITO_USER_POOLS"});
    history.push("/");

  }
  
 
 
  return (
    <div className="Notes">
      <Image src={'https://carousell82244-staging.s3.ap-southeast-1.amazonaws.com/public/' + items.image} fluid />

      {items && (
        
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3" controlId="ItemName">
          <Form.Label>Item Name</Form.Label>
          
          <Form.Control defaultValue = {items.name} type="text" onChange={handleChange("name")} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          
          <Form.Control defaultValue = {items.description} type="text" onChange={handleChange("description")} onSelect={handleChange("description")} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          
          <Form.Control defaultValue = {items.category} type="text" onChange={handleChange("category")} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          
          <Form.Control defaultValue = {items.price} type="text" onChange={handleChange("price")} />
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
            //disabled={!validateForm()}
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
  