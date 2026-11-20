import type { UserSession, UserSettings } from '@/api/contracts/shared';
import {
  SignInWithEmailPayload,
  AuthResponse,
  GetSettingsResponse,
  UpdateSettingsPayload,
  AuthResponseSchema,
  GetSettingsResponseSchema,
} from '@/api/contracts/auth';
import { simulateDelay } from './simulate';

let userSettings: UserSettings = {
  theme: 'system',
  readerSurface: 'paper',
  readerFont: 'literata',
  readerFontSize: 18,
  readerLineHeight: 1.65,
  readerColumnWidth: 66,
  matchAppTheme: true,
  autoNightSurface: false,
  voiceSpeed: 1.0,
  preferredVoice: undefined,
  aiEnabled: true,
  maxDailyQuestions: 50,
};

let userSession: UserSession = {
  user: {
    id: 'user-demo-1',
    email: 'reader@example.com',
    name: 'Jane Reader',
    role: 'user',
  },
  isAuthenticated: true,
};

export const mockAuthAdapter = {
  async getSession(): Promise<AuthResponse> {
    await simulateDelay();
    return AuthResponseSchema.parse({
      session: userSession,
      token: 'mock-jwt-token',
    });
  },

  async signIn(payload: SignInWithEmailPayload): Promise<AuthResponse> {
    await simulateDelay(200);
    userSession = {
      user: {
        id: `user-${Date.now()}`,
        email: payload.email,
        name: payload.email.split('@')[0] ?? 'Reader',
        role: payload.email.includes('admin') ? 'admin' : 'user',
      },
      isAuthenticated: true,
    };
    return AuthResponseSchema.parse({
      session: userSession,
      token: 'mock-jwt-token',
    });
  },

  async signOut(): Promise<void> {
    await simulateDelay(50);
    userSession = {
      user: null,
      isAuthenticated: false,
    };
  },

  async getSettings(): Promise<GetSettingsResponse> {
    await simulateDelay();
    return GetSettingsResponseSchema.parse({
      settings: userSettings,
      usage: {
        uploadedBooks: 3,
        storageBytes: 12500000,
        maxStorageBytes: 52428800,
        questionsAskedToday: 7,
        maxQuestionsPerDay: 50,
        resetsAt: new Date(Date.now() + 54000000).toISOString(),
      },
    });
  },

  async updateSettings(payload: UpdateSettingsPayload): Promise<void> {
    await simulateDelay(40);
    userSettings = {
      ...userSettings,
      ...payload,
    };
  },
};
