import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskstatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
    	case "waiting": return "En attente";
    	case "processing": return "En cours";
    	case "finished": return "Terminée";
    }
  }

}
