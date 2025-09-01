import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Input,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaDownload, FaEye, FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { BASE_URL } from "../../utils/config";

const ProfileTable = ({ refresh }) => {
  const [profileData, setProfileData] = useState(null);
  const [searchClientName, setSearchClientName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const API_URL = `${BASE_URL}/api/myprofile/profile/`;

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [refresh]);

  const fetchProfileData = async () => {
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        console.error("No authentication token found!");
        // toast.error("Authentication failed! Please log in again.");
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

      const profileData = response.data; // Access data directly from response

      // ✅ Convert to array if not already an array
      const normalizedData = Array.isArray(profileData)
        ? profileData
        : [profileData];

      setProfileData(normalizedData);
      setFilteredData(normalizedData);

      console.log("Updated profileData:", normalizedData);
      console.log("Updated filteredData:", normalizedData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // toast.error("Failed to fetch profile data!");
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        // toast.error("Authentication failed! Please log in again.");
        setLoading(false);
        return;
      }

      await axios.delete(`${API_URL}${deleteId}/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });

      toast.success("Profile deleted successfully!");
      fetchProfileData();
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile.");
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        // toast.error("Authentication failed! Please log in again.");
        setLoading(false);
        return;
      }

      await axios.put(`${API_URL}${selectedProfile.id}/`, selectedProfile, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });

      toast.success("Profile updated successfully!");
      fetchProfileData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
      setEditModal(false);
    }
  };
  const handleSearch = () => {
    const trimmedSearchClientName = searchClientName.trim().toLowerCase();

    if (!trimmedSearchClientName) {
      setFilteredData(profileData);
      return;
    }

    if (profileData) {
      const filtered = profileData.filter((profile) =>
        profile.clientName?.toLowerCase().includes(trimmedSearchClientName)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  console.log("Filtered Data:", filteredData);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setViewModal(true);
  };
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setEditModal(true); // Open modal
  };

  return (
    <Card>
      <CardBody>
        <Row className="mb-2">
          <Col md={6}>
            <h5>Profile Details</h5>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Input
                type="text"
                placeholder="Search by Client Name"
                value={searchClientName}
                onChange={(e) => setSearchClientName(e.target.value)}
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
                <th>Client Age</th>
                <th>Client Retirement Age</th>
                <th>Client Mobile</th>
                <th>Client Email</th>
                <th> Spouse Name</th>
                <th>Spouse Age</th>
                <th>Spouse Retirement Age</th>
                <th>Spouse Mobile</th>
                <th>Spouse Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((profile, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{profile?.clientName || "-"}</td>
                    <td>{profile?.clientAge || "-"}</td>
                    <td>{profile?.clientRetirementAge || "-"}</td>
                    <td>{profile?.clientMobile || "-"}</td>
                    <td>{profile?.clientEmail || "-"}</td>
                    <td>{profile?.spouseName || "-"}</td>
                    <td>{profile?.spouseAge || "-"}</td>
                    <td>{profile?.spouseRetirementAge || "-"}</td>
                    <td>{profile?.spouseMobile || "-"}</td>
                    <td>{profile?.spouseEmail || "-"}</td>
                    <td>
                      <Button
                        color="white"
                        className="me-2"
                        style={{ color: "#fabe13" }}
                        onClick={() => handleViewProfile(profile)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        color="white"
                        className="me-2"
                        style={{ color: "#28a745" }}
                        onClick={() => handleEditProfile(profile)}
                      >
                        <MdEditSquare />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    {profileData ? "No data found." : "Loading..."}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

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
                  <li className="page-item me-2">
                    <button className="btn btn-sm btn-primary">
                      {currentPage}
                    </button>
                  </li>
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
        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
          <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>
            Confirm Delete
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this profile?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
            <Button
              color="secondary"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
          <ModalHeader toggle={() => setEditModal(!editModal)}>
            Edit Profile
          </ModalHeader>
          <ModalBody>
            {selectedProfile && (
              <div>
                <FormGroup>
                  <label>Client Name</label>
                  <Input
                    type="text"
                    value={selectedProfile.clientName}
                    onChange={(e) =>
                      setSelectedProfile({
                        ...selectedProfile,
                        clientName: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Client Age</label>
                  <Input
                    type="text"
                    value={selectedProfile.clientAge}
                    onChange={(e) =>
                      setSelectedProfile({
                        ...selectedProfile,
                        clientAge: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-label">Client Retirement Age:</label>
                  <Input
                    type="text"
                    value={selectedProfile.clientRetirementAge}
                    onChange={(e) =>
                      setSelectedProfile({
                        ...selectedProfile,
                        clientRetirementAge: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                {/* Add other input fields for editing */}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
            <Button color="secondary" onClick={() => setEditModal(!editModal)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {viewModal && selectedProfile && (
          <div
            className={`modal modal-overlay-editview fade show d-block`}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {viewModal ? "View Profile" : "Edit Profile"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setViewModal(false);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  {selectedProfile && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Client Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.clientName || ""}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Client Age:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.clientAge || ""}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Client Retirement Age:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.clientRetirementAge || ""}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Client Mobile:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.clientMobile || ""}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Spouse Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.spouseName || "-"}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Spouse Age:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.spouseAge || "-"}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Spouse Retirement Age:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.spouseRetirementAge || "-"}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Spouse Mobile:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.spouseMobile || "-"}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Children:</label>
                        {selectedProfile.children &&
                        selectedProfile.children.length > 0 ? (
                          selectedProfile.children.map((child) => (
                            <input
                              key={child.id}
                              type="text"
                              className="form-control mb-1"
                              value={`Name :  ${child.name} ; Age : ${child.age}`}
                              disabled
                            />
                          ))
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            value="No Children"
                            disabled
                          />
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Client Email:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.clientEmail || "-"}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Spouse Email:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProfile.spouseEmail || "-"}
                          disabled
                        />
                      </div>

                      {selectedProfile.profile && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">
                              Profile Source:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedProfile.profile || "-"}
                              disabled
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Profile Amount:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedProfile.profile || "-"}
                              disabled
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => setViewModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ProfileTable;
