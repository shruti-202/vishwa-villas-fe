import React, { useRef, useState } from "react";
import "./CreateAddPage.css";
import { TextField, Button } from "@mui/material";
import {v4 as uuidV4} from "uuid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../FirebaseConfig";
import { errorAlert, successAlert} from "../../utility/alert";
import { Navigate } from "react-router-dom";

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

function CreateAddPage() {
  const [redirectToHome, setRedirectToHome] = useState(false)
  const [imagePaths, setImagePath] = useState([]);
  const [files, setFiles] = useState(null);
  const title = useRef();
  const price = useRef();
  const location = useRef();
  const description = useRef();
  const imgList = useRef([]);
  const listType = useRef();

  const onImageChange = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
      let imagePathList = [];
      for (const file of event.target.files) {
        imagePathList.push(URL.createObjectURL(file));
      }
      setImagePath(imagePathList);
    }
  };

  const submitAd = async (event) => {
    event.preventDefault();

    const titleVal = title.current.value;
    const priceVal = price.current.value;
    const locationVal = location.current.value;
    const descriptionVal = description.current.value;
    const imgListVal = imgList.current;
    const listTypeVal = listType.current;

    if (!files.length) {
      errorAlert('Please upload the images', 'error');
      return;
    }
    if (!listTypeVal) {
      errorAlert('Please select the list type', 'error')
      return
    }
    if (!titleVal) {
      errorAlert("Please enter the Title","error");
      return;
    }
    if (titleVal.length < 5 || titleVal.length > 100) {
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
    if (descriptionVal.length > 1000) {
      errorAlert('description length should be less than 1000 characters', 'error')
      return
    } 
    if (files?.length > 10) {
      errorAlert("You can upload maximum 10 images", "error");
      return;
    }

    // files upload
    for(const file of files) {
      const fileExt = file.name.split('.').pop();
      const randomFileName = `${uuidV4()}.${fileExt}`;
      const storageRef = ref(storage, `/ad-img/${randomFileName}`);
      const upload = uploadBytesResumable(storageRef, file);
      imgList.current.push(`https://firebasestorage.googleapis.com/v0/b/vishwa-villas-4ad0d.appspot.com/o/ad-img%2F${randomFileName}?alt=media&token=f7a04072-28eb-4d67-921c-97b46ef16e03`)
    }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/item`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleVal,
          price: priceVal,
          location: locationVal,
          description: descriptionVal,
          imgList: imgListVal,
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
    <div className="create-add-page">
      <div className="create-add-container">
        <div className="create-add-form">
          <h2 className="create-add-heading">List My Property</h2>
          <form onSubmit={submitAd}>
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
              onChange={event => {listType.current = event.target.value }}
            >
              <FormControlLabel className="list-type" value="RENT" control={<Radio />} label="Rent" />
              <FormControlLabel className="list-type" value="SELL" control={<Radio />} label="Sell" />
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
              LIST NOW
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CreateAddImageGallery({ imagePaths }) {
  if (imagePaths) {
    return (
      <>
        {imagePaths && (
          <div className="create-add-img-container">
            {imagePaths.map((imgPath, index) => (
              <div className="create-add-img" key={index}>
                <img src={imgPath} alt="" />
              </div>
            ))}
          </div>
        )}
      </>
    );

  }
 
}

export default CreateAddPage;
