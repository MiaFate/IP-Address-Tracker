let mymap = L.map("mapid");

async function netlifyEnvs() {
  try {
    const response = await fetch("/.netlify/functions/envsData");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchData(ip) {
  const apiUrl = `https://geo.ipify.org/api/v1?`;
  //const apiKey = "./netlify/functions/envsData.js"

  const ipAddress = ip ? ip : "";

  try {
    const envs = await netlifyEnvs();
    const { apiKey, accessToken } = envs;
    const response = await fetch(
      `${apiUrl}apiKey=${apiKey}&domain=${ipAddress}`
    );
    const data = await response.json();

    const ip = data.ip;
    const { country, region, timezone, lat, lng } = data.location;
    const isp = data.isp;
    document.getElementById("ip").textContent = `${ip}`;
    document.getElementById(
      "location"
    ).textContent = `${country}, ${region}`;
    document.getElementById("timezone").textContent = `${timezone}`;
    document.getElementById("isp").textContent = `${isp}`;
    mymap.setView([lat, lng], 13);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken
      }
    ).addTo(mymap);
  } catch (error) {
    console.log(error.message);
  }
}

const busqueda = document.getElementById("searchForm");
busqueda.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchValue = document.getElementById("searchBox").value;
  fetchData(searchValue);
});

window.onload = fetchData();
