import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "./http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        //SORT Available places by distance to user's location
        //"navidator" is provided that the browser and as fetch, it might take some time.
        /*navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(resData.places);
          //To avoid an early execution of the setIsFetching to false, we move its state update here, because in navigator we do not have await.
          setIsFetching(false);
        });*/
        setAvailablePlaces(places);
        setIsFetching(false);
      } catch (error) {
        //Stop the application from crashing and enables to define which code should be executed instead.
        setError({
          message:
            error.message ||
            "Could not find fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error ocurred!" message={error.message} />;
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
