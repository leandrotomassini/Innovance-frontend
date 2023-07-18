import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CourseSectionService } from '../../services';



@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent {

  sectionForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isNewSection: boolean },
    private fb: FormBuilder,
    private courseSectionService: CourseSectionService
  ) {
    this.sectionForm = this.fb.group({
      sectionNumber: ['', [Validators.required]],
      title: ['', [Validators.required]],
      difficultyLevel: ['', [Validators.required]]
    });
  }

  saveSection() {

  }
}
