import {
    TableHead,
    TableRow,
    
  } from "@mui/material";
import {StyledTableHeader} from './styles';

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableHeader>#</StyledTableHeader>
        <StyledTableHeader>Name</StyledTableHeader>
        <StyledTableHeader align="right">Price</StyledTableHeader>
        <StyledTableHeader align="right">1h %</StyledTableHeader>
        <StyledTableHeader align="right">24h %</StyledTableHeader>
        <StyledTableHeader align="right">7d %</StyledTableHeader>
        <StyledTableHeader align="right">Market Cap</StyledTableHeader>
        <StyledTableHeader align="right">Volume(24h)</StyledTableHeader>
        <StyledTableHeader align="right">
          Circulating Supply
        </StyledTableHeader>
      </TableRow>
    </TableHead>
  );
};
