export default interface User {
  name: string;
  lastName: string;
  userName: string;
  gender: string;
  profilePhoto: string;
  profession: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  settings: {
    language: string;
    currency: string;
    theme: string;
    weekStart: string;
    notifications: {
      email: boolean;
      push: boolean;
      whatsApp: boolean;
      weeklyReport: boolean;
      monthlyReport: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
