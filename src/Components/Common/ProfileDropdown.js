import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import defaultAvatar from "../../assets/images/users/avatar-1.jpg";

const ProfileDropdown = () => {
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userImage, setUserImage] = useState(defaultAvatar);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const userData = sessionStorage.getItem("authUser");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setUserName(user.name);
                setUserRole(user.role);
                setUserImage(user.img || defaultAvatar);

                if (user.expires_in) {
                    let expirationTime = localStorage.getItem("expirationTime");

                    if (!expirationTime) {
                        const now = Date.now();
                        expirationTime = now + user.expires_in * 1000;
                        localStorage.setItem("expirationTime", expirationTime);
                    } else {
                        expirationTime = parseInt(expirationTime, 10);
                    }

                    // Define the interval variable in the correct scope
                    let interval;

                    const updateTime = () => {
                        const now = Date.now();
                        let timeUntilExpiration = expirationTime - now;

                        if (timeUntilExpiration < 0) {
                            timeUntilExpiration = 0;
                        }

                        setCountdown(timeUntilExpiration);

                        const seconds = Math.floor(timeUntilExpiration / 1000);
                        const minutes = Math.floor(seconds / 60);

                        if (minutes === 1 && seconds % 60 === 0) {
                            toast.warn("You will be automatically logged out in 1 minute.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }

                        if (timeUntilExpiration <= 0) {
                            console.log("Token expired automatically! Logging out...");
                            if (interval) {
                                clearInterval(interval); // Now safe to clear
                            }
                            localStorage.removeItem("expirationTime");
                            doLogout();
                        }
                    };

                    // Call updateTime immediately
                    updateTime();
                    // Set the interval after updateTime is defined
                    interval = setInterval(updateTime, 1000);

                    // Cleanup on unmount
                    return () => {
                        if (interval) {
                            clearInterval(interval);
                        }
                    };
                }
            } catch (error) {
                console.error("Error parsing authUser data:", error);
                localStorage.removeItem("expirationTime");
                sessionStorage.removeItem("authUser");
                navigate("/login");
            }
        }
    }, [navigate]);

    const doLogout = () => {
        localStorage.removeItem("expirationTime");
        sessionStorage.removeItem("authUser");
        navigate('/login');
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={userImage} alt="User Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <DropdownItem className='p-0' onClick={doLogout}>
                        <Link to="#" className="dropdown-item">
                            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">Logout</span>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {countdown <= 30000 && countdown > 0 && (
                <div style={{ fontSize: "12px", textAlign: "center", color: "red", textWrap: 'nowrap' }}>
                    {`Expires in ${Math.floor(countdown / 1000)} Sec`}
                </div>
            )}

        </React.Fragment>
    );
};

export default ProfileDropdown;