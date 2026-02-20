import { Stack, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useProductsStore } from "../../../../stores/useProductsStore";

export function PageSelector() {
  const currentPage = useProductsStore((state) => state.currentPage);
  const productInfo = useProductsStore((state) => state.productInfo);
  const goNextPage = useProductsStore((state) => state.goNextPage);
  const goPreviousPage = useProductsStore((state) => state.goPreviousPage);
  return (
    <Stack
      marginTop="16px"
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton onClick={goPreviousPage} disabled={currentPage <= 1}>
        <ArrowBackIosNew style={{ color: "white" }} />
      </IconButton>
      {currentPage} / {productInfo.pages}
      <IconButton
        onClick={goNextPage}
        disabled={currentPage > productInfo.pages - 1}
      >
        <ArrowForwardIos style={{ color: "white" }} />
      </IconButton>
    </Stack>
  );
}
