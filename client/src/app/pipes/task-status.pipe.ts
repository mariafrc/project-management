import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskstatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'waiting':
        return 'Waiting';
      case 'processing':
        return 'In progress';
      case 'finished':
        return 'Finished';
    }
  }
}
