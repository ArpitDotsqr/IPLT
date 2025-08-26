import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

export default function GenerateInvoices({ isOpen, onClose }) {
    const [pdfState, setPdfState] = useState(false);

    const handleModalClose = () => {
        onClose();

    };

    useEffect(() => {
        setPdfState(false);
    }, [pdfState]);

    const savePDF = () => {
        var doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
        });
    }
    return (
        <>
            <Modal
                show={isOpen}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="TripAdminModal"
            >
                <Modal.Header style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>
                    <button style={{ padding: "8px", borderRadius: "5px", fontWeight: "500", cursor: "hand" }} onClick={handleModalClose}>❌</button>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12} className="text-end">
                            {!pdfState && (
                                <Button
                                    id="genratePdf"
                                    type="button"
                                    style={{ border: "none" }}
                                    onClick={async () => {
                                        setPdfState(true);
                                        await savePDF();
                                    }}
                                >
                                    Generate Pdf
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
