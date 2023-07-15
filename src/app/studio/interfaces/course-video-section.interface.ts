import { CourseSection } from './course-section.interface';
import { CourseVideo } from './course-video.interface';

export interface CourseVideoSection {
  idSectionCourseVideo: string;
  status:               boolean;
  updatedAt:            Date;
  videoCourse:          CourseVideo;
  sectionCourse:        CourseSection;
}
