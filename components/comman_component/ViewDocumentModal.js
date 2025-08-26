import { apibasePath } from '@/config';
import Image from 'next/image';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ViewModal = ({ showModal, handleClose, fileData }) => {
  const isImage = fileData && /\.(jpeg|jpg|gif|png)$/i.test(fileData);
  const isPDF = fileData && /\.(pdf)$/i.test(fileData);

  const isArray = Array.isArray(fileData);

  let groupedData = []
  for (let i = 0; i < fileData?.length; i++) {
    if (fileData[i + 1]) {
      groupedData.push(`${fileData[i]}`)
    } else {
      groupedData.push(`${fileData[i]}`)
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose} size='xl'>
     
      <Modal.Body>
        {/* {isArray ? groupedData?.map((fileItem, index) => {
          const items = fileItem.split(', ');
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }}>
              {items.map((item, i) => {
                const [fileName, detailText] = item.split('-');
                return (
                  <div key={i} style={{ marginRight: '10px' }}>
                    <Image
                      width={200}
                      height={100}
                      src={fileName !== "null" ? `${apibasePath}documents/userPdf/${fileName}` : "/images/no-image.png"}
                      alt=''
                    />
                    <div><h6>{detailText}</h6></div>
                  </div>
                );
              })}
            </div>
          );
        }) : (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }}>
            <div style={{ marginRight: '10px' }}>
              <Image
                width={200}
                height={100}
                src={fileData !== "null" ? `${apibasePath}documents/userPdf/${fileData}` : "/images/no-image.png"}
                alt=''
              />
            </div>
          </div>
        )}
         */}
         <Swiper
             modules={[Navigation]}
             spaceBetween={50}
             navigation
             pagination={{ clickable: true }}
             scrollbar={{ draggable: true }}
             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
             breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      480: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 1,
                      },
                      1024: {
                        slidesPerView: 1,
                      },
                    }}
    >
     {isArray ? groupedData?.map((fileItem, index) => {
      const items = fileItem.split(', ');
    return (
        <SwiperSlide key={index}>
        <div style={{display:"flex"}} className='row'>
              {items.map((item, i) => {
                const [fileName, detailText] = item.split('=');
                return (
                  <div key={i} className='col-md-12 '>
                  <h6 style={{height:"30px", fontSize:"20px"}}>{detailText}</h6>
                    <img
                      width="100%"
                      height="600px"
                      src={fileName !== "null" ? `${apibasePath}documents/userPdf/${fileName}` : "/images/no-image.png"}
                      alt=''
                    />
                  </div>
                );
              })}
              </div>
        </SwiperSlide>
    );
}) : (
            <div style={{ marginRight: '10px' }}>
              <img
                 width="100%"
                //  height="100%"
                height="700px"
                src={fileData !== "null" ? `${apibasePath}documents/userPdf/${fileData}` : "/images/no-image.png"}
                alt=''
              />
            </div>
)}
      
      </Swiper>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close </Button>
      </Modal.Footer> */}
      
      
    </Modal>
  );
};

export default ViewModal;




