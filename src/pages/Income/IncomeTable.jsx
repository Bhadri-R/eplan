import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Table,
} from "reactstrap";
import { FaDownload, FaEye, FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const IncomeTable = ({ refresh }) => {
  const [clients, setClients] = useState([]);
  const [loadingClient, setLoadingClient] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [searchBillId, setSearchBillId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [incomeGoal, setIncomeGoal] = useState("");
  const API_URL = `${BASE_URL}/api/income/income/`;

  // Fetch authUser at the component level
  const authUser = JSON.parse(sessionStorage.getItem("authUser"));

  useEffect(() => {
    fetchIncomeData();
  }, []);

  useEffect(() => {
    fetchIncomeData();
  }, [refresh]);

  useEffect(() => {
    fetchIncomeGoal();
  }, []);

  // Debug the incomeGoal state
  useEffect(() => {
    console.log("incomeGoal state updated:", incomeGoal);
  }, [incomeGoal]);

  const fetchIncomeGoal = async () => {
    setIsFetching(true);
    try {
      if (!authUser || !authUser.accessToken) {
        console.error("No authentication token found!");
        toast.error("Authentication token missing. Please log in again.");
        setIncomeGoal("");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/income/income/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Full Axios Response:", response);
      console.log("response.data:", response.data);

      const data = response.data;
      if (data && typeof data === "object" && "incomeGoal" in data) {
        console.log("data.incomeGoal:", data.incomeGoal);
        if (data.incomeGoal != null) {
          const goal = data.incomeGoal.toString();
          console.log("Setting incomeGoal to:", goal);
          setIncomeGoal(goal);
        } else {
          console.log("incomeGoal is null or undefined in the response");
          setIncomeGoal("");
        }
      } else {
        console.log("response.data does not contain incomeGoal, trying response directly:", response);
        if (response && typeof response === "object" && "incomeGoal" in response) {
          console.log("response.incomeGoal:", response.incomeGoal);
          if (response.incomeGoal != null) {
            const goal = response.incomeGoal.toString();
            console.log("Setting incomeGoal to:", goal);
            setIncomeGoal(goal);
          } else {
            console.log("incomeGoal is null or undefined in the response");
            setIncomeGoal("");
          }
        } else {
          console.log("Neither response.data nor response contains incomeGoal:", response);
          setIncomeGoal("");
        }
      }
    } catch (error) {
      console.error("Error fetching income goal:", error);
      toast.error(error.response?.message || "Error fetching income goal.");
      setIncomeGoal("");
    } finally {
      setIsFetching(false);
    }
  };

  const fetchIncomeData = async () => {
    setLoading(true);
    try {
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

      const incomeData = response.data ?? response;
      setIncomeData(incomeData);
      setFilteredData(incomeData);

      console.log("Updated incomeData:", incomeData);
      console.log("Updated filteredData:", incomeData);
    } catch (error) {
      console.error("Error fetching income data:", error);
      toast.error("Error fetching income data.");
    } finally {
      setLoading(false);
    }
  };

  // Format the incomeGoal for display
  const formatIncomeGoalForDisplay = (value) => {
    if (!value) return "0.00";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSearch = () => {
    const trimmedSearchBillId = searchBillId.trim();
    if (!trimmedSearchBillId) {
      setFilteredData(incomeData);
      return;
    }

    const result = incomeData.filter(
      (income) =>
        income.source &&
        typeof income.source === "string" &&
        income.source.toLowerCase().includes(trimmedSearchBillId.toLowerCase())
    );

    setFilteredData(result);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteIncome = async () => {
    setDeleteModal(false);
    setLoading(true);

    try {
      if (!authUser?.accessToken) {
        setLoading(false);
        return;
      }

      const res = await axios.delete(`${API_URL}${deleteId}/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });

      console.log("Full API Response:", res);

      const successMessage = res?.message || "Income deleted successfully!";
      toast.success(successMessage, { toastId: "income-delete-success" });

      fetchIncomeData();
    } catch (error) {
      console.error("Error deleting income:", error);
      const errorMessage = error.response?.message || "Error deleting income.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  // UPDATE
  const [editModal, setEditModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleEditIncome = (income) => {
    setSelectedIncome(income);
    setEditModal(true);
  };

  const handleUpdateIncome = async () => {
    if (!selectedIncome) {
      console.error("No Income selected for update!");
      toast.error("No Income selected for update!");
      return;
    }

    setLoading(true);

    try {
      if (!authUser || !authUser.accessToken) {
        console.error("No authentication token found!");
        setLoading(false);
        return;
      }

      console.log("Updating income:", selectedIncome);

      const res = await axios.put(
        `${BASE_URL}/api/income/income/${selectedIncome.id}/`,
        selectedIncome,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Full API Response:", res);

      const successMessage = res.message || "Income updated successfully!";
      toast.success(successMessage, { toastId: "income-update-success" });

      setIncomeData((prevIncome) =>
        prevIncome.map((income) =>
          income.id === selectedIncome.id
            ? { ...income, ...selectedIncome }
            : income
        )
      );

      setEditModal(false);
      fetchIncomeData();
    } catch (error) {
      console.error("Error updating income:", error);
      const errorMessage = error.response?.message || "Error updating income.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // VIEW MODAL
  const [viewModal, setViewModal] = useState(false);

  const handleViewIncome = (income) => {
    setSelectedIncome(income);
    setViewModal(true);
    setEditModal(false);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Row className="mb-2">
            <Col md={6}>
              <h5>Income List</h5>
              <h5>Income Goal: <span className="text-primary"> ${formatIncomeGoalForDisplay(incomeGoal)}</span> </h5>
            </Col>
            {/* <Col md={6} className="  d-flex align-items-center justify-content-end">
              <h5>Income Goal: <span className="text-primary"> ${formatIncomeGoalForDisplay(incomeGoal)}</span> </h5>
            </Col> */}

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
          <Row>
            <div className="table-responsive">
              <Table className="table-centered align-middle table-nowrap mb-0 table">
                <thead>
                  <tr>
                    <th>SI No.</th>
                    <th>Client Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    {/* <th>Income Goal</th> */}
                    <th>Income Source Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : currentItems && currentItems.length > 0 ? (
                    currentItems.map((income, index) => (
                      <tr key={income.id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{income.source}</td>
                        <td>{income.type}</td>
                        <td>
                          $
                          {income.amount != null && !isNaN(Number(income.amount))
                            ? Number(income.amount).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                            : "0.00"}
                        </td>
                        {/* <td>
                          $
                          {income.incomeGoal != null && !isNaN(Number(income.incomeGoal))
                            ? Number(income.incomeGoal).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                            : "0.00"}
                        </td> */}
                        <td
                          style={{ position: "relative", overflow: "visible" }}
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          {income.description}
                          {hoveredRow === index && (
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "5px",
                                zIndex: 1000,
                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                display: "flex",
                                gap: "5px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <Button
                                color="white"
                                style={{ color: "#fabe13" }}
                                onClick={() => handleViewIncome(income)}
                              >
                                <FaEye />
                              </Button>
                              <Button
                                color="white"
                                style={{ color: "#28a745" }}
                                onClick={() => handleEditIncome(income)}
                              >
                                <MdEditSquare />
                              </Button>
                              <Button
                                color="white"
                                style={{ color: "#f44336" }}
                                onClick={() => confirmDelete(income.id)}
                              >
                                <FaTrashAlt />
                              </Button>
                            </div>
                          )}
                        </td>
                        <td className="d-flex justify-content-start">
                          <Button
                            color="white"
                            className="me-2"
                            style={{ color: "#fabe13" }}
                            onClick={() => handleViewIncome(income)}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            color="white"
                            className="me-2"
                            style={{ color: "#28a745" }}
                            onClick={() => handleEditIncome(income)}
                          >
                            <MdEditSquare />
                          </Button>
                          <Button
                            color="white"
                            style={{ color: "#f44336" }}
                            onClick={() => confirmDelete(income.id)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Row>
          {/* Delete Confirmation Modal */}
          <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
            <ModalHeader toggle={() => setDeleteModal(false)}>
              Confirm Deletion
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete this income record?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={handleDeleteIncome}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
              <Button color="secondary" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Edit/View Modal */}
          {(editModal || viewModal) && selectedIncome && (
            <div
              className={`modal modal-overlay-editview fade ${editModal || viewModal ? "show d-block" : ""}`}
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {viewModal ? "View Income" : "Edit Income"}
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
                        value={selectedIncome?.source || ""}
                        onChange={(e) =>
                          setSelectedIncome({
                            ...selectedIncome,
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
                        value={selectedIncome?.type || ""}
                        onChange={(e) =>
                          setSelectedIncome({
                            ...selectedIncome,
                            type: e.target.value,
                          })
                        }
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Income Source Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedIncome?.description || ""}
                        onChange={(e) =>
                          setSelectedIncome({
                            ...selectedIncome,
                            description: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Amount:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedIncome?.amount || ""}
                        onChange={(e) =>
                          setSelectedIncome({
                            ...selectedIncome,
                            amount: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Income Goal:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedIncome?.incomeGoal || ""}
                        onChange={(e) =>
                          setSelectedIncome({
                            ...selectedIncome,
                            incomeGoal: e.target.value,
                          })
                        }
                        disabled={viewModal}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    {viewModal ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => setViewModal(false)}
                      >
                        Close
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={handleUpdateIncome}
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

export default IncomeTable;