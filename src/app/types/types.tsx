export type Todo = {
  id: number;
  title: string;
  deadline: Date;
  created_at: Date;
  is_completed: number;
  month: number;
};

export type Target = {
  id: number;
  content: string;
  month: number;
  user_id: number;
};
