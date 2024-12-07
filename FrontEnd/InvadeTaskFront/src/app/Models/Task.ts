export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    due_date: string;
    category_id: number;
    deleted_at: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }