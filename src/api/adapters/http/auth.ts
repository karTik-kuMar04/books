import { NotConnectedError } from '@/api/errors';
import type {
  SignInWithEmailPayload,
  AuthResponse,
  GetSettingsResponse,
  UpdateSettingsPayload,
} from '@/api/contracts/auth';

export const httpAuthAdapter = {
  async getSession(): Promise<AuthResponse> {
    throw new NotConnectedError('auth.getSession');
  },
  async signIn(_payload: SignInWithEmailPayload): Promise<AuthResponse> {
    throw new NotConnectedError('auth.signIn');
  },
  async signOut(): Promise<void> {
    throw new NotConnectedError('auth.signOut');
  },
  async getSettings(): Promise<GetSettingsResponse> {
    throw new NotConnectedError('auth.getSettings');
  },
  async updateSettings(_payload: UpdateSettingsPayload): Promise<void> {
    throw new NotConnectedError('auth.updateSettings');
  },
};
