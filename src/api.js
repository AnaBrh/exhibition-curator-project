import axios from 'axios';

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

// Fetch Met Artworks
const fetchMetArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    const searchResponse = await axios.get(`${MET_API_URL}/search`, {
      params: {
        q: query,
        hasImages: true,
        ...filters,
        sort: sortOption,
      }
    });

    const objectIDs = searchResponse.data.objectIDs || [];

    const artworks = await Promise.all(
      objectIDs.slice(0, 50).map(id => axios.get(`${MET_API_URL}/objects/${id}`))
    );

    return artworks
      .map(res => res.data)
      .filter(artwork => artwork.primaryImage);
  } catch (error) {
    console.error('Error fetching Met artworks:', error);
    return [];
  }
};

// Fetch Harvard Artworks
const fetchHarvardArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    const params = {
      apikey: HARVARD_API_KEY,
      hasimage: 1,
      q: query,
      ...filters,
      sort: sortOption,
    };

    const response = await axios.get(`${HARVARD_API_URL}/object`, { params });

    const records = response.data.records || [];
    const artworksWithImages = records
      .filter(record => record.primaryimageurl || record.iiifbaseuri)
      .map(record => {
        let imageUrl = record.primaryimageurl;
        if (!imageUrl && record.iiifbaseuri) {
          imageUrl = `${record.iiifbaseuri}/full/full/0/default.jpg`;
        }
        return {
          ...record,
          imageUrl
        };
      });
    return artworksWithImages;
  } catch (error) {
    console.error('Error fetching Harvard artworks:', error);
    return [];
  }
};


// Combined fetch function
const fetchArtworks = async (query, filters = {}, sortOption = '') => {
  const [harvardArtworks, metArtworks] = await Promise.all([
    fetchHarvardArtworks(query, filters, sortOption),
    fetchMetArtworks(query, filters, sortOption)
  ]);

  console.log('Combined Artworks:', { harvardArtworks, metArtworks });

  return {
    harvardArtworks,
    metArtworks
  };
};

export { fetchArtworks };

/*
metArtworks
: 
Array(13)
0
: 
classification (this is the object type/material)
:
department (this is the department)
: 
period (this is the date/era)
:
country (this is geographic location)
:


/////////////////////////////////////////////////////

harvardArtworks
: 
Array(10)
0
:
department (this is the department)
: 
period (this is the date/era)
worktypes
: 
Array(1)
0
: 
worktype (this is the object type/material)

Place
Contains information on the places (states, countries, continents, or historical regions) used to describe items in the Harvard Art Museums collections.

Get Places
GET /place will get all places.

Include one or more of the following parameters to filter the items.

Parameter	Value
apikey	YOUR API KEY required
q	FIELD:VALUE (see Elasticsearch Query String syntax for more options)
size	0-9+
page	0-9+
sort	FIELD NAME or "random" or "random:[SEED NUMBER]"
sortorder	asc or desc
fields	comma separated list of data fields you want in the output
aggregation	see Elasticsearch aggregations
id	pipe separated list of record IDs
usedby	FIELD NAME:ID
level	[0-9+]
parent	[0-9+]
Examples
https://api.harvardartmuseums.org/place?parent=2028439
Returns all records for places that are in New York state.

Response
{
    "info": {
        "totalrecordsperquery": 10,
        "totalrecords": 91,
        "pages": 10,
        "page": 1,
        "next": "https://api.harvardartmuseums.org/place?parent=2028439&size=10&page=2",
        "responsetime": "6 ms"
    },
    "records": [
        {
            "objectcount": 3,
            "id": 2036944,
            "lastupdate": "2017-02-02T04:18:45-0500",
            "tgn_id": 7013343,
            "haschildren": 0,
            "level": 4,
            "geo": {
                "lon": -76.55,
                "lat": 42.916
            },
            "placeid": 2036944,
            "pathforward": "North America\\United States\\New York\\",
            "parentplaceid": 2028439,
            "name": "Auburn"
        },
        {
            "objectcount": 14,
            "id": 2036956,
            "lastupdate": "2017-02-02T04:18:45-0500",
            "tgn_id": 7014317,
            "haschildren": 0,
            "level": 4,
            "geo": {
                "lon": -76.5,
                "lat": 43.45
            },
            "placeid": 2036956,
            "pathforward": "North America\\United States\\New York\\",
            "parentplaceid": 2028439,
            "name": "Oswego"
        },
        {
            "objectcount": 78,
            "id": 2036963,
            "lastupdate": "2017-02-02T04:18:45-0500",
            "tgn_id": 7015822,
            "haschildren": 0,
            "level": 4,
            "geo": {
                "lon": -73.966,
                "lat": 40.683
            },
            "placeid": 2036963,
            "pathforward": "North America\\United States\\New York\\",
            "parentplaceid": 2028439,
            "name": "Brooklyn"
        }
    ]
}
Get Place
GET /place/PLACE_ID will get the full record of the specified place.

tgn_id contains the ID of the equivalent record in the Getty Thesaurus of Geographic Names

Examples
https://api.harvardartmuseums.org/place/2028422
Returns the full record for the country Norway.

Response
{
    "placeid": 2028422,
    "name": "Norway",
    "pathforward": "Europe\\",
    "parentplaceid": 2028188,
    "haschildren": 1,
    "level": 2,
    "objectcount": 12,
    "tgn_id": 1000088,
    "id": 2028422,
    "geo": {
        "lat": 62,
        "lon": 10
    },
    "lastupdate": "2017-02-02T04:18:42-0500"
}
*/