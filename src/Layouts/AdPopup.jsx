import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import introBanner from "../assets/images/Banner.jpg"; // Ensure correct path
import { Link } from "react-router-dom";

const AdPopup = ({ showAd, setShowAd }) => {
    useEffect(() => {
        if (showAd) {
            document.body.classList.add("modal-open"); // Prevents scrolling when AdPopup is open
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [showAd]);

    const styles = {
        modalBody: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: 0,
        },
        image: {
            objectFit: "contain",
            width: "100%",
            height: "100%",
        },
        modalFooter: {
            backgroundColor: "#f8f9fa",
            borderTop: "none",
        },
    };

    return (
        <Modal
            show={showAd}
            onHide={() => setShowAd(false)}
            backdrop="static"
            fullscreen
            enforceFocus={false} // Prevents modal conflicts
            container={document.getElementById("ad-popup-container")} // Isolates AdPopup
        >
            <Modal.Body style={styles.modalBody}>
                <img src={introBanner} alt="Ad" style={styles.image} />
            </Modal.Body>
            <Modal.Footer style={styles.modalFooter} className="p-0">
                <Link to="/">
                    <Button variant="primary" onClick={() => setShowAd(false)}>
                        Continue
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default AdPopup;
