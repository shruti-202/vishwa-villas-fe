import React, { useRef, useState } from "react";
import "./CreateAddPage.css";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../FirebaseConfig";

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
  const [imagePaths, setImagePath] = useState([]);
  const [files, setFiles] = useState(null);
  const title = useRef();
  const price = useRef();
  const location = useRef();
  const description = useRef();

  const onImageChange = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
      let imagePathList = [];
      for (const file of event.target.files) {
        imagePathList.push(URL.createObjectURL(file));
      }
      console.log(imagePathList);
      setImagePath(imagePathList);
    }
  };

  const submitAd = (event) => {
    event.preventDefault();
    const storageRef = ref(storage, `/ad-img/${files[0].name}`);
    const upload = uploadBytesResumable(storageRef, files[0]);
  };

  return (
    <div className="create-add-page">
      <div className="create-add-container">
        <div className="create-add-form">
          <h1>List My Property</h1>
          <form onSubmit={submitAd}>
            <FormLabel id="demo-row-radio-buttons-group-label" required>
              Listing Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="RENT" control={<Radio />} label="Rent" />
              <FormControlLabel value="SELL" control={<Radio />} label="Sell" />
            </RadioGroup>
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
              id="filled-multiline-static"
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

export default CreateAddPage;
