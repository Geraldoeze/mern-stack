import React, { useRef, useState, useEffect } from 'react';
import Button from './Button/Button';

import './ImageUpload.css';


const ImageUpload = props => {
    const filePickerRef = useRef();

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            console.log('Na here')
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file)
    }, [file]);

    const pickedHandler = event => {
    
        let pickedFile;
        let fileIsValid = isValid;//this enables us to pass a change-able state when needed
        if (event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            console.log(file)
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        console.log(pickedFile)
        props.onInput(props.id, pickedFile, fileIsValid)
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className='form-control'>
            <input 
              ref={filePickerRef}
              id={props.id} 
              style={{display: 'none'}} 
              type="file" 
              accept=".jpg, .png, .jpeg"
              onChange={pickedHandler}
            />
          <div className={`image-upload ${props.center && 'center'}`}>
              <div className='image-upload__preview'>
                  {previewUrl && <img scr={previewUrl} alt="Preview" />}
                  {!previewUrl && <p>Please pick an image.</p>}
              </div>
              <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
          </div>
          {!isValid && <p>{props.errorText}</p>}
        </div>
    )

}

export default ImageUpload;

