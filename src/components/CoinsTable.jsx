import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Rubik",
  },

  pagination: {
    "& .MuiPagination-root": {
      color: "gold",
    },
  },
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const classes = useStyles();

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-15RHg87yyjPmx8bJg1dg8cYc",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      options
    )
      .then((res) => res.json())
      .then((res) => setCoins(res))
      .catch((err) => console.error(err));

    setLoading(false);
  };
  // console.log(coins);

  useEffect(() => {
    fetchData();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Rubik" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24hr Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          fontSize: "medium",
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Rubik",
                        }}
                        key={head}
                        align={head === "Coin" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {coins ? (
                  handleSearch().length > 0 ? (
                    handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((coin) => {
                        const profit = coin.price_change_percentage_24h > 0;
                        return (
                          <TableRow
                            key={coin.id}
                            // Uncomment and use the class if needed
                            className={classes.row}
                            onClick={() => navigate(`/coins/${coin.id}`)}
                          >
                            <TableCell component="th" scope="row">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {coin.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {coin.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "medium" }}
                            >
                              {symbol}{" "}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                                fontSize: "medium",
                              }}
                            >
                              {profit && "+"}
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "medium" }}
                            >
                              {symbol}{" "}
                              {numberWithCommas(
                                coin.market_cap.toString().slice(0, -6)
                              )}{" "}
                              M
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )
                ) : null}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={Math.max(Math.ceil(handleSearch()?.length / 10), 1)}
          page={page}
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'gold',git 
            },
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
