import { Skeleton, Stack } from "@mui/material";

export const TableSkeleton = () => {
  return (
    <Stack borderRadius={2} boxShadow={3} gap={4} p={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
        return (
          <Skeleton
            key={value.toString()}
            animation="wave"
            variant="rounded"
            width="100%"
            height={30}
          />
        );
      })}
    </Stack>
  );
};
