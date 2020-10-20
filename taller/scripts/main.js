import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBox1 = document.getElementById("search-box1");
var inputSearchBox2 = document.getElementById("search-box2");
var btnfilterByRange = document.getElementById("button-filterByRange");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByRangeCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    console.log('Desplegando info estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td class=\"table-danger\">C\u00F3digo</td>\n                           <td>" + student.codigo + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td class=\"table-danger\">C\u00E9dula</td>\n                           <td>" + student.cedula + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td class=\"table-danger\">Edad</td>\n                           <td>" + student.edad + " a\u00F1os</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td class=\"table-danger\">Direcci\u00F3n</td>\n                           <td>" + student.direccion + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td class=\"table-danger\">Telefono</td>\n                           <td>" + student.telefono + "</td>";
    studentTbody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByRangeCredits() {
    var min = inputSearchBox1.value;
    var max = inputSearchBox2.value;
    min = (min == null) ? '' : min;
    max = (max == null) ? '' : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRangeofCredits(parseInt(min), parseInt(max), dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByRangeofCredits(min, max, courses) {
    return courses.filter(function (course) { return course.credits <= max && min <= course.credits; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
