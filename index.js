async function fetchIP(ip) {
  const apiUrl = `https://geo.ipify.org/api/v1?`;
  const apiKey = process.ENV.APIKEY//`at_FlNUZd8htagHp70zPRaP6G8Yoerxq`;

  const ipAddress = ip ? ip : "";
  
  console.log(ipAddress);
  try {
    const response = await fetch(
      `${apiUrl}apiKey=${apiKey}&domain=${ipAddress}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const busqueda = document.getElementById("searchForm");

busqueda.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchValue = document.getElementById("searchBox").value;
  const ipData = await fetchIP(searchValue);
  const ip = ipData.ip;
  const {country, region, timezone, lat, lng} = ipData.location;
  const isp = ipData.isp  
  document.getElementById("ip").textContent = `ip Address: ${ip}`;
  document.getElementById("location").textContent = `Location: ${country}, ${region}`;
  document.getElementById("timezone").textContent = `Timezone: ${timezone}`;
  document.getElementById("isp").textContent = `ISP: ${isp}`;
  
});

//window.onload()
