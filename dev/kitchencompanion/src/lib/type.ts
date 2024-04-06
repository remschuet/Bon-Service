export type ResponseMessage = {
  error?: string;
  status: number;
  success?: string;
};

export type UserSession = {
  user: {
    name: string;
    email: string;
    userType: string;
    isPremium: boolean;
    id: string;
  };
};
