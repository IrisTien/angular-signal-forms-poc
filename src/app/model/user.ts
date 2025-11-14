export interface Location {
  country: string;
  city: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  notified: boolean;
  age: number;
  preferences: string[];
  locationData: Location;
}

export interface SimpleUser {
  firstName: string;
}