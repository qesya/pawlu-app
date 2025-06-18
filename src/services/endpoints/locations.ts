export type LocationsEndpoints = {
  getLocationsIndex: () => string;
};

const locationsEndpoints: LocationsEndpoints = {
  // GET /locations
  getLocationsIndex: (): string => `/locations`,
};

export default locationsEndpoints;
