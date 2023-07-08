import { User } from 'src/app/auth/interfaces';

export interface Instructor {
  idInstructor?: string;
  imgUrl:       string;
  title:        string;
  status:       boolean;
  user:         User;
}
