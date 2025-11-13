
export interface Location {
  location: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  notified: boolean;
  age: number;
  preferences: string[];
  locationInfo: Location;
}