import React, { useEffect, useRef, useState } from "react";
import "./EditAddPage.css";
import { TextField, Button } from "@mui/material";
import {v4 as uuidV4} from "uuid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../FirebaseConfig";
import { errorAlert, successAlert} from "../../utility/alert";
import { Navigate, useParams } from "react-router-dom";

const descDefaultVal = `Type: House/Apartment/Condo/Villa/Other
Bedrooms: 
Bathrooms: 
Furnishing: Non/Semi/Fully Furnished
Listed by: 
Super Builtup area (ft²): 
Carpet Area (ft²): 
Bachelors Allowed: 
Maintenance (Monthly): 
Total Floors: 
Floor No: 
Car Parking: Yes/No
Facing: North/East/West/South
Project Name: `;

function EditAddPage() {
  const [redirectToHome, setRedirectToHome] = useState(false)
  const [imagePaths, setImagePath] = useState([]);
  const [files, setFiles] = useState(null);
  const title = useRef();
  const price = useRef();
  const location = useRef();
  const description = useRef();
  const imgList = useRef([]);
  const [listType, setListType ]= useState();
 
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState();  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/item/${itemId}`, {
      credentials: "include",
    })
      .then((response) => response.json())  
      .then((data) => {
        if (data.data) {
          setItemDetails(data.data)
          title.current.value = data.data.title;
          location.current.value = data.data.location;
          price.current.value = data.data.price;
          description.current.value = data.data.description;
          setListType(data.data.listType);
          setImagePath(data.data.imgList);
        } else {
        }
      });
  }, []);

  const onImageChange = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
      let imagePathList = [];
      for (const file of event.target.files) {
        imagePathList.push(URL.createObjectURL(file));
      }
      setImagePath(data.data.imgList);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const titleVal = title.current.value;
    const priceVal = price.current.value;
    const locationVal = location.current.value;
    const descriptionVal = description.current.value;
    const imgListVal = imgList.current;
    const listTypeVal = listType;

    if (!listTypeVal) {
      errorAlert('Please select the list type', 'error')
      return
    }
    if (!titleVal) {
      errorAlert("Please enter the Title","error");
      return;
    }
    if (titleVal?.length < 5 || titleVal?.length > 100) {
      errorAlert("Title length should be greater than 5 and lesser than 100","error");
      return;
    }
    if (!price) {
      errorAlert("Please enter price","error");
      return;
    }
    if (price < 0 || price > 1000000000) {
      errorAlert("Price should be greater than 0 and less than 100,00,00,000", );
      return;
    }
    if (descriptionVal?.length > 1000) {
      errorAlert('description length should be less than 1000 characters', 'error')
      return
    } 
    if (files?.length > 10) {
      errorAlert("You can upload maximum 10 images", "error");
      return;
    }

    //files upload
    if (files) {
      for(const file of files) {
        const fileExt = file.name.split('.').pop();
        const randomFileName = `${uuidV4()}.${fileExt}`;
        const storageRef = ref(storage, `/ad-img/${randomFileName}`);
        const upload = uploadBytesResumable(storageRef, files[0]);
        imgList.current.push(`https://firebasestorage.googleapis.com/v0/b/vishwa-villas-b09e0.appspot.com/o/ad-img%2F${randomFileName}?alt=media&token=0a95dfd4-c4d1-44ae-a9d8-b9201d64d4bb`)
      }
    }
    
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/item/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleVal,
          price: priceVal,
          location: locationVal,
          description: descriptionVal,
          imgList: files ? imgListVal : imagePaths,
          listType: listTypeVal
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.ok) {
      successAlert(data.success, "success");
      setRedirectToHome(true);
     
    } else {
      errorAlert(data.error, "error");
    }
  };

  if (redirectToHome) {
    return <Navigate to="/"/>
  }

  return (
    <div className="edit-add-page">
      <div className="edit-add-container">
        <div className="edit-add-form">
          <h2 className="edit-heading">Edit Property Details</h2>
          <form onSubmit={handleSubmit}>
          <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="upload-images-label"
              required
            >
              Upload Images
            </FormLabel>
            <CreateAddImageGallery imagePaths={imagePaths} />
            <input
              type="file"
              className="upload-images-input"
              multiple
              accept="image/*"
              onChange={onImageChange}
            />
            <FormLabel id="demo-row-radio-buttons-group-label" required>
              Listing Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={event => {setListType(event.target.value)}}
            >
               <FormControlLabel value="RENT" control={<Radio checked={'RENT' === listType } />} label="Rent"/>
               <FormControlLabel value="SELL" control={<Radio checked={'SELL' === listType }  />} label="Sell" />
            </RadioGroup>
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="title"
              label="Title"
              autoComplete="off"
              variant="outlined"
              inputRef={title}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="price"
              label="Price"
              type="number"
              autoComplete="off"
              variant="outlined"
              inputRef={price}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="location"
              label="Location"
              autoComplete="off"
              variant="outlined"
              inputRef={location}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="description"
              label="Description"
              multiline
              rows={5}
              defaultValue={descDefaultVal}
              autoComplete="off"
              variant="outlined"
              inputRef={description}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: "10px",
                width: "100%",
                backgroundColor: "var(--primary-color)",
                color: "var(--ternary-color)",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              type="submit"
            >
              EDIT
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CreateAddImageGallery({ imagePaths }) {
  return (
    <>
      {imagePaths && (
        <div className="edit-add-img-container">
          {imagePaths.map((imgPath, index) => (
            <div className="edit-add-img" key={index}>
              <img src={imgPath} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default EditAddPage;

