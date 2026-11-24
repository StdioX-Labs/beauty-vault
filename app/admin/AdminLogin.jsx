import { useState } from "react";
import { signIn, signOut, rpc } from "./supa";

// Admin sign-in. The same accounts as the Lash Tribe admin (Supabase Auth + academy_admins).
export default function AdminLogin({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      try {
        await signIn(email.trim(), password);
      } catch {
        throw new Error("That email and password don't match.");
      }
      const { data: isAdmin, error: rpcError } = await rpc("is_academy_admin");
      if (rpcError) throw new Error("Signed in, but the admin check failed. Try again in a moment.");
      if (!isAdmin) {
        await signOut();
        throw new Error("This account isn't an admin. Use your Lash Tribe admin account.");
      }
      onSignedIn();
    } catch (err) {
      setError(err.message || "Couldn't sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-root admin-login-root">
      <form className="admin-login-card" onSubmit={submit}>
        <div className="lbs-brand">
          <img src="/icons/lashesbyshazz-round.png" alt="" />
          <span>Lashes by Shazz</span>
        </div>
        <div className="admin-login-tag">Admin · sign in with your Lash Tribe account</div>
        <div className="form-field" style={{ marginBottom: 14 }}>
          <label htmlFor="adminEmail">Email</label>
          <input id="adminEmail" type="text" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field" style={{ marginBottom: 14 }}>
          <label htmlFor="adminPass">Password</label>
          <input id="adminPass" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="admin-gate-error" role="alert">{error}</p>}
        <button className="admin-btn" type="submit" disabled={busy} style={{ width: "100%", marginTop: 6 }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
