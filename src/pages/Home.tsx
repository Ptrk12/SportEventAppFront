import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

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

  const onInputSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSearchFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDisciplineChange = (event: SelectChangeEvent<string>) => {
    setSearchFormValues((prevValues) => ({
      ...prevValues,
      discipline: event.target.value as string,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex align-center justify-center">
        <span>What would You like to do?</span>
      </div>
      <div className="flex align-center justify-center">
        <div className="flex">
          <FormControl className="w-[160px]">
            <InputLabel id="discipline-select-label">Discipline</InputLabel>
            <Select
              labelId="discipline-select-label"
              id="discipline-select"
              value={searchFormValues.discipline}
              name="discipline"
              label="Discipline"
              onChange={handleDisciplineChange}
            >
              <MenuItem value="football">Football</MenuItem>
              <MenuItem value="volleyball">Volleyball</MenuItem>
              <MenuItem value="basketball">Basketball</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Home;
