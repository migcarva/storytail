export type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  updated_at: string;
};

export type UpdateProfileProps = {
  userId: string;
  options: {
    username: string;
    full_name: string;
  };
};
