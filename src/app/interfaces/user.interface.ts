
export interface UserInterface {
  id:       string;
  email:    string;
  password?: string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
}
