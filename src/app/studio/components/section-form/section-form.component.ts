import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CourseSectionService } from '../../services';
import { CourseSection } from '../../interfaces';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent implements OnInit {

  sectionForm: FormGroup;
  courseSection: CourseSection;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isNewSection: boolean, idCourse: string },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SectionFormComponent>,
    private courseSectionService: CourseSectionService,
    private snackBar: MatSnackBar
  ) {
    this.sectionForm = this.fb.group({
      sectionNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      title: ['', [Validators.required]],
      difficultyLevel: ['', [Validators.required]]
    });

    this.courseSection = {
      sectionNumber: '',
      title: '',
      difficultyLevel: '',
      course: data.idCourse
    };
  }

  ngOnInit(): void { }

  saveSection() {
    if (this.sectionForm.invalid) {
      return;
    }

    const newSectionData = this.sectionForm.value;

    const newCourseSection: CourseSection = {
      sectionNumber: newSectionData.sectionNumber,
      title: newSectionData.title,
      difficultyLevel: newSectionData.difficultyLevel,
      course: this.courseSection.course
    };

    if (this.data.isNewSection) {
      this.courseSectionService.create(newCourseSection).subscribe(() => {
        this.showSuccessToast('Sección creada correctamente');
        this.dialogRef.close();
      });
    } else {

    }
  }

  private showSuccessToast(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
