import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material"
import { useSearchParams } from "react-router"

export const SortControl = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sorting = searchParams.get("_order") ?? 'asc';

    const handleChange = (e: SelectChangeEvent) => {
        setSearchParams((prev) => {
            prev.set("_sort", "views")
            prev.set("_order", e.target.value)
            return prev;
        })
    }

    return  <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Sort by views</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sorting}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="asc">Low to High</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
}