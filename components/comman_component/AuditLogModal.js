import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const AuditLogModal = ({ isOpen, onClose, columnContents }) => {

    return (
        <Modal show={isOpen} onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='TripAdminModal'
        >
            <Modal.Header closeButton>
                <Modal.Title><h4>Audit Logs</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div class="manager_edit_detail_inner">
                        <div className="create_project_table">
                            <div className="table-responsive">
                                <Table className='table' >
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>User name</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {columnContents && columnContents.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.id}</td>
                                                <td>{item?.UserData?.name}</td>
                                                <td>{item?.action}</td>
                                                <td>{item?.createdAt.split('T')[0]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AuditLogModal;
