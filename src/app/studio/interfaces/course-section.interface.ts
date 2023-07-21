import { Course } from './course.interface';

export interface CourseSection {
  sectionCourseId?: string;
  sectionNumber: string;
  title: string;
  difficultyLevel: string;
  status?: boolean;
  panelOpenState?: boolean;
  course: string;
}
