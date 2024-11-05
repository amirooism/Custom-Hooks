import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  // we have to make sure we return a promise here after we got the current position
  //this promis object is a feature that is build in to the browsers, ths object take an functin as argumnet and then in
  // that func you get two pamaeters passed in by the browser, A Resolve and Reject paramete, and in that function body
  //we should add the code that we get the user location
  return new Promise((Resolve, Reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
        // we put this function to a promis because useFetch expect a promis becasue we await a promis befor fetchFn :) "i hope you get it"
        // now we should make sure this function Resolve to a value,
        //because the fechFn expect a value
        //here we should  call resolve and pas the sortedValue as Resovle Value to Resolve
      );
      Resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
