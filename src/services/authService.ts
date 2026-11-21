import { supabase } from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface AuthCredentials {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  role?: 'CUSTOMER' | 'MERCHANT';
}

export interface AuthResult {
  user: {
    id: string;
    supabaseId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    avatarUrl: string | null;
  };
  created: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  statusCode: number;
}

export class AuthService {
  async signUp(credentials: AuthCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.fullName,
          phone: credentials.phoneNumber,
        },
      },
    });

    if (error) throw this.mapSupabaseError(error);
    if (!data.user || !data.session) {
      throw { code: 'NO_SESSION', message: 'No session returned after sign up', statusCode: 500 };
    }

    return this.syncToBackend(data.session.access_token, {
      fullName: credentials.fullName,
      phoneNumber: credentials.phoneNumber,
    });
  }

  async signIn(credentials: AuthCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw this.mapSupabaseError(error);
    if (!data.user || !data.session) {
      throw { code: 'NO_SESSION', message: 'No session returned after sign in', statusCode: 500 };
    }

    return this.syncToBackend(data.session.access_token, {
      fullName: credentials.fullName,
      phoneNumber: credentials.phoneNumber,
    });
  }

  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw this.mapSupabaseError(error);
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw this.mapSupabaseError(error);
  }

  async sendOTP(credentials: { email: string; phoneNumber?: string }): Promise<void> {
    const { error } = await supabase.auth.signInWithOtp({
      email: credentials.email,
      options: {
        data: { phone: credentials.phoneNumber },
      },
    });
    if (error) throw this.mapSupabaseError(error);
  }

  async verifyOTP(token: string, email: string): Promise<void> {
    const { error } = await supabase.auth.verifyOtp({
      token,
      type: 'email',
      email,
    });
    if (error) throw this.mapSupabaseError(error);
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  private async syncToBackend(accessToken: string, profile: {
    fullName?: string;
    phoneNumber?: string;
  }): Promise<AuthResult> {
    const response = await fetch(`${API_URL}/auth/sync`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw {
        code: errorBody.error || 'SYNC_FAILED',
        message: errorBody.message || 'Failed to sync user profile',
        statusCode: response.status,
      };
    }

    return response.json();
  }

  private mapSupabaseError(error: any): AuthError {
    const codeMap: Record<string, string> = {
      'Invalid login credentials': 'INVALID_CREDENTIALS',
      'User already registered': 'USER_EXISTS',
      'Email not confirmed': 'EMAIL_NOT_CONFIRMED',
      'Password should be at least 6 characters': 'WEAK_PASSWORD',
    };

    return {
      code: codeMap[error.message] || error.code || 'AUTH_ERROR',
      message: error.message || 'Authentication failed',
      statusCode: error.status || 400,
    };
  }
}

export const authService = new AuthService();