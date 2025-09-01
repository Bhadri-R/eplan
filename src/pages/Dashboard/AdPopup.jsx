import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"; // ✅ Ensure you're using react-bootstrap
import { useLocation } from "react-router-dom";
import introBanner from "../../assets/images/Banner.jpg"; // Ensure the correct path

const AdPopup = () => {
    const [showAdDashboard, setShowAdDashboard] = useState(false);
    const location = useLocation();

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

    // Show modal automatically when user visits '/dashboard'
    useEffect(() => {
        if (location.pathname === "/dashboard") {
            setShowAdDashboard(true);
        }
    }, [location.pathname]);

    return (
        <Modal show={showAdDashboard} onHide={() => setShowAdDashboard(false)} backdrop="static" fullscreen>
            <Modal.Body style={styles.modalBody}>
                <img src={introBanner} alt="Ad" style={styles.image} />
            </Modal.Body>
            <Modal.Footer style={styles.modalFooter} className="p-0">
                <button className="btn btn-md btn-primary" onClick={() => setShowAdDashboard(false)}>
                    Continue
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdPopup;
