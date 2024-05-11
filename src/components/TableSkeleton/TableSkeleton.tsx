import { Skeleton, Stack } from "@mui/material";

// Maintaining local constant for rendering number of skeletons for table rows
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const TableSkeleton = () => {
  return (
    <Stack borderRadius={2} boxShadow={3} gap={4} p={4}>
      {ROWS.map((value) => {
        return (
          <Skeleton
            key={value.toString()}
            animation="wave"
            variant="rounded"
            width="100%"
            height={40}
          />
        );
      })}
    </Stack>
  );
};
