import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7180/api/v1';

  getActiveSubjects() {
    return this.http.get<any>(`${this.apiUrl}/Student/active-subjects`);
  }

  getStudents() {
    return this.http.get<any>(`${this.apiUrl}/Student`);
  }

  getStudentSubjects(studentId: number) {
    return this.http.get<any>(`${this.apiUrl}/Student/${studentId}/subjects`);
  }

  registerSubjects(data: any) {
    return this.http.post(`${this.apiUrl}/Enrollment/Matricula`, data);
  }

  getClassmates(subjectId: number) {
    return this.http.get<any>(`${this.apiUrl}/Student/subjects/${subjectId}/classmates`);
  }

  updateStudentContact(id: number, payload: any) {
  return this.http.patch(`${this.apiUrl}/Student/${id}/contact`, payload);
}
}
