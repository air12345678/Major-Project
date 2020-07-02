import { Pipe, PipeTransform } from '@angular/core';
import { createstudent } from '../models/form-model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(createstudents:createstudent[], searchterm:string):createstudent[]{
    if (!createstudents || !searchterm) {
       return createstudents  
    }
    return createstudents.filter(data=>data.batchname.toLowerCase().indexOf(searchterm.toLowerCase())!== -1);
   }
  
}
