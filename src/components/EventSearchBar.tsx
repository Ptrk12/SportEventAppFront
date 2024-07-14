
import { Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Drawer from '@mui/material/Drawer'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { Search } from '@mui/icons-material';

interface Props {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => void
}

const EventSearchBar = ({ open, toggleDrawer }: Props) => {

    const handleDrawerClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        toggleDrawer(false);
    };

    const DrawerList = (
        <div className='h-[100px] flex items-center justify-center p-5  gap-5'>
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
                    value=''
                    name="discipline"
                    label="Discipline"
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
                    value=''
                    name="city"
                    label="City"
                >
                    <MenuItem value="krakow">Kraków</MenuItem>
                    <MenuItem value="warszawa">Warszawa</MenuItem>
                    <MenuItem value="Gdansk">Gdańsk</MenuItem>
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
                    labelId="discipline-select-label"
                    id="skillLevel-select"
                    value=''
                    name="skillLevel"
                    label="Skill Level"
                >
                    <MenuItem value="amateur">Amateur</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="pro">Pro</MenuItem>
                </Select>
            </FormControl>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="MultiSport" />
            </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="When" />
            </LocalizationProvider>
            <IconButton>
                    <Search/>
            </IconButton>
        </div>
    )

    return (
        <div>
            <Drawer open={open} onClose={handleDrawerClose} anchor='top'>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default EventSearchBar
