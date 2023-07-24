import { CourseSection } from './course-section.interface';
import { CourseVideo } from './course-video.interface';

export interface CourseVideoSection {
  idSectionCourseVideo?: string;
  status?: boolean;
  updatedAt?: Date;
  videoCourse: CourseVideo;
  sectionCourse: CourseSection;
}


export interface CourseVideoSectionCreate {
  idSectionCourseVideo?: string;
  status?: boolean;
  updatedAt?: Date;
  videoCourse: string;
  sectionCourse: string;
}
