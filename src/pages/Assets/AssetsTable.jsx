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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEditSquare } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { RowExpanding } from "@tanstack/react-table";

const AssetsTable = ({ refresh }) => {
  const [assetsData, setAssetsData] = useState([]);
  const [searchBillId, setSearchBillId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);

  const API_URL = `${BASE_URL}/api/assets/assets/`;

  useEffect(() => {
    fetchAssetsData();
  }, []);

  useEffect(() => {
    fetchAssetsData();
  }, [refresh]);

  const fetchAssetsData = async () => {
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

      const assetsData = response.data ?? response;

      setAssetsData(assetsData);
      setFilteredData(assetsData);

      console.log("Updated assetsData:", assetsData);
      console.log("Updated filteredData:", assetsData);
    } catch (error) {
      console.error("Error fetching assets data:", error);
    }
  };

  const handleSearch = () => {
    const trimmedSearchUserId = searchUserId.trim();

    if (!trimmedSearchUserId) {
      setFilteredData(usersData);
      return;
    }

    const result = usersData.filter(
      (user) =>
        user.name &&
        typeof user.name === "string" &&
        user.name.toLowerCase().includes(trimmedSearchUserId.toLowerCase())
    );

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page after search
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  console.log("Filtered Data:", filteredData);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteAsset = async () => {
    if (!assetToDelete) return;

    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        setLoading(false);
        return;
      }

      const res = await axios.delete(`${API_URL}${assetToDelete.id}/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });

      console.log("Full API Response:", res);

      // ✅ Extract message from response (directly if available)
      const successMessage =
        res.message || res.data?.message || "Asset deleted successfully!";
      toast.success(successMessage);

      fetchAssetsData();
    } catch (error) {
      console.error(
        "Error deleting asset:",
        error.response ? error.response.data : error.message
      );

      // ✅ Extract error message directly from the response
      const errorMessage =
        error.response?.message || error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setDeleteModal(false);
      setAssetToDelete(null);
    }
  };

  const openDeleteModal = (asset) => {
    setAssetToDelete(asset);
    setDeleteModal(true);
  };

  // UPDATE
  const [editModal, setEditModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setEditModal(true); // Open modal
  };
  const handleUpdateAsset = async () => {
    if (!selectedAsset) {
      console.error("No asset selected for update!");
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

      console.log("Updating asset:", selectedAsset);

      const res = await axios.put(
        `${BASE_URL}/api/assets/assets/${selectedAsset.id}/`,
        selectedAsset,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Full API Response:", res);

      // ✅ Extract message from the response
      const successMessage =
        res.message || res.data?.message || "Asset updated successfully!";
      toast.success(successMessage);

      setAssetsData((prevAssets) =>
        prevAssets.map((asset) =>
          asset.id === selectedAsset.id ? { ...asset, ...selectedAsset } : asset
        )
      );

      setEditModal(false);
    } catch (error) {
      console.error(
        "Error updating asset:",
        error.response ? error.response.data : error.message
      );

      // ✅ Extract error message directly from response
      const errorMessage =
        error.response?.message || error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // VIEW MODAL

  const [viewModal, setViewModal] = useState(false);

  // Open View Modal
  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setViewModal(true);
    setEditModal(false); // Ensure edit mode is off
  };

  return (
    <Card>
      <CardBody>
        <Row className="mb-2">
          <Col md={6}>
            <h5>Assets List</h5>
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

        <div className="table-responsive">
          <Table className="table-centered align-middle table-nowrap mb-0 table ">
            <thead>
              <tr>
                <th>SI No.</th>
                <th>Client Name</th>
                <th>Type</th>
                <th>Account Name </th>
                <th>Risk</th>
                <th>Current Balance</th>
                <th>Contribution</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((asset, index) => (
                  <tr key={asset.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{asset.source}</td>
                    <td>{asset.type}</td>
                    <td>{asset.account}</td>
                    <td>{asset.risk}</td>
                    <td>
                      $
                      {asset.currentBalance != null && !isNaN(Number(asset.currentBalance))
                        ? Number(asset.currentBalance).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        : "0.00"}
                    </td>
                    <td>
                      $
                      {asset.contribution != null && !isNaN(Number(asset.contribution))
                        ? Number(asset.contribution).toLocaleString("en-US", {
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
                        onClick={() => handleViewAsset(asset)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        color="white"
                        className="me-2"
                        style={{ color: "#28a745" }}
                        onClick={() => handleEditAsset(asset)}
                      >
                        <MdEditSquare />
                      </Button>

                      <Button
                        color="white"
                        style={{ color: "#f44336" }}
                        onClick={() => openDeleteModal(asset)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {assetsData ? "No data found." : "Loading..."}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
          <ModalHeader toggle={() => setDeleteModal(false)}>
            Confirm Delete
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this asset?</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={handleDeleteAsset}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>{" "}
            <Button color="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {(editModal || viewModal) && selectedAsset && (
          <div
            className={`modal modal-overlay-editview fade ${editModal || viewModal ? "show d-block" : ""
              }`}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h5 className="modal-title">
                    {viewModal ? "View Asset" : "Edit Asset"}
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

                {/* Modal Body */}
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Client Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedAsset?.source || ""}
                      onChange={(e) =>
                        setSelectedAsset({
                          ...selectedAsset,
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
                      value={selectedAsset?.type || ""}
                      onChange={(e) =>
                        setSelectedAsset({
                          ...selectedAsset,
                          type: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Account Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedAsset?.account || ""}
                      onChange={(e) =>
                        setSelectedAsset({
                          ...selectedAsset,
                          account: e.target.value,
                        })
                      }
                      disabled={viewModal}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Risk:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedAsset?.risk || ""}
                      onChange={(e) =>
                        setSelectedAsset({
                          ...selectedAsset,
                          risk: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Current Balance:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedAsset?.currentBalance || ""}
                      onChange={(e) =>
                        setSelectedAsset({
                          ...selectedAsset,
                          currentBalance: e.target.value,
                        })
                      }
                      disabled={viewModal}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contribution:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedAsset?.contribution || ""}
                      onChange={(e) =>
                        setSelectedAsset({
                          ...selectedAsset,
                          contribution: e.target.value,
                        })
                      }
                      disabled={viewModal}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
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
                        onClick={handleUpdateAsset}
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
  );
};

export default AssetsTable;
