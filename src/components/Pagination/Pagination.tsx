import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';

interface BasicPaginationProps {
    count?: number;
}

export default function BasicPagination({count}: BasicPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("_page") ?? 1);

    const handleChange = (e: ChangeEvent<unknown>, value: number) => {
        console.log(e.currentTarget);
        
        setSearchParams((prev) => {
            prev.set("_page", String(value))
            return prev;
        })
    }

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={handleChange}/>
    </Stack>
  );
}