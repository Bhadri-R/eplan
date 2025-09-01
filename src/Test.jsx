import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

const SearchUsers = () => {
    const BASE_URL = 'http://127.0.0.1:8000';
    const [searchTerm, setSearchTerm] = useState('smith');
    const [usersData, setUsersData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
        current_page: 1,
        total_pages: 0,
    });

    const fetchUsersData = async () => {
        try {
            setLoading(true);
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));

            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                toast.error("Authentication failed! Please log in again.");
                return;
            }

            const response = await axios.get(
                `${BASE_URL}/api/users/?search=${searchTerm}&page=${pagination.current_page}`,
                {
                    headers: {
                        Authorization: `Bearer ${authUser.accessToken}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            console.log("Full API Response:", response);

            // Assuming the API response structure matches your example
            const responseData = response.data;

            setUsersData(responseData.results.data);
            setFilteredData(responseData.results.data);

            setPagination({
                count: responseData.count,
                next: responseData.next,
                previous: responseData.previous,
                current_page: responseData.current_page,
                total_pages: responseData.total_pages,
            });

            console.log("Updated usersData:", responseData.results.data);
            console.log("Updated filteredData:", responseData.results.data);
            console.log("Pagination Data:", {
                count: responseData.count,
                next: responseData.next,
                previous: responseData.previous,
                current_page: responseData.current_page,
                total_pages: responseData.total_pages,
            });

        } catch (error) {
            console.error("Error fetching users data:", error);
            setError(error.message);
            toast.error("Failed to fetch users data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, [searchTerm, pagination.current_page]);

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, current_page: newPage }));
    };

    return (
        <div>
            <h2>User Search</h2>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search term"
            />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <div>
                    <p>Check console for full data output</p>
                    <ul>
                        {usersData.map((user, index) => (
                            <li key={index}>{JSON.stringify(user)}</li>
                        ))}
                    </ul>

                    {/* Pagination controls */}
                    <div>
                        <button
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            disabled={!pagination.previous}
                        >
                            Previous
                        </button>
                        <span>
                            Page {pagination.current_page} of {pagination.total_pages}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.current_page + 1)}
                            disabled={!pagination.next}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchUsers;