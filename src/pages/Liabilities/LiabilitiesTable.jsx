import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Table,
} from "reactstrap";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEditSquare } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const LiabilitiesTable = ({ liabilities, refreshLiability, loading }) => {
  const [hoveredRow, setHoveredRow] = useState(null); // Track which row is being hovered
  const [liabilitiesData, setLiabilitiesData] = useState([]);
  const [searchBillId, setSearchBillId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const API_URL = `${BASE_URL}/api/liability/liability/`;
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Update liabilitiesData and filteredData when the liabilities prop changes
  useEffect(() => {
    setLiabilitiesData(liabilities);
    setFilteredData(liabilities);
  }, [liabilities]);

  const handleSearch = () => {
    const trimmedSearchBillId = searchBillId.trim();

    if (!trimmedSearchBillId) {
      setFilteredData(liabilitiesData);
      return;
    }

    const result = liabilitiesData.filter(
      (liability) =>
        liability.source &&
        typeof liability.source === "string" &&
        liability.source
          .toLowerCase()
          .includes(trimmedSearchBillId.toLowerCase())
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteLiability = async () => {
    setDeleteModal(false);
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

      toast.success(res.data?.message || "Liability deleted successfully!");

      setLiabilitiesData((prev) =>
        prev.filter((liability) => liability.id !== deleteId)
      );
      setFilteredData((prev) =>
        prev.filter((liability) => liability.id !== deleteId)
      );
    } catch (error) {
      console.error("Error deleting liability:", error);
      toast.error(error.response?.data?.message || "Error deleting liability.");
    }
  };

  // Edit and View logic remains unchanged for brevity
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedLiability, setSelectedLiability] = useState(null);
  // const [loading, setLoading] = useState(false);
  const handleEditLiability = (liability) => {
    setSelectedLiability(liability);
    setEditModal(true);
  };

  const handleViewLiability = (liability) => {
    setSelectedLiability(liability);
    setViewModal(true);
  };

  const handleUpdateLiability = async () => {
    if (!selectedLiability) {
      console.error("No Liability selected for update!");
      toast.error("No Liability selected for update!");
      return;
    }

    // setLoading(true);

    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        console.error("No authentication token found!");
        // setLoading(false);
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

      const successMessage =
        res.message || res.data?.message || "Liability updated successfully!";
      toast.success(successMessage);

      // Update the liabilitiesData state after update
      setLiabilitiesData((prev) =>
        prev.map((liability) =>
          liability.id === selectedLiability.id
            ? { ...liability, ...selectedLiability }
            : liability
        )
      );
      setFilteredData((prev) =>
        prev.map((liability) =>
          liability.id === selectedLiability.id
            ? { ...liability, ...selectedLiability }
            : liability
        )
      );

      setEditModal(false);
    } catch (error) {
      console.error(
        "Error updating liability:",
        error.response ? error.response.data : error.message
      );
      const errorMessage =
        error.response?.message ||
        error.response?.data?.message ||
        "Error updating liability.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Row className="mb-2">
            <Col md={6}>
              <h5>Liabilities List</h5>
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
              <Button color="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>

          <div style={{ overflowX: "auto", position: "relative" }}>
            <Table className="table-centered align-middle table-nowrap mb-0 table">
              <thead>
                <tr>
                  <th>SI No.</th>
                  <th>Client Name</th>
                  <th>Type</th>
                  <th>Account Name</th>
                  <th>Interest Rate</th>
                  <th>Description</th>
                  <th>Monthly Payment</th>
                  <th>Current Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((liability, index) => (
                    <tr key={liability.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{liability.source}</td>
                      <td>{liability.type}</td>
                      <td>{liability.account}</td>
                      <td>{liability.interestRate}</td>
                      <td
                        style={{ position: "relative", overflow: "visible" }}
                        onMouseEnter={() => setHoveredRow(index)} // Set hovered row on description cell
                        onMouseLeave={() => setHoveredRow(null)} // Clear hovered row
                      >
                        {liability.description}
                        {hoveredRow === index && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%", // Position below the description
                              left: "50%", // Center the popup
                              transform: "translateX(-50%)", // Adjust for centering
                              backgroundColor: "#fff",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              padding: "5px",
                              zIndex: 1000,
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                              display: "flex",
                              gap: "5px",
                              whiteSpace: "nowrap", // Prevent buttons from wrapping
                            }}
                          >
                            <Button
                              color="white"
                              style={{ color: "#fabe13" }}
                              onClick={() => handleViewLiability(liability)}
                            >
                              <FaEye />
                            </Button>
                            <Button
                              color="white"
                              style={{ color: "#28a745" }}
                              onClick={() => handleEditLiability(liability)}
                            >
                              <MdEditSquare />
                            </Button>
                            <Button
                              color="white"
                              style={{ color: "#f44336" }}
                              onClick={() => confirmDelete(liability.id)}
                            >
                              <FaTrashAlt />
                            </Button>
                          </div>
                        )}
                      </td>
                      <td>
                        $
                        {liability.monthlyPayment != null && !isNaN(Number(liability.monthlyPayment))
                          ? Number(liability.monthlyPayment).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          : "0.00"}
                      </td>


                      <td>
                        $
                        {liability.currentBalance != null && !isNaN(Number(liability.currentBalance))
                          ? Number(liability.currentBalance).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          : "0.00"}
                      </td>
 
                      <td className="d-flex justify-content-start">
                        <Button
                          color="white"
                          className="me-2"
                          style={{ color: "#fabe13" }}
                          onClick={() => handleViewLiability(liability)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          color="white"
                          className="me-2"
                          style={{ color: "#28a745" }}
                          onClick={() => handleEditLiability(liability)}
                        >
                          <MdEditSquare />
                        </Button>
                        <Button
                          color="white"
                          style={{ color: "#f44336" }}
                          onClick={() => confirmDelete(liability.id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Delete Confirmation Modal */}
          <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
            <ModalHeader toggle={() => setDeleteModal(false)}>
              Confirm Deletion
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete this liability record?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={handleDeleteLiability}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
              <Button color="secondary" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {(editModal || viewModal) && selectedLiability && (
            <div
              className={`modal modal-overlay-editview fade ${editModal || viewModal ? "show d-block" : ""
                }`}
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {viewModal ? "View Liability" : "Edit Liability"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setEditModal(false);
                        setViewModal(false);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Client Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedLiability?.source || ""}
                        onChange={(e) =>
                          setSelectedLiability({
                            ...selectedLiability,
                            source: e.target.value,
                          })
                        }
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedLiability?.type || ""}
                        onChange={(e) =>
                          setSelectedLiability({
                            ...selectedLiability,
                            type: e.target.value,
                          })
                        }
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Account Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedLiability?.account || ""}
                        onChange={(e) =>
                          setSelectedLiability({
                            ...selectedLiability,
                            account: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Interest Rate </label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedLiability?.interestRate || ""}
                        onChange={(e) =>
                          setSelectedLiability({
                            ...selectedLiability,
                            interestRate: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Monthly Payment:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedLiability?.monthlyPayment || ""}
                        onChange={(e) =>
                          setSelectedLiability({
                            ...selectedLiability,
                            monthlyPayment: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Current Balance:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedLiability?.currentBalance || ""}
                        onChange={(e) =>
                          setSelectedLiability({
                            ...selectedLiability,
                            currentBalance: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    {viewModal ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setViewModal(false)}
                      >
                        Close
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={handleUpdateLiability}
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Update"}
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => setEditModal(false)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <div className="row m-2">
              <div className="col-md-6 d-flex justify-content-start align-items-center ps-0">
                Page {currentPage} of {totalPages}
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
                    <li className="page-item me-2">
                      <button className="btn btn-sm btn-primary">
                        {currentPage}
                      </button>
                    </li>
                    <li className="page-item me-2">
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
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LiabilitiesTable;
