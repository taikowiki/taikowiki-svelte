export interface UserData {
    order: number;
    provider: string;
    providerId: string;
    UUID: string;
    nickname: string;
    registerTime: number;
    grade: number;
    providerUserData: Object | null;
}