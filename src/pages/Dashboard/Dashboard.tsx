import { useEffect, useState } from "react";
import {
  Table as MuiTable,
  TableContainer,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { fetchMarketData } from "../../utils/commonUtils";
import { TableHeader } from "../../components/TableHeader";
import { TableSkeleton } from "../../components/TableSkeleton";
import { CryptoResponseData } from "../../models/commonModels";
import { TableContent } from "../../components/TableContent";

const REFERESH_RATE = 8000;

export const Dashboard = () => {
  /** States */
  const [cryptoData, setCryptoData] = useState<CryptoResponseData[]>([]);

  /**
   * Fetches market data and updates state at regular intervals.
   * @returns void
   */
  useEffect(() => {
    /**
     * Fetches market data and updates state.
     * @returns A promise that resolves when the data is fetched and state is updated.
     */
    fetchMarketData().then((data) => {
      setCryptoData(data);
    });

    // Fetch and update data at regular intervals
    const intervalId = setInterval(() => {
      fetchMarketData().then((data) => {
        setCryptoData(data);
      });
    }, REFERESH_RATE);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box pt={4} px={8} height="100vh">
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
            <TableContent cryptoData={cryptoData} />
          </MuiTable>
        </TableContainer>
      )}
    </Box>
  );
};
