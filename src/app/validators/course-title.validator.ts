import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
  return (control: AbstractControl) => {

      return courses.findAllCourses()
      .pipe(
        map(courses => {
          const course = courses.find(
            course => course.description.toLowerCase() == control.value?.toLowerCase().trim()
          );

          return course ? {titleExist: true} : null;
        })
      )
  }
}
