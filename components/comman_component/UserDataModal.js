import { apibasePath } from '@/config';
import { Modal, Image } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NoDataPage from './NoDataPage';
// import { Button, Modal } from 'react-bootstrap';

const UserDataModal = ({ showModal, handleClose, fileData }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoaded = () => {
        setLoading(false);
    };
    useEffect(() => {
        if (fileData === null) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [showModal])

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body className='p-0'>
                <div style={{ display: 'flex', alignItems: 'center', padding: "5px", justifyContent: 'center' }}>
                    {loading && <p></p>}
                    {fileData !== null ? <Image
                        onLoad={handleImageLoaded}
                        // width={400}
                        // height={300}
                        src={`${apibasePath}documents/userPdf/${fileData}`}
                        style={{ display: loading ? 'none' : 'block', width: "100%" }}
                    />
                        : <NoDataPage name={"Image"} />}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UserDataModal;
