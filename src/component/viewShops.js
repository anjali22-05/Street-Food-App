import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
  Divider,
  Skeleton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import {
  Visibility,
  Edit,
  Delete,
  Close,
  Storefront,
  AccessTimeOutlined,
  RoomOutlined,
  CurrencyRupee,
  LocalFireDepartment,
} from "@mui/icons-material";

/* Same "Night Market" palette as Home.jsx, so the two screens feel
   like one product rather than two separate demos. */
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#15110F", paper: "#1E1815" },
    primary: { main: "#E4572E" },
    warning: { main: "#F2A93B" },
    secondary: { main: "#F2A93B" },
    text: { primary: "#F4EDE4", secondary: "#B8A99A" },
  },
  typography: {
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    h4: { fontFamily: "'Bebas Neue', 'Poppins', sans-serif", letterSpacing: 1 },
  },
  shape: { borderRadius: 12 },
});

const ViewShops = () => {
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedShop, setSelectedShop] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5001/shop/viewShops");
      setShops(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const check = window.confirm("Are you sure you want to delete this shop?");
    if (!check) return;

    try {
      await axios.delete(`http://localhost:5001/shop/deleteShop/${id}`);
      alert("Shop Deleted Successfully");
      setShops((prev) => prev.filter((shop) => shop._id !== id));
    } catch (error) {
      console.log(error);
      alert("Unable to delete shop");
    }
  };

  const handleView = (shop) => {
    setSelectedShop(shop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedShop(null);
  };

  // Reset to page 1 whenever the page size changes so the list
  // doesn't land on an out-of-range page.
  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(shops.length / pageSize));

  const paginatedShops = useMemo(() => {
    const start = (page - 1) * pageSize;
    return shops.slice(start, start + pageSize);
  }, [shops, page, pageSize]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ py: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Storefront sx={{ color: "warning.main", fontSize: 34 }} />
          <Typography variant="h4" sx={{ fontSize: { xs: 30, md: 38 } }}>
            All Shops
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={52}
                sx={{ borderRadius: 2, bgcolor: "rgba(255,255,255,0.06)" }}
              />
            ))}
          </Box>
        ) : shops.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
            No shops available yet.
          </Typography>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: "#1E1815",
                border: "1px solid rgba(242,169,59,0.15)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ "& th": { borderBottom: "2px solid rgba(242,169,59,0.25)" } }}>
                    <TableCell sx={{ color: "warning.main", fontWeight: 700, width: 80 }}>
                      S.No
                    </TableCell>
                    <TableCell sx={{ color: "warning.main", fontWeight: 700 }}>
                      Shop Name
                    </TableCell>
                    <TableCell sx={{ color: "warning.main", fontWeight: 700 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedShops.map((shop, idx) => (
                    <TableRow
                      key={shop._id}
                      sx={{
                        "&:hover": { bgcolor: "rgba(242,169,59,0.06)" },
                        "& td": { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                      }}
                    >
                      <TableCell sx={{ color: "text.secondary" }}>
                        {(page - 1) * pageSize + idx + 1}
                      </TableCell>

                      <TableCell sx={{ fontWeight: 600 }}>{shop.shopName}</TableCell>

                      <TableCell align="right">
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="warning"
                            startIcon={<Visibility />}
                            onClick={() => handleView(shop)}
                            sx={{ borderRadius: 2 }}
                          >
                            View
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            color="info"
                            startIcon={<Edit />}
                            onClick={() => navigate(`/editShop/${shop._id}`)}
                            sx={{ borderRadius: 2 }}
                          >
                            Edit
                          </Button>

                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<Delete />}
                            onClick={() => handleDelete(shop._id)}
                            sx={{ borderRadius: 2 }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Page size dropdown + pagination */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mt: 3,
              }}
            >
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: "text.secondary" }}>Rows per page</InputLabel>
                <Select
                  value={pageSize}
                  label="Rows per page"
                  onChange={handlePageSizeChange}
                  sx={{
                    color: "text.primary",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(242,169,59,0.3)",
                    },
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  sx={{ borderRadius: 2 }}
                >
                  Prev
                </Button>

                <Typography color="text.secondary" sx={{ px: 1 }}>
                  Page {page} of {totalPages}
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  sx={{ borderRadius: 2 }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>

      {/* VIEW SHOP DETAILS DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1E1815",
            border: "1px solid rgba(242,169,59,0.2)",
            borderRadius: 3,
          },
        }}
      >
        {selectedShop && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LocalFireDepartment sx={{ color: "warning.main" }} />
                <Typography variant="h5" sx={{ fontFamily: "'Bebas Neue','Poppins'", fontSize: 26 }}>
                  {selectedShop.shopName}
                </Typography>
              </Box>

              <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}>
                <Close />
              </IconButton>
            </DialogTitle>

            <Divider sx={{ borderColor: "rgba(242,169,59,0.2)" }} />

            <DialogContent sx={{ pt: 3 }}>
              <Box
                component="img"
                src={
                  selectedShop.image ||
                  "https://via.placeholder.com/500x260?text=No+Image"
                }
                alt={selectedShop.shopName}
                sx={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2.5,
                }}
              />

              <Chip
                label={selectedShop.popularDish}
                color="warning"
                sx={{ fontWeight: 700, color: "#1E1815", mb: 2 }}
              />

              <Box sx={{ display: "grid", gap: 1.2 }}>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeOutlined sx={{ color: "warning.main" }} fontSize="small" />
                  <strong>Timing:</strong> {selectedShop.timing}
                </Typography>

                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CurrencyRupee sx={{ color: "warning.main" }} fontSize="small" />
                  <strong>Price:</strong> ₹{selectedShop.price}
                </Typography>

                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RoomOutlined sx={{ color: "warning.main" }} fontSize="small" />
                  <strong>Address:</strong> {selectedShop.address}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<Edit />}
                  onClick={() => {
                    handleClose();
                    navigate(`/editShop/${selectedShop._id}`);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Delete />}
                  onClick={() => {
                    handleClose();
                    handleDelete(selectedShop._id);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  Delete
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
};

export default ViewShops;