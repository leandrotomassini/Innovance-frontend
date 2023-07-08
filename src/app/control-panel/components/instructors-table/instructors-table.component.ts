import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../interfaces';
import { InstructorFormComponent } from '../instructor-form/instructor-form.component';

@Component({
  selector: 'app-instructors-table',
  templateUrl: './instructors-table.component.html',
  styleUrls: ['./instructors-table.component.css']
})
export class InstructorsTableComponent implements OnInit {
  instructorsList: Instructor[] = [];
  filteredInstructors: Instructor[] = [];
  filterValue: string = '';

  columnLabels: { [key: string]: string } = {
    imgUrl: 'Foto',
    fullName: 'Nombre Completo',
    title: 'Título'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  constructor(
    private instructorService: InstructorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.instructorService.findAll().subscribe((instructors: Instructor[]) => {
      this.instructorsList = instructors;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.filteredInstructors = this.instructorsList;
    } else {
      this.filteredInstructors = this.instructorsList.filter((instructor: Instructor) =>
        instructor.title.toLowerCase().includes(filterText)
      );
    }
  }

  openModal(instructorId: string): void {
    const dialogRef = this.dialog.open(InstructorFormComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.instructorId = instructorId; // Asignar instructorId al componente hijo

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se guardó correctamente, actualizar la lista de instructores
        this.instructorService.findAll().subscribe((instructors: Instructor[]) => {
          this.instructorsList = instructors;
          this.applyFilter();
        });
      }
    });
  }
}
