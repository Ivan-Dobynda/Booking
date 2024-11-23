"use client";
import { fetchOffers } from "@/lib/services/offerService";
import { Transition } from "@headlessui/react";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useState,
  Fragment,
} from "react";

// Define the initial state for flights and filters
const initialState: any = {
  flights: [],
  filters: {},
  isLoading: false,
  clientKey: "",
  errors: [],
};

// Create a context for the flights and filters state
const FlightsContext = createContext(initialState);

// Define action types for state changes
const SET_FLIGHTS = "SET_FLIGHTS";
const SET_AFTER = "SET_AFTER";
const SET_CLIENT_KEY = "SET_CLIENT_KEY";
const SET_FILTERS = "SET_FILTERS";
const SET_ERRORS = "SET_ERRORS";
const SET_LOADING = "SET_LOADING";

// Reducer function to handle state changes based on actions
const flightsReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_FLIGHTS:
      return {
        ...state,
        flights: [...action.payload.offers],
        airlines: [...action.airlines],
        clientKey: action.client_key,
      };
    case SET_AFTER:
      return { ...state, after: action.payload };
    case SET_CLIENT_KEY:
      return { ...state, clientKey: action.payload };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERRORS:
      return { ...state, errors: [...action.payload] };
    default:
      return state;
  }
};

// Custom hook to use the flights context in components
const useFlightsContext = () => {
  return useContext(FlightsContext);
};

// Flights context provider component
interface FlightsProviderProps {
  children: ReactNode;
  searchParams: any;
}

const FlightsProvider = ({ children, searchParams }: FlightsProviderProps) => {
  const [state, dispatch] = useReducer(flightsReducer, initialState);
  const [filters, setFilters] = useState({});
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const getOffers = async () => {
      clearTimeout(timer);
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: SET_ERRORS, payload: [] });
      try {
        const res: any = await fetchOffers(searchParams);
        const data = await res.json();
        const result = data.result;
        if (!res.ok) {
          const errors = result.errors?.map((error: any) => error.message);
          dispatch({ type: SET_ERRORS, payload: errors });
          return;
        }
        dispatch({
          type: SET_FLIGHTS,
          payload: { offers: result.offers } || [],
          airlines: result.airlines,
          client_key: result.client_key || "",
        });
        console.clear();
        const time =
          new Date(result.expires_at).getTime() - 300000 - new Date().getTime();
        console.log(time);
        timer = setTimeout(() => {
          getOffers();
        }, time);
      } catch (err) {
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
    };
    if (Object.keys(searchParams).length > 0) {
      getOffers();
    } else {
      dispatch({ type: SET_FLIGHTS, payload: { offers: [] }, airlines: [] });
    }
  }, [searchParams]);

  const fetchMore = () => {
    const getOffers = async (searchParams: any) => {
      dispatch({ type: SET_LOADING, payload: true });

      try {
        const res: any = await fetchOffers(searchParams);
        const data = await res.json();
        if (!res.ok) return;
        dispatch({
          type: SET_CLIENT_KEY,
          payload: data.result?.client_key || "",
        });
        dispatch({
          type: SET_FLIGHTS,
          payload: [...state.flights, ...data?.result?.offers],
        });
      } catch (err) {
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
    };
    const searchParamsCopy = { ...searchParams };
    getOffers(searchParamsCopy);
  };

  return (
    <FlightsContext.Provider
      value={{ state, dispatch, fetchMore, setFilters, filters }}
    >
      {children}
      {/* <Transition
        show={state.isLoading}
        as={Fragment}
        enter="transition duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-[10px] z-50 flex justify-center items-center">
          <div className="max-w-lg w-full py-5 px-6 rounded-xl bg-white shadow-lg">
            <h4 className="font-semibold text-xl mb-1 text-gray-700">
              Please wait...
            </h4>
            <h5 className="text-gray-600">We are loading offers.</h5>
          </div>
        </div>
      </Transition> */}
    </FlightsContext.Provider>
  );
};

export {
  FlightsProvider,
  useFlightsContext,
  SET_FLIGHTS,
  SET_AFTER,
  SET_FILTERS,
  SET_ERRORS,
  SET_LOADING,
  SET_CLIENT_KEY,
};
