import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { oauthClient, type AuthorizationDetails } from '@/lib/oauth-client';
import { Logo } from '@/components/Logo';

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const id = params.get('authorization_id') ?? '';
  const { user, loading, signOut } = useAuth();
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    if (loading) return;
    if (!id) { setError('This connection request is missing or invalid. Start the connection again from your assistant.'); return; }
    if (!user) {
      window.location.assign('/auth?next=' + encodeURIComponent(window.location.pathname + window.location.search));
      return;
    }
    setError('');
    setDetails(null);
    (async () => {
      try {
        const { data, error } = await oauthClient.getAuthorizationDetails(id);
        if (!active) return;
        if (error) throw new Error(error.message);
        if (!data) throw new Error('This connection request is unavailable or has expired.');
        const target = data.redirect_url ?? data.redirect_to;
        if (target && !data.client) { window.location.assign(target); return; }
        setDetails(data);
      } catch (failure) {
        if (active) setError(failure instanceof Error ? failure.message : 'Could not load the connection request.');
      }
    })();
    return () => { active = false; };
  }, [id, user, loading, retry]);
  async function decide(approve: boolean) {
    if (busy) return;
    setBusy(true); setError('');
    try {
      const { data, error } = approve ? await oauthClient.approveAuthorization(id) : await oauthClient.denyAuthorization(id);
      if (error) throw new Error(error.message);
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) throw new Error('Could not finish this connection. Please try again.');
      window.location.assign(target);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Could not complete your choice.');
      setBusy(false);
    }
  }
  const name = details?.client?.name ?? details?.client?.client_name ?? 'your assistant';
  const scopes = details?.scopes ?? details?.scope?.split(/\s+/).filter(Boolean) ?? [];
  return <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
    <section className="w-full max-w-lg space-y-6">
      <Logo size="md" />
      <h1 className="text-2xl font-bold">{details ? `Connect ${name} to UniAI Sierra Leone` : 'UniAI Sierra Leone connection'}</h1>
      {user && <div className="flex flex-wrap items-center gap-3"><span className="text-muted-foreground break-all">{user.email}</span><Button variant="ghost" disabled={busy} onClick={() => signOut()}>Switch account</Button></div>}
      {error && <div role="alert" className="text-destructive space-y-3"><p>{error}</p><Button variant="outline" disabled={busy} onClick={() => setRetry(v => v + 1)}>Try again</Button></div>}
      {!details && !error && <p role="status">Loading connection request…</p>}
      {details && <>
        <p>This lets {name} use this app as you.</p>
        {details.redirect_uri && <p className="text-sm text-muted-foreground break-all">Return address: {details.redirect_uri}</p>}
        {scopes.length > 0 && <ul className="space-y-2">{scopes.map(scope => <li key={scope}>{({ openid: 'Confirm your identity', email: 'Share your email address', profile: 'Share your basic profile' } as Record<string, string>)[scope] ?? `Additional permission requested: ${scope}`}</li>)}</ul>}
        <p>Read your academic profile and saved tutoring conversations. Your academic selections will not be changed.</p>
        <p className="text-sm text-muted-foreground">Your existing account permissions still decide which data is accessible.</p>
        <div className="flex flex-wrap gap-3"><Button disabled={busy} onClick={() => decide(true)}>{busy ? 'Please wait…' : 'Approve connection'}</Button><Button variant="outline" disabled={busy} onClick={() => decide(false)}>Cancel connection</Button></div>
      </>}
    </section>
  </main>;
}