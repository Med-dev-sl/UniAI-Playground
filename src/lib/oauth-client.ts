import { supabase } from '@/integrations/supabase/client';

export interface AuthorizationDetails {
  client?: { name?: string; client_name?: string };
  redirect_uri?: string;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
}
type Result = { data: AuthorizationDetails | null; error: { message: string } | null };
interface OAuthClient {
  getAuthorizationDetails(id: string): Promise<Result>;
  approveAuthorization(id: string): Promise<Result>;
  denyAuthorization(id: string): Promise<Result>;
}
export const oauthClient = (supabase.auth as unknown as { oauth: OAuthClient }).oauth;