export interface Board {
  id?: string | undefined;
  title?: string;
  priority: number;
  tasks: Task[];
}

export interface Task {
  label: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  description?: string;
}
