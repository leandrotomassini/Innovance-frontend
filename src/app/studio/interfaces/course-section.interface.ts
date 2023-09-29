import { CourseVideo } from './course-video.interface';


export interface CourseSection {
  sectionCourseId?: string;
  sectionNumber: string;
  title: string;
  difficultyLevel: string;
  status?: boolean;
  panelOpenState?: boolean;
  course: string;
  videos?: CourseVideo[];
}
