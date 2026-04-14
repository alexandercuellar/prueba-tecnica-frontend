import { Routes } from "@angular/router";
import { MainLayoutComponent } from '../../Core/layouts/main-layout/main-layout';
import { authGuard } from '../../Core/guards/auth-guard';
export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'student',
        loadComponent: () =>
          import('./student-directory/student-directory')
            .then(m => m.StudentDirectoryComponent)
      },
      {
        path: 'course',
        loadComponent: () =>
          import('./course-directory/course-directory')
            .then(m => m.CourseDirectoryComponent)
      },
      {
        path: 'classroom',
        loadComponent: () =>
          import('./classroom-directory/classroom-directory')
            .then(m => m.ClassroomDirectoryComponent)
      },
      {
        path: 'subject/:id',
        loadComponent: () =>
          import('./subjectinfo-director/subjectinfo-director')
            .then(m => m.SubjectinfoDirectorComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./update.student/update.student')
            .then(m => m.UpdateStudentComponent),
      }
    ]
  }
];
