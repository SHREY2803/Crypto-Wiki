import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import CoinChart from "../components/CoinChart";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { numberWithCommas } from "../components/Carousel";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const theme = createTheme();

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  padding: "20px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderRight: "none",
  },
}));

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%", // Fill the height of the sidebar
});

const CoinName = styled("div")({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Rubik",
});

const CoinsPage = () => {
  const { id } = useParams();
  const [coins, setCoins] = useState(null);
  const { currency, symbol, user, watchlist, setAlert } = CryptoState();
  const [loading, setLoading] = useState(false);

  const fetchCoinData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-fHZvEiW4N7f9vTgL9VGK4uaj",
          },
        }
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const inWatchList =watchlist.includes(coins?.id);

  const addWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coins?.id] : [coins?.id],
      });

      setAlert({
        open:true,
        message:`${coins.name} Added to Watchlist !`,
        type:"success"
      })
    } catch (error) {
      setAlert({
        open:true,
        message:error.message,
        type:"error"
      })
    }
  };

  const removeFromWatchList =async()=>{
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch)=>watch!==coins?.id)
      },
    {merge:"true"});
      setAlert({
        open:true,
        message:`${coins.name} Removed from Watchlist`,
        type:"success"
      })
    } catch (error) {
      setAlert({
        open:true,
        message:error.message,
        type:"error"
      })
    }

  }

  useEffect(() => {
    fetchCoinData();
  }, [id, currency]);

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <Sidebar>
          <LoadingContainer>
            <CircularProgress color="success" />
          </LoadingContainer>
        </Sidebar>
      </ThemeProvider>
    );

  if (!coins) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar>
          <img
            src={coins.image?.large}
            alt={coins.name}
            style={{ marginBottom: 20 }}
            height="200"
          />

          <Typography variant="h3">
            <CoinName>{coins.name}</CoinName>
          </Typography>

          <Typography
            variant="subtitle1"
            style={{
              width: "100%",
              fontFamily: "Rubik, sans-serif",
              padding: "15px",
              paddingTop: "10px",
              paddingBottom: "15px",
              textAlign: "justify",
              marginBottom: "20px",
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{
              __html: coins.description?.en?.split(". ")[0] || "",
            }}
          />

          <div
            style={{
              alignSelf: "center",
              padding: 15,
              paddingTop: 10,
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Rubik",
                }}
              >
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Rubik" }}>
                {coins.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Rubik",
                }}
              >
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Rubik" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coins.market_data?.current_price[currency.toLowerCase()] || 0
                )}
              </Typography>
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Rubik",
                }}
              >
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Rubik" }}>
                {symbol}{" "}
                {numberWithCommas(
                  (coins.market_data?.market_cap[currency.toLowerCase()] || 0)
                    .toString()
                    .slice(0, -6)
                )}{" "}
                M
              </Typography>
            </span>
            {user && (
              <Button
                variant="outlined"
                style={{
                  fontFamily:"Rubik",
                  width: "100%",
                  height: 40,
                  backgroundColor: inWatchList?"red":"yellow",
                  color: "black",
                }}
                onClick={inWatchList? removeFromWatchList : addWatchlist}
              >
                {inWatchList?"Remove from WatchList":"Add to WatchList"}
              </Button>
            )}
          </div>
        </Sidebar>
        <CoinChart coin={coins} />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsPage;
