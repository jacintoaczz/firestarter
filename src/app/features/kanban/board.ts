export interface Board {
  id?: string;
  title?: string;
  priority: number;
  tasks: Task[];
}

export interface Task {
  label: 'pruple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  description?: string;
}
