import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import CoinChart from "../components/CoinChart";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { numberWithCommas } from "../components/Carousel";
import LinearProgress from "@mui/material/LinearProgress";

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
  width: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
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
  }, [id]);

  // console.log(coins);

  if (!coins) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <Sidebar>
            <img
              src={coins?.image.large}
              alt={coins?.name}
              style={{ marginBottom: 20 }}
              height="200"
            />

            <Typography variant="h3">
              <CoinName>{coins?.name}</CoinName>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                width: "100%", // Ensure full width for small devices
                fontFamily: "Rubik, sans-serif", // Font style
                padding: "15px", // Padding for small screens
                paddingTop: "10px", // Top padding
                paddingBottom: "15px", // Bottom padding
                textAlign: "justify", // Justify the text alignment
                marginBottom: "20px", // Space between elements (for readability)
                lineHeight: 1.6, // Improve line height for readability
              }}
              dangerouslySetInnerHTML={{
                __html: coins?.description.en.split(". ")[0],
              }}
            />

            <div
              sx={{
                alignSelf: "center",
                padding: 15,
                paddingTop: 10,
                width: "100%",
                [theme.breakpoints.down("md")]: {
                  display: "flex",
                  justifyContent: "space-around",
                },
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  alignItems: "center",
                },
                [theme.breakpoints.down("xs")]: {
                  alignItems: "start",
                },
              }}
            >
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    fontFamily: "Rubik",
                  }}
                >
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" style={{ fontFamily: "Rubik" }}>
                  {coins?.market_cap_rank}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    fontFamily: "Rubik",
                  }}
                >
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" style={{ fontFamily: "Rubik" }}>
                  {symbol}{" "}
                  {numberWithCommas(
                    coins?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    fontFamily: "Rubik",
                  }}
                >
                  Market Cap:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" style={{ fontFamily: "Rubik" }}>
                  {symbol}{" "}
                  {numberWithCommas(
                    coins?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}{" "}
                  M
                </Typography>
              </span>
            </div>
          </Sidebar>
          <CoinChart coin={coins} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsPage;
