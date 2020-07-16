import { Pipe, PipeTransform } from '@angular/core';
import { addcourses } from '../models/form-model';

@Pipe({
  name: 'filterAssignment'
})
export class FilterAssignmentPipe implements PipeTransform {

  transform(addcourses:addcourses[],searchterm:string):addcourses[] {
    if(!addcourses && !searchterm){
      return addcourses
    }
    return addcourses.filter(data =>data.courseid.toLowerCase().indexOf(searchterm.toLowerCase())!== -1)
  }

}
