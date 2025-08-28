> [!NOTE]  
> Please review this additional information before continuing.

The regions dataset was originally provided in raw `CSV` format by [kodewilayah.id](https://kodewilayah.id). I converted it into JSON to make it usable as a static public API. The dataset is free to use without attribution, so you're good to go!

# Geonesia API

## Overview

Public static API for Indonesian regions

- Powered by jsDelivr for fast access
- Dataset is complete based on "Permendagri No. 72/2019" down to the village/kelurahan level
- and more to explore

## How It Works

This is a **static API**, which means all data is served as pre-generated JSON files. There's no backend processing; the files are hosted on a CDN, making responses fast and reliable.

## How to Use

To get an ID for each endpoint, follow the hierarchical order: provinces → cities → districts → villages.

1. **Get all provinces**

   `https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/main.json`

2. **Get cities**

   Replace `{ID}` with the province ID

   `https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/cities/{ID}.json`

3. **Get districts**

   Replace `{ID}` with the city ID

   `https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/districts/{ID}.json`

4. **Get villages**

   Replace `{ID}` with the district ID

   `https://cdn.jsdelivr.net/gh/rezzvy/geonesia-api/data/villages/{ID}.json`

Check out our [demo](https://rezzvy.github.io/geonesia-api/) for details and a playground.

## Contributing

There's always room for improvement. Feel free to contribute!

## Licensing

The game is licensed under MIT License. Check the license file for more details.
