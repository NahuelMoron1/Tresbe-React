import { Stack, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useProducts } from "../../../hooks/Products";

export function PageSelector() {
  const { currentPage, productInfo, goNextPage, goPreviousPage } =
    useProducts();

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
