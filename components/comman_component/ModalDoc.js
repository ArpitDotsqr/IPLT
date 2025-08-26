import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalDoc = ({ showModal, handleClose, fileData }) => {
  const [imageDataUrl, setImageDataUrl] = useState(null);

  // useEffect(() => {
  //   if (fileData.fitnessValidityImage || fileData.insuranceImage || fileData.rcImageBack || fileData.rcImageFront) {

  //     const file = fileData.fitnessValidityImage || fileData.insuranceImage || fileData.rcImageBack || fileData.rcImageFront;
  //     const reader = new FileReader();

  //     reader.onloadend = function () {
  //       setImageDataUrl(reader.result);
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }, [fileData])

  useEffect(() => {
    let images = [];

    for (const key in fileData) {
      if (fileData[key] && fileData[key] instanceof File) {
        const reader = new FileReader();

        reader.onloadend = function () {
          images.push(reader.result);
          setImageDataUrl([...images]);
        }

        reader.readAsDataURL(fileData[key]);
      }
    }
  }, [fileData]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Documents</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body> */}

        {/* {imageDataUrl && <Image width={200} height={100} src={imageDataUrl} alt='' />} */}
        <Modal.Body>
          {imageDataUrl && (
            <div>
              {imageDataUrl.map((url, index) => (
                <div key={index}>
                  <Image width={200} height={200} src={url} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </Modal.Body>

      {/* </Modal.Body> */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDoc;

