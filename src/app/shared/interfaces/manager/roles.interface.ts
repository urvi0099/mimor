export interface Role {
  created_at: string;
  description: string;
  displayName: string;
  display_name: string;
  id: string;
  name: string;
  pivot: { user_id: string; role_id: string };
  updated_at: string;
}
