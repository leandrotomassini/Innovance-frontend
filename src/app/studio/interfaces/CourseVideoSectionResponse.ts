import { CourseSection, CourseVideo } from "./";

export interface CourseVideoSectionResponse {
    idSectionCourseVideo: string;
    status: boolean;
    updatedAt: Date;
    videoCourse: CourseVideo;
    sectionCourse: CourseSection;
}
