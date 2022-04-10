export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  projectId: number;
}

export type TaskStatus = 'waiting' | 'processing' | 'finished';