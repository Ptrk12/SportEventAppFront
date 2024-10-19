import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import SportEventCardItem from "../components/SportEventCardItem";
import { SportEvent } from "../interfaces";
import api from "../requests/req";
import authHeader from "../services/auth-header";
import authService from "../services/authService";
import CircularProgress from "@mui/material/CircularProgress";

interface FormComponentProps {
  discipline: string;
  city: string;
  searchString: string;
}

const Home = () => {
  const [sportEventCardItems, setSportEventCardItems] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetching = useRef(false);

  const navigate = useNavigate();

  const [searchFormValues, setSearchFormValues] = useState<FormComponentProps>({
    discipline: "",
    city: "",
    searchString: "",
  });

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/sportevents', { headers: authHeader() });

      const sortedEvents = response.data
      .filter((event: SportEvent) => !isNaN(new Date(event.dateWhen).getTime()))
      .sort((a: SportEvent, b: SportEvent) => {
        return new Date(a.dateWhen).getTime() - new Date(b.dateWhen).getTime(); 
      })
      .slice(0, 4);
    

      setSportEventCardItems(sortedEvents);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError('Failed to fetch events. Please try again.');
      if (err.response && err.response.status === 403) {
        authService.logout();
        navigate('/login');
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (!isFetching.current) {
      isFetching.current = true;
      fetchEvents();
    }
  }, []);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    setSearchFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log(searchFormValues);
    navigate('/events', { state: searchFormValues });
  };

  return (
    <div>
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
                  value={searchFormValues.city}
                  name="city"
                  label="City"
                  onChange={onInputChange}
                >
                  <MenuItem value="Krakow">Krakow</MenuItem>
                  <MenuItem value="Warszawa">Warszawa</MenuItem>
                  <MenuItem value="Gdansk">Gdansk</MenuItem>
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
              <IconButton onClick={handleSearch}>
                <SearchIcon fontSize="large" style={{ color: '#5e2569' }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-center justify-center">
        <span className="font-bold text-3xl max-w-[25%] p-6 text-slate-700">
          Join a game in your area
          or add your source
          FOR YOU | FOR FRIENDS | FOR COMPANY
        </span>
        <span className="max-w-[40%] font-medium text-slate-700 p-6">
          Join us and find a training session for yourself, your friends or become an organizer!
          Choosing from many sports, such as volleyball, football, basketball, badminton.
          Sign up for classes with a trainer or a casual game.
          We organize and provide sports activities -
          find your team and a place to play!
        </span>
      </div>
      <div className="flex flex-col justify-center items-center mt-28">
        <div className="flex justify-center items-center space-x-[700px] max-w-7xl mx-auto">
          <span className="font-medium text-slate-600 text-2xl">
            UPCOMING CLASSES
          </span>
          <button onClick={() =>navigate('/events')} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
            hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            SEE ALL
          </button>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5 p-5">
            {sportEventCardItems.map((x) => (
              <SportEventCardItem key={x.id} item={x} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
