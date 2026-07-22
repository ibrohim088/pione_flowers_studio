export interface SendOtpInput {
  phone: string;
}

export interface VerifyOtpInput {
  phone: string;
  code: string;
  fullName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
