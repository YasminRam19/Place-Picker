//Utility function that can be called to send that request
export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  if (!response.ok) {
    //200 or 300 OK code
    //400 or 500 ERROR code
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}

//
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();
  if (!response.ok) {
    //200 or 300 OK code
    //400 or 500 ERROR code
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}

//
export async function updateUserPlaces(places) {
  //Method: We need to change the http mehtod (the default is GET)
  //Body: JS arrays are not attachable format, instead it should be converted to JSON format
  //Header: To inform the backend that the data attched to this request will be in JSON format
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    //200 or 300 OK code
    //400 or 500 ERROR code
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
