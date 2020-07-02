import { Pipe, PipeTransform } from '@angular/core';
import { createteacher } from '../models/form-model';

@Pipe({
  name: 'filterTeacher'
})
export class FilterTeacherPipe implements PipeTransform {

  transform(createteacher:createteacher[],searchTerm:string): createteacher[] {
    if (!createteacher || !searchTerm) {
      return createteacher 
   }
   return createteacher.filter(data=>data.name.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1) 
  }
  

}
