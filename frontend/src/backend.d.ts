import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: bigint;
    content: string;
    sender: string;
    timestamp: Time;
}
export interface UserPreferences {
    name: string;
    language: string;
    voiceSettings: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
    principalId: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearHistory(): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversationHistory(page: bigint, pageSize: bigint): Promise<Array<Message>>;
    getPreferences(): Promise<UserPreferences | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveMessage(message: Message): Promise<void>;
    savePreferences(preferences: UserPreferences): Promise<void>;
}
