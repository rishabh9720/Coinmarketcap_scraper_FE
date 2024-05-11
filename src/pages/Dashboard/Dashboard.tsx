import { useEffect, useState } from "react";
import { fetchMarketData, generateTextColor } from "../../utils/commonUtils";
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { TableHeader } from "../../components/TableHeader";
import { CryptoResponseData } from "./types";
import { StyledCryptoName, StyledTableCell } from "./styles";
import { TableSkeleton } from "../../components/TableSkeleton";

const REFERESH_RATE = 12000;

export const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState<CryptoResponseData[]>([]);
  useEffect(() => {
    fetchMarketData().then((data) => {
      setCryptoData(data);
    });
    const intervalId = setInterval(() => {
      fetchMarketData().then((data) => {
        setCryptoData(data);
      });
    }, REFERESH_RATE);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderIcon = (value: string) => {
    return value.startsWith("-") ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
  };

  const renderText = (value: string) => {
    return value.startsWith("-") ? value.slice(1) : value;
  };

  return (
    <Box py={4} px={8} minHeight="100vh">
      <Typography fontWeight={700} fontSize={32} color="black" mb={4}>
        CoinMarketCap Scrapper
      </Typography>
      {!cryptoData.length ? (
        <TableSkeleton />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            height: "calc(100vh - 150px)",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <MuiTable stickyHeader>
            <TableHeader />
            <TableBody>
              {cryptoData.map((row, index) => (
                <TableRow
                  key={row.currency_name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>
                    <StyledCryptoName>
                      <img src={row.logo} alt="BTC logo" height={24} />
                      <Typography
                        component="span"
                        fontSize={14}
                        sx={{ color: "grey" }}
                        fontWeight={900}
                      >
                        {row.currency_name}{" "}
                      </Typography>
                      <Typography
                        component="span"
                        fontSize={14}
                        sx={{ color: "grey" }}
                      >
                        {row.symbol || ""}
                      </Typography>
                    </StyledCryptoName>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.current_price || "Error fetching price"}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{ color: generateTextColor(row.hourly_change) }}
                  >
                    <Box display="flex" alignItems="center">
                      {renderIcon(row.hourly_change)}{" "}
                      {renderText(row.hourly_change)}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{ color: generateTextColor(row.daily_change) }}
                  >
                    <Box display="flex" alignItems="center">
                      {renderIcon(row.daily_change)}{" "}
                      {renderText(row.daily_change)}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{ color: generateTextColor(row.weekly_change) }}
                  >
                    <Box display="flex" alignItems="center">
                      {renderIcon(row.weekly_change)}{" "}
                      {renderText(row.weekly_change)}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.market_capital || "Error fetching market cap"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.trade_volume_usd || "Error fetching volume in dollars"}
                    <Typography sx={{ color: "grey" }}>
                      {row.trade_volume_crypto ||
                        "Error fetching volume in crypto"}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.circulating_supply ||
                      "Error fetching circulating supply"}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      )}
    </Box>
  );
};
