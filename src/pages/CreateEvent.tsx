import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the icon
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CreateEvent = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [amountOfPlayers, setAmountOfPlayers] = useState<number | null>(null);

  const [priceError, setPriceError] = useState(false);
  const [amountOfPlayersError, setAmountOfPlayersError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [discipline, setDiscipline] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [category, setCategory] = useState<string | null>("");
  const [dateWhen, setDateWhen] = useState<string | null>(null);

  console.log(dateWhen)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target;
    const numericValue = value === "" ? null : parseFloat(value);

    switch (name) {
      case "price":
        setPrice(numericValue);
        setPriceError(!validity.valid || numericValue === null);
        break;
      case "amountOfPlayers":
        setAmountOfPlayers(numericValue);
        setAmountOfPlayersError(!validity.valid || numericValue === null);
        break;
      case "time":
        setTime(numericValue);
        setTimeError(!validity.valid || numericValue === null);
        break;
      default:
        break;
    }
  };

  const categories = [
    "Outdoor",
    "Indoor",
    "Water Sports",
    "Extreme Sports",
    "Team Sports",
  ];

  return (
    <div className="bg-[url('/public/assets/stadium.jpg')] min-h-screen bg-cover flex justify-end">
      <div className="w-[45%] h-[800px] bg-white mr-36 mt-8 rounded-lg bg-slate-50 flex flex-col">
        {/* Form Content */}
        <div className="flex flex-col items-center p-4 gap-7"> 
          <div className="w-full flex justify-center items-center">
            <FormControl className="w-[550px]">
              <InputLabel id="discipline-select-label">
                Select Discipline
              </InputLabel>
              <Select
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    borderBottom: "1px solid gray",
                  },
                }}
                labelId="discipline-select-label"
                id="discipline-select"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                label="Discipline"
              >
                <MenuItem value="Football">Football</MenuItem>
                <MenuItem value="Volleyball">Volleyball</MenuItem>
                <MenuItem value="Basketball">Basketball</MenuItem>
              </Select>
            </FormControl>
            {discipline && (
              <CheckCircleIcon sx={{ color: "green", marginLeft: "10px" }} />
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <FormControl className="w-[550px]">
              <InputLabel id="skillLevel-select-label">Skill Level</InputLabel>
              <Select
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    borderBottom: "1px solid gray",
                  },
                }}
                labelId="skillLevel-select-label"
                id="skillLevel-select"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                label="Skill Level"
              >
                <MenuItem value="Amateur">Amateur</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Pro">Pro</MenuItem>
              </Select>
            </FormControl>
            {skillLevel && (
              <CheckCircleIcon sx={{ color: "green", marginLeft: "10px" }} />
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <Autocomplete
              className="w-[550px]"
              options={categories}
              value={category}
              onChange={(event, newValue) => setCategory(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Place"
                  variant="outlined"
                />
              )}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  borderBottom: "1px solid gray",
                },
                marginBottom: "1px",
                borderBottom: "1px solid gray",
              }}
            />

            {category && (
              <CheckCircleIcon sx={{ color: "green", marginLeft: "10px" }} />
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-[550px]"
                label="When"
                value={dateWhen ? dayjs(dateWhen) : null}
                onChange={(newDate) => {
                  if (newDate) {
                    const formattedDate = newDate.format("YYYY-MM-DD");
                    setDateWhen(formattedDate);
                  } else {
                    setDateWhen(null);
                  }
                }}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Input Fields with Smaller Gap */}
        <div className="flex justify-between mx-40 mt-4"> {/* Reduced top margin */}
          <TextField
            className="w-[140px]"
            required
            type="number"
            label="Price"
            name="price"
            value={price ?? ""}
            onChange={handleInputChange}
            error={priceError}
            helperText={priceError ? "Please enter price" : ""}
          />
          <TextField
            className="w-[140px]"
            required
            type="number"
            label="n.o players"
            name="amountOfPlayers"
            value={amountOfPlayers ?? ""}
            onChange={handleInputChange}
            error={amountOfPlayersError}
            helperText={
              amountOfPlayersError ? "Please enter number of players" : ""
            }
          />
          <TextField
            className="w-[140px]"
            required
            type="number"
            label="Game time"
            name="time"
            value={time ?? ""}
            onChange={handleInputChange}
            error={timeError}
            helperText={timeError ? "Please enter game time" : ""}
          />
        </div>

        {/* Centered Button at the Bottom */}
        <div className="flex justify-center p-8">
          <Button size="large" variant="contained" color="success">
            CREATE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
