import { Instructor } from 'src/app/control-panel/interfaces';
import { Course } from './course.interface';

export interface CourseInstructor {
  idCourseInstructor: string;
  status: boolean;
  course: Course;
  instructor: Instructor;
}
