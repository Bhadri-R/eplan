import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardHeader, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Table } from 'reactstrap';
import { FaDownload, FaEye, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEditSquare } from "react-icons/md";
import axios from 'axios';
import { BASE_URL } from '../../utils/config'
const LiabilitiesTable = ({ refreshLiability }) => {
    const [liabilitiesData, setLiabilitiesData] = useState([]);
    const [searchBillId, setSearchBillId] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const API_URL = `${BASE_URL}/api/liability/liability/`;
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchLiabilitiesData();
    }, []);
    useEffect(() => {
        fetchLiabilitiesData();
    }, [refreshLiability]);

    const fetchLiabilitiesData = async () => {
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                return;
            }

            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("Full API Response:", response);

            const liabilitiesData = response.data ?? response;

            setLiabilitiesData(liabilitiesData);
            setFilteredData(liabilitiesData);

            console.log("Updated liabilitiesData:", liabilitiesData);
            console.log("Updated filteredData:", liabilitiesData);

        } catch (error) {
            console.error("Error fetching liabilities data:", error);
        }
    };

    const handleSearch = () => {
        const trimmedSearchBillId = searchBillId.trim();
    
        if (!trimmedSearchBillId) {
            setFilteredData(liabilitiesData);
            return;
        }
    
        const result = liabilitiesData.filter(liability =>
            liability.source &&
            typeof liability.source === "string" &&
            liability.source.toLowerCase().includes(trimmedSearchBillId.toLowerCase())
        );
    
        setFilteredData(result);
        setCurrentPage(1); // Reset to first page after search
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log("Filtered Data:", filteredData);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        console.log("Updated Liabilities Data:", liabilitiesData);
    }, [liabilitiesData]);

    useEffect(() => {
        console.log("Updated filteredData:", filteredData);
    }, [filteredData]);



    const [loading, setLoading] = useState(false);


    const handleDeleteLiability = async () => {
        setDeleteModal(false);
        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser?.accessToken) {
                return;
            }

            const res = await axios.delete(`${API_URL}${deleteId}/`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                },
            });

            console.log("Full API Response:", res);

            // ✅ Extract message from response (directly if available)
            const successMessage = res.message || res.data?.message || "Liability deleted successfully!";
            toast.success(successMessage);
            fetchLiabilitiesData();

        } catch (error) {
            console.error("Error deleting liability:", error.response ? error.response.data : error.message);

            // ✅ Extract error message directly from the response
            const errorMessage = error.response?.message || error.response?.data?.message || "Error deleting liability.";
            toast.error(errorMessage);

        } finally {
            setLoading(false);
        }
    };


    // UPDATE 
    const [editModal, setEditModal] = useState(false);
    const [selectedLiability, setSelectedLiability] = useState(null);

    const handleEditLiability = (liability) => {
        setSelectedLiability(liability);
        setEditModal(true);
    };

    const handleUpdateLiability = async () => {
        if (!selectedLiability) {
            console.error("No Liability selected for update!");
            toast.error("No Liability selected for update!");
            return;
        }

        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                setLoading(false);
                return;
            }

            console.log("Updating liability:", selectedLiability);

            const res = await axios.put(
                `${BASE_URL}/api/liability/liability/${selectedLiability.id}/`,
                selectedLiability,
                {
                    headers: {
                        Authorization: `Bearer ${authUser.accessToken}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            console.log("Full API Response:", res);

            // ✅ Extract message from response (directly if available)
            const successMessage = res.message || res.data?.message || "Liability updated successfully!";
            toast.success(successMessage);

            setLiabilitiesData((prevLiabilities) =>
                prevLiabilities.map((liability) =>
                    liability.id === selectedLiability.id ? { ...liability, ...selectedLiability } : liability
                )
            );

            setEditModal(false);
            fetchLiabilitiesData();

        } catch (error) {
            console.error("Error updating liability:", error.response ? error.response.data : error.message);

            // ✅ Extract error message directly from the response
            const errorMessage = error.response?.message || error.response?.data?.message || "Error updating liability.";
            toast.error(errorMessage);

        } finally {
            setLoading(false);
        }
    };



    // VIEW MODAL 
    const [viewModal, setViewModal] = useState(false);

    // Open View Modal
    const handleViewLiability = (liability) => {
        setSelectedLiability(liability);
        setViewModal(true);
        setEditModal(false);
    };


    return (
        <div>
            <Card>
                <CardBody>
                    <Row className='mb-2'>
                        <Col md={6}>
                            <h5> Liabilities List </h5>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search by Client Name"
                                    value={searchBillId}
                                    onChange={(e) => setSearchBillId(e.target.value)}
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
                                    <th>Client Name</th>
                                    <th>Type</th>
                                    <th>Account</th>
                                    <th>Description</th>
                                    <th>Monthly Payment</th>
                                    <th>Current Balance</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.length > 0 ? ( // Use currentItems here
                                    currentItems.map((liabilities, index) => (
                                        <tr key={liabilities.id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{liabilities.source}</td>
                                            <td>{liabilities.type}</td>
                                            <td>{liabilities.account}</td>
                                            <td>{liabilities.description}</td>
                                            <td>{liabilities.monthlyPayment}</td>
                                            <td>{liabilities.currentBalance}</td>
                                            <td className="d-flex justify-content-start">
                                                <Button color="white" className='me-2' style={{ color: '#fabe13' }} onClick={() => handleViewLiability(liabilities)}>
                                                    <FaEye />
                                                </Button>
                                                <Button color="white" className='me-2' style={{ color: '#28a745' }} onClick={() => handleEditLiability(liabilities)}>
                                                    <MdEditSquare />
                                                </Button>

                                                <Button color="white" style={{ color: '#f44336' }} onClick={() => confirmDelete(liabilities.id)}>
                                                    <FaTrashAlt />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            {liabilitiesData ? "No data found." : "Loading..."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>



                    {/* Delete Confirmation Modal */}
                    <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
                        <ModalHeader toggle={() => setDeleteModal(false)}>Confirm Deletion</ModalHeader>
                        <ModalBody>Are you sure you want to delete this libility record?</ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={handleDeleteLiability} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                            <Button color="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>



                    {(editModal || viewModal) && selectedLiability && (
                        <div className={`modal modal-overlay-editview fade ${editModal || viewModal ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    {/* Modal Header */}
                                    <div className="modal-header">
                                        <h5 className="modal-title">{viewModal ? "View Liability" : "Edit Liability"}</h5>
                                        <button type="button" className="btn-close" onClick={() => { setEditModal(false); setViewModal(false); }}></button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label">Client Name:</label>
                                            <input type="text" className="form-control" value={selectedLiability?.source || ""}
                                                onChange={(e) => setSelectedLiability({ ...selectedLiability, source: e.target.value })} disabled />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Type:</label>
                                            <input type="text" className="form-control" value={selectedLiability?.type || ""}
                                                onChange={(e) => setSelectedLiability({ ...selectedLiability, type: e.target.value })} disabled />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Account:</label>
                                            <input type="text" className="form-control" value={selectedLiability?.account || ""}
                                                onChange={(e) => setSelectedLiability({ ...selectedLiability, account: e.target.value })} disabled={viewModal} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Monthly Payment:</label>
                                            <input type="text" className="form-control" value={selectedLiability?.monthlyPayment || ""}
                                                onChange={(e) => setSelectedLiability({ ...selectedLiability, monthlyPayment: e.target.value })} disabled={viewModal} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Current Balance:</label>
                                            <input type="text" className="form-control" value={selectedLiability?.currentBalance || ""}
                                                onChange={(e) => setSelectedLiability({ ...selectedLiability, currentBalance: e.target.value })} disabled={viewModal} />
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="modal-footer">
                                        {viewModal ? (
                                            <button className="btn btn-secondary" onClick={() => setViewModal(false)}>Close</button>
                                        ) : (
                                            <>
                                                <button className="btn btn-primary" onClick={handleUpdateLiability} disabled={loading}>
                                                    {loading ? "Updating..." : "Update"}
                                                </button>
                                                <button className="btn btn-danger" onClick={() => setEditModal(false)}>Cancel</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="col-12 d-flex justify-content-end align-items-center">
                        {totalPages > 1 && (
                            <nav className="d-flex justify-content-end m-2">
                                <ul className="pagination">
                                    {/* Previous Button */}
                                    <li className="page-item me-2">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {/* Always show first 3 pages */}
                                    {[1, 2, 3].map((page) =>
                                        page <= totalPages ? (
                                            <li key={page} className="page-item me-2">
                                                <button
                                                    className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-outline-primary"}`}
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        ) : null
                                    )}

                                    {/* Ellipsis before current page if necessary */}
                                    {currentPage > 4 && <li className="page-item me-2"> <span className="btn btn-sm btn-light">...</span> </li>}

                                    {/* Current Page */}
                                    {currentPage > 3 && currentPage < totalPages && (
                                        <li className="page-item me-2">
                                            <button className="btn btn-sm btn-primary">{currentPage}</button>
                                        </li>
                                    )}

                                    {/* Ellipsis after current page if necessary */}
                                    {currentPage < totalPages - 2 && <li className="page-item me-2"> <span className="btn btn-sm btn-light">...</span> </li>}

                                    {/* Next Button */}
                                    <li className="page-item  me-2">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>

                </CardBody >
            </Card>
        </div >

    );
};

export default LiabilitiesTable;