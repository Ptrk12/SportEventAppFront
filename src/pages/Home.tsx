import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface FormComponentProps {
  discipline: string;
  city: string;
  searchString: string;
}

const Home = () => {
  const [searchFormValues, setSearchFormValues] = useState<FormComponentProps>({
    discipline: "",
    city: "",
    searchString: "",
  });

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    setSearchFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col">
      <div className="relative bg-[url('/public/assets/home-bg.jpg')] h-[600px] w-full bg-cover bg-center bg-top">
        <div className="relative flex align-center justify-center">
          <div className="absolute top-[310px] left-[200px] flex align-center justify-center text-dark-text-color font-bold text-5xl">
            <span>What would You like to do?</span>
          </div>
          <div className="absolute top-[370px] flex gap-16 align-center justify-center items-center p-3 bg-white rounded-[20px] w-[80%] shadow-xl">
            <FormControl className="w-[350px]">
              <InputLabel id="discipline-select-label">Discipline</InputLabel>
              <Select
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-select': {
                    borderBottom: '1px solid gray',
                  },
                }}
                labelId="discipline-select-label"
                id="discipline-select"
                value={searchFormValues.discipline}
                name="discipline"
                label="Discipline"
                onChange={onInputChange}
              >
                <MenuItem value="football">Football</MenuItem>
                <MenuItem value="volleyball">Volleyball</MenuItem>
                <MenuItem value="basketball">Basketball</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-[350px]">
              <InputLabel id="city-select-label">Location</InputLabel>
              <Select
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-select': {
                    borderBottom: '1px solid gray',
                  },
                }}
                labelId="city-select-label"
                id="city-select"
                value={searchFormValues.city}
                name="city"
                label="City"
                onChange={onInputChange}
              >
                <MenuItem value="krakow">Kraków</MenuItem>
                <MenuItem value="warszawa">Warszawa</MenuItem>
                <MenuItem value="Gdansk">Gdańsk</MenuItem>
              </Select>
            </FormControl>
            <div className="mt-[6px]">
              <TextField
                className="w-[380px]"
                id="search-string"
                label="Search: Krakow, MultiSport, z trenerem"
                variant="standard"
                name="searchString"
                value={searchFormValues.searchString}
                onChange={onInputChange}
              />
            </div>
            <SearchIcon fontSize="large" style={{ color: '#5e2569' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
