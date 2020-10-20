
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox1: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box1")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByRange")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByRange.onclick = () => applyFilterByRangeCredits();
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentInTable(student: Student): void {
  console.log('Desplegando info estudiante');
 
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td class="table-danger">Código</td>
                           <td>${student.codigo}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td class="table-danger">Cédula</td>
                           <td>${student.cedula}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td class="table-danger">Edad</td>
                           <td>${student.edad} años</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td class="table-danger">Dirección</td>
                           <td>${student.direccion}</td>`;
    studentTbody.appendChild(trElement);
    trElement= document.createElement("tr");
    trElement.innerHTML = `<td class="table-danger">Telefono</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
    
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByRangeCredits() { 
  let min = inputSearchBox1.value;
  let max = inputSearchBox2.value;
  min = (min == null) ? '' : min;
  max = (max == null) ? '' : max;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByRangeofCredits(parseInt(min),parseInt(max), dataCourses);
  renderCoursesInTable(coursesFiltered);
}
function searchCourseByRangeofCredits(min: number,max: number, courses: Course[]) {
  return  courses.filter((course: Course) => course.credits <= max && min<= course.credits);
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}