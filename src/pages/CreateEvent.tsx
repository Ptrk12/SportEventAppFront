import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocalizationProvider, DatePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import api from '../requests/req';
import PopupInfo from '../components/PopupInfo';
import { useNavigate } from 'react-router-dom';


interface baseObjectsInfo{
  id:number
  name:string
}

const CreateEvent = () => {
  const navigate = useNavigate();

  const [isMultisportCard, setIsMultisportCard] = useState(false)
  const [eventName, seteventName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [amountOfPlayers, setAmountOfPlayers] = useState<number | null>(null);

  const [priceError, setPriceError] = useState(false);
  const [amountOfPlayersError, setAmountOfPlayersError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [discipline, setDiscipline] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [object, setobject] = useState<baseObjectsInfo | null>(null);
  const [dateWhen, setDateWhen] = useState<string | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');


  const [objects, setobjects] = useState<baseObjectsInfo[]>([]);

   useEffect(() => {
    fetchObjectsFromDb();
  }, []);

  console.log(dateWhen);

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

  const isFormValid = () => {
    return (
      eventName.trim() !== "" &&
      price !== null &&
      price > 0 &&
      time !== null &&
      time > 0 &&
      amountOfPlayers !== null &&
      amountOfPlayers > 0 &&
      discipline.trim() !== "" &&
      skillLevel.trim() !== "" &&
      object !== null &&
      dateWhen !== null &&
      dateWhen.trim() !== ""
    );
  };

  const fetchObjectsFromDb = async () => {
    try{
      const response = await api.get("/object-base-info")
      setobjects(response.data)
    }catch(err:any){
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
    }
  }
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('button clicked')

    if (!isFormValid()) {
      console.log('Form is invalid');
      return;
    }

    const eventData = {
      eventName,
      price,
      time,
      amountOfPlayers,
      discipline,
      skillLevel,
      objectId: object?.id,
      dateWhen,
      isMultisportCard
    };

    try {
      const token = "CfDJ8PLc2bxNn7xGhVTfGs3MJhr2vJ7sSSjS4ycFi_WQipOQ57PWBZw4N9clyuzo3Dbw-5YS4v64da3HziekqERu7l3HrDWM0kxh1U0IKZqMofQ2eJZDvXyms2Y_2Q9pJXBqKLIIKCNq0aF6dpwuUiKnMsSBPpE1c12DT7TtZvVQeI_RS2sBy1FQQ-JB586CbeN3ERhdWgta-0gjAMc9Dg4HuNF6Xyf74Um63Xpx7mIUXj7T9kG603KUS53i9MN4kMBiorkT_EoCd-sJnXtvbSK2zJ7Mu-FhxFhXgIXX9vLF1ktB-fJEuaONxL6Of1A1jL8lSyI0u7YL8Cjt6fVbodqKuGVJE2wckhqo-k7s-4uEl8oGDnQUPboMNXByo-3g102d4MpFTgUn5-isNtRDzyZRzD97Yi4AvbxuGyKudq35aL3du_MaUL1vgXeNRbV8UYaRJ0EBogdFrb02OaYsCqeJOiPUhAJH6s0_N7ZUg9j73YN345MSSyM0nFOejZBuT_JpvGWR0jE7avRGHo2LWfDrr9iZzTsvHTNzs9E8kGAh_eLSaJQJwv0cV5xmZH-kNQdw4UUU1PbPIS2GqOXjho7eYbNZCtNCpNe9Xv1jv_I4QXPA7kEe7lrzC0b2wSEJNdmK_6zJS1r0dCmaUx1uuatpgheqHFyMI2lLMIfPREUIVc3QitR5ESmAoE-j1GPItFFIVw"; // Replace with your actual token
      const response = await api.post("/sportevents", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setPopupMessage("Event created successfully!");
        setPopupSeverity("success");
        setShowPopup(true);
        navigate('/events');
      }
    } catch (error: any) {
      if (error.response && error.response.status > 400) {
        setPopupMessage("Something went wrong! Event could not be created.");
        setPopupSeverity("error");
        setShowPopup(true);
      } else {
        console.error("Error creating event", error);
        setPopupMessage("An unexpected error occurred.");
        setPopupSeverity("error");
        setShowPopup(true);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
<div className="bg-[url('/public/assets/stadium.jpg')] min-h-screen bg-cover flex justify-end">
  <div className="w-[49%] h-[800px] bg-white mr-36 mt-8 rounded-lg bg-slate-50 flex flex-col p-6 box-border"> {/* Added padding inside the white box */}
    <PopupInfo
      message={popupMessage}
      severity={popupSeverity}
      open={showPopup}
      handleClose={handleClosePopup}
    />
    <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
      {/* Flex container for inputs on the left */}
      <div className="flex gap-x-8"> {/* Adjusted the gap between the columns */}
        <div className="flex flex-col w-[60%] gap-7"> {/* Reduced the width of left section */}
          <div className="w-full flex gap-4 items-center">
            <TextField
              className="w-[75%]"
              required
              type="text"
              label="Event Name"
              name="eventName"
              value={eventName ?? ""}
              onChange={(e) => seteventName(e.target.value)}
            />
            {eventName && (
              <CheckCircleIcon sx={{ color: "green", marginLeft: "10px" }} />
            )}
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isMultisportCard} onChange={(e) => setIsMultisportCard(e.target.checked)} />}
                label="MultiSport"
              />
            </FormGroup>
          </div>

          <div className="w-full flex gap-4 items-center">
            <FormControl className="w-full">
              <InputLabel id="discipline-select-label">Select Discipline</InputLabel>
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

          <div className="w-full flex gap-4 items-center">
            <FormControl className="w-full">
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

          <div className="w-full flex gap-4 items-center">
            <Autocomplete
              className="w-full"
              options={objects}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => setobject(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Place" variant="outlined" />
              )}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                marginBottom: "1px",
                borderBottom: "1px solid gray",
              }}
            />
            {object && (
              <CheckCircleIcon sx={{ color: "green", marginLeft: "10px" }} />
            )}
          </div>

          {/* Input fields for price, amount of players, game time */}
          <div className="w-full flex gap-4">
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
              helperText={amountOfPlayersError ? "Please enter number of players" : ""}
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
        </div>

        {/* DateTimePicker container on the right */}
        <div className="w-[35%] pl-8 flex justify-center items-center"> {/* Added padding-left and reduced width */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              className="w-full"
              value={dateWhen ? dayjs(dateWhen) : null}
              onChange={(newDate) => {
                if (newDate) {
                  setDateWhen(newDate.toISOString());
                } else {
                  setDateWhen(null);
                }
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      {/* Submit button centered at the bottom */}
      <div className="flex justify-center p-8">
        <Button
          size="large"
          variant="contained"
          color="success"
          type="submit"
          disabled={!isFormValid()}
          sx={{ backgroundColor: isFormValid() ? "" : "gray" }}
        >
          CREATE
        </Button>
      </div>
    </form>
  </div>
</div>
  );
};

export default CreateEvent;
