export interface User {
    id:      string;
    email:    string;
    password?: string;
    fullName:     string;
    isActive: boolean;
    roles:    string[];
}
