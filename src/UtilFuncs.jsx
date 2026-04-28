export const onAppStart = async (dispatch) => {
  // fetch data from db and set up starting state of the app
  dispatch({ type: "LOADING", payload: true });

  try {
    const urls = [
      "http://localhost:5000/current",
      "http://localhost:5000/caught",
      "http://localhost:5000/targets"
    ];

    const responses = await Promise.all(urls.map(u => fetch(u)));

    if (responses.every(r => r.ok)) {
      const [current, caught, targets] = await Promise.all(
        responses.map(r => r.json()));

      dispatch({
      type: "INITIALIZE",
      payload: {
        current: current,
        caught: caught,
        targets: targets,
        loading: false
      }
    });}
  }
  catch (error) {
    console.error("Initialization failed:", error);
    dispatch({ type: "SET_LOADING", payload: false });
  }
};

let cache = null;
export const getNames = async (url, input) => {
  try {
    if (!cache) {
      const response = await fetch(url);
      const data = await response.json();
      cache = data.results;
    }

    return cache.filter(d => d.name.toLowerCase()
      .includes(input.toLowerCase())).map(d => ({
        label: d.name.charAt(0).toUpperCase() + d.name.slice(1),
        value: d.url
      }))
      .slice(0, 50);
  }
  catch (error) {
    console.error(error);
    return [];
  }
};

const saveToDb = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const setCurrent = async (state, dispatch, selected, navigate) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await fetch(selected);
    if (!response.ok) throw new Error("Failed to fetch data...");

    const pokemon = await response.json();
    const newHunt = {
      name: pokemon.name,
      img: pokemon.sprites.front_shiny,
      encounters: 0
    }

    await saveToDb("http://localhost:5000/current", newHunt);

    dispatch({ type: "SET_CURRENT_HUNT", payload: newHunt });
    dispatch({ type: "LOADING", payload: false });
    
    console.log("now redirecting")
    navigate("/continue")
    console.log("called redirect")

  }
  catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
  }
};