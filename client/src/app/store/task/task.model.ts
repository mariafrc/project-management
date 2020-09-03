export interface Task {
	id: number;
	title: string;
	status: 'waiting' | 'processing' | 'finished';
	projectId: number;
}