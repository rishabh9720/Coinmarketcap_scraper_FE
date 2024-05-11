import { TableBody, TableRow, Typography, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { generateTextColor } from "../../utils/commonUtils";

import { TableContentProps } from "./types";
import { StyledCryptoName, StyledTableCell } from "./styles";

/**
 * Renders an arrow icon based on the stock value.
 * @param value - The value to determine the direction of the arrow icon.
 * @returns The arrow icon component.
 */
const renderIcon = (value: string) => {
  return value.startsWith("-") ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
};

/**
 * Renders text based on the value, removing a leading negative sign if value is negative.
 * @param value - The value to render.
 * @returns The rendered text.
 */
const renderText = (value: string) => {
  return value.startsWith("-") ? value.slice(1) : value;
};

export const TableContent = ({ cryptoData }: TableContentProps) => {
  return (
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
              <Typography component="span" fontSize={14} sx={{ color: "grey" }}>
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
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {renderIcon(row.hourly_change)} {renderText(row.hourly_change)}
            </Box>
          </StyledTableCell>
          <StyledTableCell
            align="right"
            sx={{ color: generateTextColor(row.daily_change) }}
          >
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {renderIcon(row.daily_change)} {renderText(row.daily_change)}
            </Box>
          </StyledTableCell>
          <StyledTableCell
            align="right"
            sx={{ color: generateTextColor(row.weekly_change) }}
          >
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {renderIcon(row.weekly_change)} {renderText(row.weekly_change)}
            </Box>
          </StyledTableCell>
          <StyledTableCell align="right">{row.market_capital}</StyledTableCell>
          <StyledTableCell align="right">
            {row.trade_volume_usd}
            <Typography sx={{ color: "grey" }}>
              {row.trade_volume_crypto}
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="right">
            {row.circulating_supply}
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
