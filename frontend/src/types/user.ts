export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  position?: string;
  department?: string;
  interests: string[];
  hobbies: string[];
  telegram?: string;
  phone?: string;
  about?: string;
  avatar_url?: string;
  is_active: boolean;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  position?: string;
  interests?: string[];
  hobbies?: string[];
  telegram?: string;
  phone?: string;
  about?: string;
  avatar_url?: string;
}