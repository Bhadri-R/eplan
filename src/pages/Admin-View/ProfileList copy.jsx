import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup, Modal, Input, Button, Table, Container, CardHeader, Card, CardBody, Label, FormFeedback } from 'reactstrap';
import { } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEditSquare } from "react-icons/md";
import { FaDownload, FaEye, FaTrashAlt } from 'react-icons/fa';
import { BASE_URL } from '../../utils/config'
import axios from 'axios';

const ProfileList = () => {
    const [searchClientName, setSearchClientName] = useState('');
    const [usersData, setUsersData] = useState();
    const [searchUserId, setSearchUserId] = useState('');
    const [filteredData, setFilteredData] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(null); // State for pagination data

    useEffect(() => {
        fetchUsersData();
    }, [currentPage]); // Fetch data whenever currentPage changes

    const handleViewUser = (userId) => {
        window.open(`/profile/${userId}`, '_blank');
    };

    const fetchUsersData = async () => {
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
 
                toast.error("Authentication failed! Please log in again.");
                return;
            }
            const response = await axios.get(`${BASE_URL}/api/users/?page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
 
            const responseData = response;
            setUsersData(responseData.results.data);
            setFilteredData(responseData.results.data);

            setPagination({
                count: responseData.count,
                next: responseData.next,
                previous: responseData.previous,
                current_page: responseData.current_page,
                total_pages: responseData.total_pages,
            });
 

        } catch (error) {
 
            toast.error("Failed to fetch users data!");
        }
    };

    const handleSearch = () => {
        const trimmedSearchUserId = searchUserId.trim();

        if (!trimmedSearchUserId) {
            setFilteredData(usersData);
            return;
        }

        const result = usersData.filter(user =>
            user.name &&
            typeof user.name === "string" &&
            user.name.toLowerCase().includes(trimmedSearchUserId.toLowerCase())
        );

        setFilteredData(result);
        setCurrentPage(1);
    };

    const currentItems = filteredData;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) {
            toast.error("Invalid user ID!");
            return;
        }

        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
              
                toast.error("Authentication failed! Please log in again.");
                setLoading(false);
                return;
            }


            const response = await axios.delete(`${BASE_URL}/api/users/${selectedUser.id}/ `, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken} `,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const successMessage = response.message || "User deleted successfully!";
            toast.success(successMessage);
            fetchUsersData(); 
        } catch (error) {
            const errorMessage = error.response?.message || error.response?.data?.message  ;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setDeleteModal(false);
        }
    };

    const [deleteModal, setDeleteModal] = useState(false);
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModal(true);
    };
    const [editModal, setEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditModal(true);
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) {
            toast.error("No user selected for update!");
            return;
        }

        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                toast.error("Authentication failed! Please log in again.");
                setLoading(false);
                return;
            }
            const res = await axios.put(`${BASE_URL}/api/users/${selectedUser.id}/ `,
                selectedUser,
                {
                    headers: {
                        Authorization: `Bearer ${authUser.accessToken} `,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            if (res) {
                const successMessage = res.message || "User updated successfully!";
                toast.success(successMessage);

                setUsersData((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id ? { ...user, ...selectedUser } : user
                    )
                );

                setEditModal(false);
                fetchUsersData();
                return;
            }

            toast.error("Unexpected error occurred while updating.");

        } catch (error) {
            const errorMessage = error.response?.message || error.message ;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = async (userId, newStatus) => {
        if (!userId) {
            toast.error("Invalid user ID!");
            return;
        }

        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                toast.error("Authentication failed! Please log in again.");
                setLoading(false);
                return;
            }

            const res = await axios.patch(
                `< span class="math-inline" >\{ BASE\_URL\ } /api/user / update\-status /</span > { userId } / `,
                { update_status: newStatus, updated_at: new Date().toISOString() },
                {
                    headers: {
                        Authorization: `Bearer ${authUser.accessToken} `,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (res) {
                setUsersData((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, status: newStatus } : user
                    )
                );
                toast.success("User status updated successfully!");
                fetchUsersData();
            } else {
                toast.error("Unexpected error occurred while updating status.");
            }

        } catch (error) {
        
            toast.error(error.response?.data?.message );
        } finally {
            setLoading(false);
        }
    };

    const [viewModal, setViewModal] = useState(false);

    return (
        <div className='page-content'>
            <Card className="p-0 pb-2">
                <CardBody>
                    <Row className='mb-2'>
                        <Col md={6} className='d-flex align-items-center'>
                            <h5>Total Number of Users :<span className='mt-3 text-primary'><b> {pagination ? pagination.count : 0}</b></span></h5>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search by username"
                                    value={searchUserId}
                                    onChange={(e) => setSearchUserId(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <Button color="primary" onClick={handleSearch}>Search</Button>
                        </Col>
                    </Row>
                    <div className="table-responsive">
                        <Table className="table-centered align-middle table-nowrap mb-0 table ">
                            <thead>
                                <tr>
                                    <th>SI No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>User Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.length > 0 ? (
                                    currentItems.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1 + (currentPage - 1) * Math.ceil(pagination.count / pagination.total_pages)}</td>

                                            <td>{user.name}</td>
                                            <td>{user.email}</td>

                                            <td className='text-start'>
                                                <span className={`badge w - 100 ${user.user_role === 'Enterprise' ? 'text-success' : user.user_role === 'Normal' ? 'text-danger' : 'text-primary'} `}>
                                                    {user.user_role}
                                                </span>
                                            </td>


                                            <td className="d-flex justify-content-start">
                                                <Button
                                                    color="white"
                                                    className="me-2"
                                                    style={{ color: '#fabe13' }}
                                                    onClick={() => handleViewUser(user.id)}
                                                >
                                                    <FaEye />
                                                </Button>

                                                <Button color="white" className='me-2' style={{ color: '#28a745' }} onClick={() => handleEditUser(user)}>
                                                    <MdEditSquare />
                                                </Button>
                                                <Button color="white" style={{ color: "#f44336" }} onClick={() => openDeleteModal(user)} key={user.id}>
                                                    <FaTrashAlt />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            {usersData ? "No data found." : "Loading..."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)} centered>
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setDeleteModal(false)}
                                style={{ position: "absolute", right: "15px", top: "15px", background: "none", border: "none" }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
                        </div>
                        <div className="modal-footer">
                            <Button color="danger" onClick={handleDeleteUser} disabled={loading}>
                                {loading ? "Deleting..." : "Delete"}
                            </Button>
                            <Button color="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
                        </div>
                    </Modal>
                    {
                        (editModal || viewModal) && selectedUser && (
                            <div className={`modal modal-overlay-editview fade ${editModal || viewModal ? "show d-block" : ""} `} tabIndex="-1" role="dialog">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{viewModal ? "View User" : "Edit User"}</h5>
                                            <button type="button" className="btn-close" onClick={() => { setEditModal(false); setViewModal(false); }}></button>
                                        </div>

                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Name:</label>
                                                <input type="text" className="form-control" value={selectedUser?.name || ""}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} disabled={viewModal} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Email:</label>
                                                <input type="email" className="form-control" value={selectedUser?.email || ""}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} disabled={viewModal} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">User Role:</label>

                                                <select
                                                    value={selectedUser?.user_role || ""}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, user_role: e.target.value })} disabled={viewModal}
                                                    className="form-select"
                                                >
                                                    <option value="Enterprise">Enterprise</option>
                                                    <option value="Normal">Normal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {viewModal ? (
                                                <button className="btn btn-secondary" onClick={() => setViewModal(false)}>Close</button>
                                            ) : (
                                                <>
                                                    <button className="btn btn-primary" onClick={handleUpdateUser} disabled={loading}>
                                                        {loading ? "Updating..." : "Update"}
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => setEditModal(false)}>Cancel</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {pagination && (
                        <div className="row m-2">
                            <div className="col-md-6 d-flex justify-content-start align-items-center ps-0">
                                Page {currentPage} of {pagination.total_pages}
                            </div>
                            <div className="col-md-6 d-flex justify-content-end align-items-center pe-0">
                                <nav>
                                    <ul className="pagination mb-0">
  
                                        <li className="page-item me-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>

                                        {/* Current Page */}
                                        <li className="page-item me-2">
                                            <button className="btn btn-sm btn-primary" >
                                                {currentPage}
                                            </button>
                                        </li>

                                        {/* Next Button */}
                                        <li className="page-item me-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === pagination.total_pages}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}


                </CardBody >
            </Card >
        </div >
    );
};

export default ProfileList;