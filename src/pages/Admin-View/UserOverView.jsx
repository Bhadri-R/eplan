import React, { useState } from "react";
import { Modal, Button } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from '../../utils/config';
const UsersList = ({ users, fetchUsersData }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Open modal and set user ID
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModal(true);
    };

    // Handle user deletion
    const handleDeleteUser = async () => {
        if (!selectedUser) {
            console.error("Invalid user ID!");
            toast.error("Invalid user ID!");
            return;
        }

        setLoading(true);

        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                toast.error("Authentication failed! Please log in again.");
                setLoading(false);
                return;
            }

            console.log(`Deleting user with ID: ${selectedUser.id}`);

            await axios.delete(`${BASE_URL}/api/users/${selectedUser.id}/`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            toast.success("User deleted successfully!");
            fetchUsersData(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error deleting user.");
        } finally {
            setLoading(false);
            setDeleteModal(false); // Close modal
        }
    };

    return (
        <div>
            {users.map((user) => (
                <Button color="white" style={{ color: "#f44336" }} onClick={() => openDeleteModal(user)} key={user.id}>
                    <FaTrashAlt />
                </Button>
            ))}

            {/* Delete Confirmation Modal */}
            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
                <div className="modal-header">
                    <h5 className="modal-title">Confirm Deletion</h5>
                    <button type="button" className="close" onClick={() => setDeleteModal(false)}>
                        <span>&times;</span>
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
        </div>
    );
};

export default UsersList;
