import React from "react";
import { Modal, Button } from "react-bootstrap";
import introBanner from "../../assets/images/Banner.jpg"; // Ensure correct path
import { Link } from 'react-router-dom'
const AdPopup = ({ showAd, setShowAd }) => {
    const styles = {
        modalBody: {
            width: "100vw",
            height: "100vh", // Ensure full height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: 0,
        },
        image: {
            objectFit: "contain", // Cover the whole screen
            width: "100%",
            height: "100%",
        },
        modalHeader: {
            backgroundColor: "white",
            borderBottom: "none",
        },
        modalFooter: {
            backgroundColor: "#f8f9fa",
            borderTop: "none",
        },
    };

    return (
        <Modal show={showAd} onHide={() => setShowAd(false)} backdrop="static" fullscreen>
 
            <Modal.Body style={styles.modalBody}>
                <img src={introBanner} alt="Ad" style={styles.image} />
            </Modal.Body>
             <Modal.Footer style={styles.modalFooter} className="p-0">
                <Link to='/'>    <button className="btn btn-md btn-primary"  onClick={() => setShowAd(false)}> Continue</button></Link>
            </Modal.Footer>

        </Modal>
    );
};

export default AdPopup;
