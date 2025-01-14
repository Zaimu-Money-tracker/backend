export default interface User {
  name: string;
  lastName: string;
  userName: string;
  gender: string;
  profilePhoto: {
    url: string;
    id: string;
  };
  profession: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  settings: {
    language: string;
    currency: string;
    appearance: string;
    weekStart: string;
    monthStart: number;
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
      whatsApp: boolean;
      zaimuUpdates: boolean;
      goals: boolean;
      budgetAlerts: boolean;
      weeklyReport: boolean;
      monthlyReport: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
