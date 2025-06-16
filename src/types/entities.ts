export interface Workshop {
  id: number;
  name: string;
  address_1: string;
  address_2: string | null;
  city: string;
  zip_code: string;
  country_code: string;
}

export interface VehicleModel {
  id: number;
  name: string;
}

export interface Vehicle {
  id: number;
  external_id: string;
  name: string;
  model: VehicleModel | null;
}

export interface User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  project: string;
}

export interface Subcategory {
  id: number;
  title: string;
  parent_id: number | null;
}

// Assuming Category is similar to Subcategory (adjust if needed)
export interface Category {
  id: number;
  title: string;
}

export interface Repair {
  id: number;
  damageIds: number[];
  vehicle_id: number;
  start_date: string;  // ISO date string
  start_time: string;  // "HH:mm:ss" string
  end_date: string;    // ISO date string
  end_time: string;    // "HH:mm:ss" string
  comment: string | null;
  workshop: Workshop | null;
}

export interface Damage {
  id: number;
  date: string;        // ISO date string
  time: string;        // "HH:mm:ss" string
  comment: string | null;
  position: string;
  left_percentage: string;
  top_percentage: string;
  vehicle: Vehicle | null;
  user: User | null;
  category: Category | null;
  subcategory: Subcategory | null;
  repair: Repair | null;
}
