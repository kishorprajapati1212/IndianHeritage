import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import DeletePopup from "../../Global_Component/Deletepopup"; // Import DeletePopup component
import InfiniteScroll from "react-infinite-scroll-component";

const WarHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [warHistory, setWarHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWar, setSelectedWar] = useState(null);
  // infinit scrolling paging
  const [page, setpages] = useState(1)
  const [hasmore, sethasmore] = useState(true)
  const limit = 5

  // Fetch war history from the backend
  const fetchWarHistory = async (pageNo) => {
    if (loading) return
    setLoading(true);
    try {
      const response = await axios.get(`${Backend_url}/getWarHistory?page=${pageNo}&limit=${limit}`);
      const newData = response.data?.data
      console.log(newData)
      setpages(pageNo + 1)
      setWarHistory((prev) => [...prev, ...newData]);
      sethasmore(response.data.hasMore)

    } catch (err) {
      setError("Failed to fetch war history.");
      console.error("Error fetching war history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarHistory(1);
  }, []);

  // Handle dialog open
  const handleOpenDialog = (war) => {
    setSelectedWar(war);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedWar(null);
  };

  // Handle the deletion of a war history entry
  const handleDelete = async () => {
    if (!selectedWar) return;

    try {
      const response = await axios.get(`${Backend_url}/deleteWarHistory/${selectedWar.historyId}`);
      if (response.status === 200) {
        // After successful delete, fetch the updated war history
        setWarHistory((prev) => prev.filter(war => war.historyId !== selectedWar.historyId));
        console.log("Deleted successfully:", response.data);
      }
    } catch (err) {
      console.error("Error deleting war history:", err);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        War Information
      </Typography>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          component={Link}
          to="/Add_War"
        >
          + Add War
        </Button>
      </div>

      {error && <Typography color="error">{error}</Typography>}

      {/* {loading ? (
        <Typography>Loading war history...</Typography>
      ) : ( */}
      <div style={{ height: "600px", overflow: "auto" }} id="scrollableDiv">
        <InfiniteScroll
          dataLength={warHistory.length}
          next={() => fetchWarHistory(page)}
          hasMore={hasmore}
          // loader={<Typography>Loading more war history...</Typography>}
          // endMessage={<Typography>No more war history.</Typography>}
          scrollableTarget="scrollableDiv"
        >

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>War Name</TableCell>
                  <TableCell>Start Year</TableCell>
                  <TableCell>End Year</TableCell>
                  <TableCell>War Place</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {warHistory.map((war, index) => (
                  <TableRow key={`${war.historyId}-${index}`}>
                    <TableCell>{war.war_name}</TableCell>
                    <TableCell>{war.start_war}</TableCell>
                    <TableCell>{war.end_war}</TableCell>
                    <TableCell>{war.war_place}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          marginRight: "10px",
                          "&:hover": {
                            backgroundColor: "#006400",
                          },
                        }}
                        to={`/Update_War/${war.historyId}`}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#8B0000",
                          },
                        }}
                        onClick={() => handleOpenDialog(war)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
        </div>
      {/* )} */}

      {/* Use the DeletePopup component here */}
      <DeletePopup
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        warName={selectedWar?.war_name}
      >
        <Typography>Are you sure you want to delete this war History?</Typography>

      </DeletePopup>
    </div>
  );
};

export default WarHome;
