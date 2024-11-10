import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import CoinChart from "../components/CoinChart";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const theme = createTheme();

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")({
  // Additional styles for the sidebar if needed
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
});

const CoinName = styled("div")({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Rubik",
});

const CoinsPage = () => {
  const { id } = useParams();
  const [coins, setCoins] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-15RHg87yyjPmx8bJg1dg8cYc",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        options
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  // console.log(coins);
  

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar>
          <img
            src={coins?.image.large}
            alt={coins?.name}
            style={{ marginBottom: 20 }}
            height="200"
          />
        </Sidebar>
        <Typography variant="h3">
          <CoinName>{coins?.name}</CoinName>
        </Typography>
        <Typography variant="subtitle1">
          {
            coins?.description.en.split(". ")[0]
          }.
          
        </Typography>
        <CoinChart coin={coins} />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsPage;
