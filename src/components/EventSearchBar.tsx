import { Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { Search } from '@mui/icons-material';
import { SportEvent } from '../interfaces';
import dayjs, { Dayjs } from 'dayjs'; // Import 'dayjs' and 'Dayjs'

interface Props {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => void;
    events: SportEvent[];
    onFilter: (filtered: SportEvent[]) => void; 
}

const EventSearchBar = ({ open, toggleDrawer, events, onFilter }: Props) => {
    const [discipline, setDiscipline] = useState('');
    const [city, setCity] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [isMultiSport, setIsMultiSport] = useState(false);
    const [dateWhen, setDateWhen] = useState<string | null>(null);  // Store the date as a string

    const handleDrawerClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        toggleDrawer(false);
    };

    console.log(dateWhen);  

    const handleSearch = () => {
        const filteredEvents = events.filter(event => {
            const matchesDiscipline = discipline ? event.discipline === discipline : true;
            const matchesCity = city ? event.objectCity === city : true;
            const matchesSkillLevel = skillLevel ? event.skillLevel === skillLevel : true;
            const matchesMultiSport = isMultiSport ? event.isMultisportCard === isMultiSport : true;
            const matchesDate = dateWhen ? event.dateWhen === dateWhen : true;
            return matchesDiscipline && matchesCity && matchesSkillLevel && matchesMultiSport && matchesDate;
        });

        onFilter(filteredEvents); 
        toggleDrawer(false); 
    };

    const DrawerList = (
        <div className='h-[100px] flex items-center justify-center p-5 gap-5'>
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
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    label="Discipline"
                >
                    <MenuItem value="Football">Football</MenuItem>
                    <MenuItem value="Volleyball">Volleyball</MenuItem>
                    <MenuItem value="Basketball">Basketball</MenuItem>
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="City"
                >
                    <MenuItem value="Kraków">Kraków</MenuItem>
                    <MenuItem value="Warszawa">Warszawa</MenuItem>
                    <MenuItem value="Gdańsk">Gdańsk</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="w-[350px]">
                <InputLabel id="skillLevel-select-label">Skill Level</InputLabel>
                <Select
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiSelect-select': {
                            borderBottom: '1px solid gray',
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
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={isMultiSport} onChange={(e) => setIsMultiSport(e.target.checked)} />}
                    label="MultiSport"
                />
            </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="When"
                    value={dateWhen ? dayjs(dateWhen) : null} 
                    onChange={(newDate) => {
                        if (newDate) {
                            const formattedDate = newDate.format('YYYY-MM-DD'); 
                            setDateWhen(formattedDate); 
                        } else {
                            setDateWhen(null); 
                        }
                    }}
                />
            </LocalizationProvider>
            <IconButton onClick={handleSearch}>
                <Search />
            </IconButton>
        </div>
    );

    return (
        <div>
            <Drawer open={open} onClose={handleDrawerClose} anchor='top'>
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default EventSearchBar;
