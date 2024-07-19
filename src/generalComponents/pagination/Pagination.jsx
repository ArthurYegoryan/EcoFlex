import "./Pagination.css"
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from "../../assets/styles/colors";

export default function PaginationComponent({ 
  pageCount, 
  setPage,
  leftMargin
}) {
  return (
    <div className={`pagination${leftMargin}`}>
      <Stack spacing={2}>
        <Pagination
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: colors.originalBgColor
            }
          }}
          count={pageCount}
          onChange={(e, p) => {
            setPage(p);
          }}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>    
  );
}