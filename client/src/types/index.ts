export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface AuthResponse {
  user: User;
}

export interface FormPayload {
  name: string;
  email: string;
  message: string;
  role: "Patient" | "Volunteer";
}

export interface FormRecord extends FormPayload {
  _id: string;
  createdAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactRecord extends ContactPayload {
  _id: string;
  createdAt: string;
}
