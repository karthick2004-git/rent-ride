// ─── Auth API Service ─────────────────────────────────
const BASE_URL = "http://localhost:5000";

interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    is_verified?: number;
    created_at?: string;
  };
}

async function request(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data: ApiResponse = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const authAPI = {
  signup: (name: string, email: string, password: string) =>
    request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  verifySignup: (email: string, otp: string) =>
    request("/api/auth/verify-signup", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  login: (email: string, password: string) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  resendOtp: (email: string, purpose: "signup" | "login") =>
    request("/api/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email, purpose }),
    }),

  getProfile: (token: string) =>
    request("/api/auth/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),
};
