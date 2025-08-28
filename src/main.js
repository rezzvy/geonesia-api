document.addEventListener("DOMContentLoaded", async () => {
  const [provinceSelect, citySelect, districtSelect, villageSelect] = document.querySelectorAll("select");

  const fetchJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setLoading = (select, message) => {
    const icon = select.closest(".input-group").querySelector(".select-icon");
    icon.className = "fa fa-spinner fa-spin fa-fw select-icon";
    select.innerHTML = `<option value="">${message} <i class="fa fa-spinner fa-spin"></i></option>`;
    select.disabled = true;
  };

  const resetIcon = (select, defaultIconClass = "fa fa-file-o fa-fw select-icon") => {
    const icon = select.closest(".input-group").querySelector(".select-icon");
    icon.className = defaultIconClass;
  };

  const enableSelect = (select) => {
    select.disabled = false;
  };

  const populateSelect = async (select, items, placeholder) => {
    await delay(500);
    select.innerHTML = `<option value="">${placeholder}</option>`;
    items.forEach((item) => {
      select.innerHTML += `<option value="${item.id}">${item.name || item.province}</option>`;
    });
    enableSelect(select);
    resetIcon(select);
  };

  setLoading(provinceSelect, "Loading provinces...");
  const provinces = await fetchJSON("https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/main.json");
  await populateSelect(provinceSelect, provinces, "Select province");

  provinceSelect.addEventListener("change", async () => {
    const provinceId = provinceSelect.value;

    setLoading(citySelect, "Loading cities...");
    districtSelect.innerHTML = "<option>Select city first</option>";
    districtSelect.disabled = true;
    villageSelect.innerHTML = "<option>Select district first</option>";
    villageSelect.disabled = true;

    if (!provinceId) {
      citySelect.innerHTML = "<option>Select province first</option>";
      citySelect.disabled = true;
      resetIcon(citySelect);
      return;
    }

    const data = await fetchJSON(`https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/cities/${provinceId}.json`);
    await populateSelect(citySelect, data.city, "Select city");
  });

  citySelect.addEventListener("change", async () => {
    const cityId = citySelect.value;

    setLoading(districtSelect, "Loading districts...");
    villageSelect.innerHTML = "<option>Select district first</option>";
    villageSelect.disabled = true;

    if (!cityId) {
      districtSelect.innerHTML = "<option>Select city first</option>";
      districtSelect.disabled = true;
      resetIcon(districtSelect);
      return;
    }

    const districts = await fetchJSON(`https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/districts/${cityId}.json`);
    await populateSelect(districtSelect, districts, "Select district");
  });

  districtSelect.addEventListener("change", async () => {
    const districtId = districtSelect.value;

    setLoading(villageSelect, "Loading villages...");

    if (!districtId) {
      villageSelect.innerHTML = "<option>Select district first</option>";
      villageSelect.disabled = true;
      resetIcon(villageSelect);
      return;
    }

    const villages = await fetchJSON(`https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/villages/${districtId}.json`);
    await populateSelect(villageSelect, villages, "Select village");
  });
});
