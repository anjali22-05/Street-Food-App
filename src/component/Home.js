import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Skeleton,
  Fade,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import {
  Add,
  Logout,
  LocalFireDepartment,
  Edit,
  Delete,
  Search,
  Storefront,
  RoomOutlined,
  AccessTimeOutlined,
  CurrencyRupee,
} from "@mui/icons-material";

/* -----------------------------------------------------------
   THEME — "Night Market" palette
   char (near-black stall backdrop), chili red, turmeric gold,
   marigold accent, warm paper card
------------------------------------------------------------ */
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#15110F", paper: "#1E1815" },
    primary: { main: "#E4572E" }, // chili red
    warning: { main: "#F2A93B" }, // turmeric gold
    secondary: { main: "#F2A93B" },
    text: { primary: "#F4EDE4", secondary: "#B8A99A" },
  },
  typography: {
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    h4: { fontFamily: "'Bebas Neue', 'Poppins', sans-serif", letterSpacing: 1 },
    h5: { fontFamily: "'Bebas Neue', 'Poppins', sans-serif", letterSpacing: 0.5 },
  },
  shape: { borderRadius: 14 },
});

/* Ticket-style card: scalloped top edge via radial-gradient mask,
   dashed tear-line above the footer — the one signature element. */
const ticketSx = {
  position: "relative",
  bgcolor: "#241D19",
  border: "1px solid rgba(242,169,59,0.15)",
  overflow: "visible",
  transition: "transform .25s ease, box-shadow .25s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 30px rgba(0,0,0,0.45)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    height: 20,
    backgroundImage:
      "radial-gradient(circle at 10px 0, transparent 10px, #15110F 10px)",
    backgroundSize: "20px 20px",
    backgroundRepeat: "repeat-x",
  },
};

export default function Home() {
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5001/shop/viewShops");
      setShops(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;
    try {
      await axios.delete(`http://localhost:5001/shop/deleteShop/${id}`);
      alert("Shop Deleted Successfully");
      setShops((prev) => prev.filter((shop) => shop._id !== id));
    } catch (err) {
      console.log(err);
      alert("Unable to delete shop");
    }
  };

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop.shopName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* STICKY NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            "linear-gradient(90deg, #1E1815 0%, #241D19 60%, #2A211C 100%)",
          borderBottom: "1px solid rgba(242,169,59,0.2)",
        }}
      >
        <Toolbar sx={{ gap: 1.5, py: 1 }}>
          {/* Left corner brand */}
          <LocalFireDepartment sx={{ color: "warning.main" }} />
          <Typography
            variant="h5"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 3 },
              fontWeight: 700,
              letterSpacing: 2,
              background: "linear-gradient(90deg,#F2A93B,#E4572E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            STREET FOOD
          </Typography>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search shops, dishes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flexGrow: 1,
              maxWidth: 380,
              display: { xs: "none", sm: "flex" },
              bgcolor: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              "& fieldset": { border: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Button
            color="warning"
            variant="outlined"
            startIcon={<Storefront />}
            onClick={() => navigate("/viewshops")}
            sx={{ display: { xs: "none", md: "inline-flex" }, borderRadius: 3 }}
          >
            View Shops
          </Button>

          <Button
            color="warning"
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/addShop")}
            sx={{ borderRadius: 3, color: "#1E1815", fontWeight: 700 }}
          >
            Add Shop
          </Button>

          <IconButton
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
            sx={{
              ml: 0.5,
              color: "primary.main",
              border: "1px solid rgba(228,87,46,0.4)",
            }}
            title="Logout"
          >
            <Logout fontSize="small" />
          </IconButton>
        </Toolbar>

        {/* mobile search row */}
        <Box sx={{ display: { xs: "block", sm: "none" }, px: 2, pb: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search shops, dishes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: "rgba(255,255,255,0.06)", borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </AppBar>

      {/* HERO / GREETING STRIP */}
      <Box
        sx={{
          background:
            "radial-gradient(1200px 300px at 10% -10%, rgba(228,87,46,0.25), transparent), radial-gradient(1000px 300px at 90% -20%, rgba(242,169,59,0.18), transparent)",
          pt: 5,
          pb: 3,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontSize: { xs: 32, md: 42 } }}>
                {greeting}, {user?.name || "Foodie"}
              </Typography>
              <Typography color="text.secondary">
                {user?.email || "Fresh carts, hot off the grill — every day."}
              </Typography>
            </Box>

            <Avatar
              sx={{
                width: 64,
                height: 64,
                fontSize: 26,
                fontWeight: 700,
                bgcolor: "primary.main",
                border: "3px solid #F2A93B",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </Avatar>
          </Box>
        </Container>
      </Box>

      {/* SHOP GRID */}
      <Container sx={{ pb: 8 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "warning.main", mb: 4, fontSize: 28 }}
        >
          🔥 ALL STREET FOOD SHOPS
        </Typography>

        {loading ? (
          <Grid container spacing={4}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton
                  variant="rectangular"
                  height={220}
                  sx={{ borderRadius: 3, bgcolor: "rgba(255,255,255,0.06)" }}
                />
                <Skeleton width="60%" sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.06)" }} />
                <Skeleton width="40%" sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
              </Grid>
            ))}
          </Grid>
        ) : filteredShops.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
            No shops match "{search}" — try a different search.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredShops.map((shop, idx) => (
              <Grid item xs={12} sm={6} md={4} key={shop._id}>
                <Fade in timeout={300 + idx * 60}>
                  <Card sx={ticketSx}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={shop.image || "https://via.placeholder.com/400"}
                      sx={{ borderRadius: "14px 14px 0 0" }}
                    />

                    <CardContent sx={{ pb: 1 }}>
                      <Typography variant="h5" sx={{ fontSize: 24 }}>
                        {shop.shopName}
                      </Typography>

                      <Chip
                        size="small"
                        label={shop.popularDish}
                        color="warning"
                        sx={{ mt: 1, mb: 1.5, fontWeight: 700, color: "#1E1815" }}
                      />

                      <Box sx={{ display: "grid", gap: 0.5 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                        >
                          <AccessTimeOutlined fontSize="small" /> {shop.timing}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                        >
                          <CurrencyRupee fontSize="small" /> {shop.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                        >
                          <RoomOutlined fontSize="small" /> {shop.address}
                        </Typography>
                      </Box>
                    </CardContent>

                    {/* dashed tear-line */}
                    <Box
                      sx={{
                        borderTop: "2px dashed rgba(242,169,59,0.25)",
                        mx: 2,
                      }}
                    />

                
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

/*
  Optional: for the display font, add this to your public/index.html <head>:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  If omitted, it gracefully falls back to system sans-serif.
*/