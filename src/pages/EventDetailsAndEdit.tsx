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
import { useNavigate, useParams } from 'react-router-dom';
import authService from "../services/authService";
import authHeader from "../services/auth-header";
import { SportEvent } from "../interfaces";

interface baseObjectsInfo {
    id: number
    name: string
}

const EventDetailsAndEdit = () => {

    const { eventId } = useParams();

    const navigate = useNavigate();

    const [event, setSportEvent] = useState<SportEvent | null>(null);

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
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');

    const getEventById = async (id: number) => {
        try {
            const response = await api.get(`/sportevents/${id}`, {
                headers: authHeader(),
            });
            if (response.status === 200 && response.data) {
                const eventData = response.data;

                const objectInfo: baseObjectsInfo = {
                    id: eventData.objectId,
                    name: eventData.objectName,
                };

                setSportEvent(eventData);
                seteventName(eventData.eventName);
                setIsMultisportCard(eventData.isMultisportCard);
                setPrice(eventData.price);
                setTime(eventData.time);
                setDiscipline(eventData.discipline);
                setSkillLevel(eventData.skillLevel);
                setDateWhen(eventData.dateWhen);
                setAmountOfPlayers(eventData.amountOfPlayers)
                setobject(objectInfo);
            }
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.status === 403) {
                authService.logout();
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

//tutaj dac sprawdzanie headera
    const handleDelete = async() => {
        try{
            const id = Number(eventId);
            const response =await api.delete(`/sportevents/${id}`, { headers: authHeader() })
            if(response.status === 201){
                navigate('/')
            }

        }catch(error:any){

        }
    }

    const [objects, setobjects] = useState<baseObjectsInfo[]>([]);

    const fetchObjectsFromDb = async () => {
        try {
            const response = await api.get("/object-base-info", { headers: authHeader() })
            setobjects(response.data)
        } catch (err: any) {
            if (err.response && err.response.status === 403) {
                authService.logout();
                navigate('/login')
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
        }
    }

    useEffect(() => {
        const id = Number(eventId);
        const fetchEventDetails = async () => {
            setIsLoading(true);
            await getEventById(id);
        };
        const fetchObjects = async () => {
            setIsLoading(true);
            await fetchObjectsFromDb();
        }

        fetchEventDetails();
        fetchObjects();

    }, [eventId]);

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
            const id = Number(eventId);
            const response = await api.put(`/sportevents/${id}`, eventData, {
                headers: authHeader(),
            });
            if (response.status === 201) {
                setPopupMessage("Event created successfully!");
                setPopupSeverity("success");
                setShowPopup(true);
                navigate('/events');
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 409) {
                    setPopupMessage("Something went wrong! Event could not be created.");
                    setPopupSeverity("error");
                    setShowPopup(true);
                }
                else if (error.response.status === 403) {
                    authService.logout();
                    navigate('/login')
                }
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
        <div className="bg-[url('/public/assets/stadium.jpg')] min-h-screen bg-cover bg-opacity-70 flex justify-end items-center">
            <div className="w-[90%] max-w-[1200px] h-auto bg-white shadow-lg mr-8 mt-8 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col p-8 box-border">
                <PopupInfo
                    message={popupMessage}
                    severity={popupSeverity}
                    open={showPopup}
                    handleClose={handleClosePopup}
                />
                <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
                    {/* Flex container for inputs on the left */}
                    <div className="flex flex-wrap gap-8">
                        <div className="flex flex-col w-full lg:w-[60%] gap-8">
                            <div className="w-full flex gap-4 items-center">
                                <TextField
                                    className="w-[75%]"
                                    required
                                    type="text"
                                    label="Event Name"
                                    name="eventName"
                                    value={eventName ?? ""}
                                    onChange={(e) => seteventName(e.target.value)}
                                    InputProps={{
                                        sx: { borderBottom: '2px solid #ccc', '&:hover': { borderBottom: '2px solid #999' } }
                                    }}
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
                                                borderBottom: "2px solid gray",
                                                padding: '8px',
                                                '&:hover': {
                                                    borderBottom: '2px solid #666',
                                                }
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
                                                borderBottom: "2px solid gray",
                                                padding: '8px',
                                                '&:hover': {
                                                    borderBottom: '2px solid #666',
                                                }
                                            },
                                        }}
                                        labelId="skillLevel-select-label"
                                        id="skillLevel-select"
                                        value={skillLevel}
                                        onChange={(e) => setSkillLevel(e.target.value)}
                                        label="Skill Level"
                                    >
                                        <MenuItem value="Amateur">Amateur</MenuItem>
                                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                                        <MenuItem value="Professional">Professional</MenuItem>
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
                                    value={object} 
                                    onChange={(event, newValue) => setobject(newValue)} 
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Place" variant="outlined" />
                                    )}
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                        marginBottom: "1px",
                                        borderBottom: "2px solid gray",
                                        padding: '8px',
                                        '&:hover': {
                                            borderBottom: '2px solid #666',
                                        },
                                    }}
                                />
                                {object && (
                                    <CheckCircleIcon sx={{ color: "green", marginLeft: "10px" }} />
                                )}
                            </div>

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
                        <div className="w-full lg:w-[35%] flex justify-center items-center">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticDateTimePicker
                                    className="w-full bg-white rounded-lg shadow-md"
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
                    <div className="flex justify-center py-8">
                        <Button
                            size="large"
                            variant="contained"
                            color="success"
                            type="submit"
                            disabled={!isFormValid()}
                            sx={{
                                backgroundColor: isFormValid() ? "linear-gradient(to right, #38b2ac, #2d3748)" : "gray",
                                '&:hover': {
                                    backgroundColor: isFormValid() ? "#2c7a7b" : "gray",
                                },
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '30px',
                            }}
                        >
                            EDIT
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete()}
                        >
                            DELETE
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventDetailsAndEdit
