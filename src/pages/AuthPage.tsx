import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Brand } from "../components/Brand";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { LanguageToggle } from "../components/LanguageToggle";
import {
  isValidEmail,
  sendPasswordReset,
  signInWithPassword,
  signUpWithPassword,
  updatePassword,
  validatePassword,
} from "../lib/auth";
import { getAppCopy, type AppLanguage } from "../lib/i18n";

interface AuthPageProps {
  language: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
  mode?: "signIn" | "resetPassword";
  message?: string;
  onSignedIn: () => void;
}

type Panel = "signIn" | "signUp" | "forgotPassword";

export function AuthPage({
  language,
  onLanguageChange,
  mode = "signIn",
  message,
  onSignedIn,
}: AuthPageProps) {
  const copy = getAppCopy(language);
  const [activePanel, setActivePanel] = useState<Panel>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState(message ?? "");
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState<
    "none" | "signIn" | "signUp" | "forgotPassword" | "resetPassword"
  >("none");

  useEffect(() => {
    setFeedback(message ?? "");
  }, [message]);

  const cardTitle = useMemo(() => {
    if (mode === "resetPassword") {
      return copy.auth.resetPasswordTitle;
    }

    if (activePanel === "signUp") {
      return copy.auth.signUpTitle;
    }

    return copy.auth.signInTitle;
  }, [activePanel, copy.auth.resetPasswordTitle, copy.auth.signInTitle, copy.auth.signUpTitle, mode]);

  const cardSubtitle = useMemo(() => {
    if (mode === "resetPassword") {
      return copy.auth.resetPasswordSubtitle;
    }

    if (activePanel === "signUp") {
      return copy.auth.signUpSubtitle;
    }

    if (activePanel === "forgotPassword") {
      return copy.auth.forgotPasswordSubtitle;
    }

    return copy.auth.signInSubtitle;
  }, [
    activePanel,
    copy.auth.forgotPasswordSubtitle,
    copy.auth.resetPasswordSubtitle,
    copy.auth.signInSubtitle,
    copy.auth.signUpSubtitle,
    mode,
  ]);

  function resetMessages() {
    setError("");
    setFeedback("");
  }

  function validateEmailField(): boolean {
    if (!email.trim()) {
      setError(copy.auth.emailRequired);
      return false;
    }

    if (!isValidEmail(email)) {
      setError(copy.auth.emailInvalid);
      return false;
    }

    return true;
  }

  function validatePasswordField(value: string): boolean {
    if (!value) {
      setError(copy.auth.passwordRequired);
      return false;
    }

    if (!validatePassword(value)) {
      setError(copy.auth.passwordTooShort);
      return false;
    }

    return true;
  }

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!validateEmailField() || !validatePasswordField(password)) {
      return;
    }

    setLoadingAction("signIn");
    const { error: signInError } = await signInWithPassword(email, password);
    setLoadingAction("none");

    if (signInError) {
      setError(signInError.message || copy.auth.genericError);
      return;
    }

    onSignedIn();
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!validateEmailField() || !validatePasswordField(password)) {
      return;
    }

    if (password !== confirmPassword) {
      setError(copy.auth.passwordMismatch);
      return;
    }

    setLoadingAction("signUp");
    const { error: signUpError } = await signUpWithPassword(email, password);
    setLoadingAction("none");

    if (signUpError) {
      setError(signUpError.message || copy.auth.genericError);
      return;
    }

    setFeedback(copy.auth.signUpSuccess);
    setActivePanel("signIn");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!validateEmailField()) {
      return;
    }

    setLoadingAction("forgotPassword");
    const resetError = await sendPasswordReset(email);
    setLoadingAction("none");

    if (resetError) {
      setError(resetError.message || copy.auth.genericError);
      return;
    }

    setFeedback(copy.auth.resetEmailSent);
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!validatePasswordField(password)) {
      return;
    }

    if (password !== confirmPassword) {
      setError(copy.auth.passwordMismatch);
      return;
    }

    setLoadingAction("resetPassword");
    const resetError = await updatePassword(password);
    setLoadingAction("none");

    if (resetError) {
      setError(resetError.message || copy.auth.genericError);
      return;
    }

    setFeedback(copy.auth.updatePasswordSuccess);
    window.history.replaceState({}, "", "/");
    setTimeout(() => onSignedIn(), 300);
  }

  const shouldShowEmail = mode !== "resetPassword";
  const shouldShowSignIn = mode !== "resetPassword" && activePanel === "signIn";
  const shouldShowSignUp = mode !== "resetPassword" && activePanel === "signUp";
  const shouldShowForgotPassword =
    mode !== "resetPassword" && activePanel === "forgotPassword";

  return (
    <div className="min-h-screen bg-brand-floral text-brand-carbon">
      <header className="border-b border-brand-carbon/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Brand language={language} />
          <LanguageToggle language={language} onChange={onLanguageChange} />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <Card className="w-full max-w-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight">{cardTitle}</h1>
          <p className="mt-2 text-sm text-brand-charcoal">{cardSubtitle}</p>

          {feedback ? (
            <p className="mt-4 rounded-xl border border-brand-charcoal/15 bg-brand-ash/35 px-3.5 py-2.5 text-sm" role="status">
              {feedback}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-xl border border-brand-watermelonDark/35 bg-brand-watermelon/[0.07] px-3.5 py-2.5 text-sm text-brand-watermelonDark" role="alert">
              {error}
            </p>
          ) : null}

          {shouldShowSignIn ? (
            <form className="mt-6 space-y-4" onSubmit={handleSignIn} noValidate>
              {shouldShowEmail ? (
                <Input
                  label={copy.auth.emailLabel}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.auth.emailPlaceholder}
                  required
                />
              ) : null}
              <Input
                label={copy.auth.passwordLabel}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.auth.passwordPlaceholder}
                required
              />
              <Button type="submit" className="w-full" loading={loadingAction === "signIn"}>
                {loadingAction === "signIn" ? copy.auth.signingIn : copy.auth.signInButton}
              </Button>
            </form>
          ) : null}

          {shouldShowSignUp ? (
            <form className="mt-6 space-y-4" onSubmit={handleSignUp} noValidate>
              {shouldShowEmail ? (
                <Input
                  label={copy.auth.emailLabel}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.auth.emailPlaceholder}
                  required
                />
              ) : null}
              <Input
                label={copy.auth.passwordLabel}
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.auth.passwordPlaceholder}
                required
              />
              <Input
                label={copy.auth.confirmPasswordLabel}
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder={copy.auth.confirmPasswordPlaceholder}
                required
              />
              <Button type="submit" className="w-full" loading={loadingAction === "signUp"}>
                {loadingAction === "signUp" ? copy.auth.creatingAccount : copy.auth.signUpButton}
              </Button>
            </form>
          ) : null}

          {shouldShowForgotPassword ? (
            <form className="mt-6 space-y-4" onSubmit={handleForgotPassword} noValidate>
              {shouldShowEmail ? (
                <Input
                  label={copy.auth.emailLabel}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.auth.emailPlaceholder}
                  required
                />
              ) : null}
              <Button
                type="submit"
                className="w-full"
                loading={loadingAction === "forgotPassword"}
              >
                {loadingAction === "forgotPassword"
                  ? copy.auth.sendingReset
                  : copy.auth.sendResetButton}
              </Button>
            </form>
          ) : null}

          {mode === "resetPassword" ? (
            <form className="mt-6 space-y-4" onSubmit={handleResetPassword} noValidate>
              <Input
                label={copy.auth.passwordLabel}
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.auth.passwordPlaceholder}
                required
              />
              <Input
                label={copy.auth.confirmPasswordLabel}
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder={copy.auth.confirmPasswordPlaceholder}
                required
              />
              <Button
                type="submit"
                className="w-full"
                loading={loadingAction === "resetPassword"}
              >
                {loadingAction === "resetPassword"
                  ? copy.auth.updatingPassword
                  : copy.auth.updatePasswordButton}
              </Button>
            </form>
          ) : null}

          {mode !== "resetPassword" ? (
            <div className="mt-6 flex flex-col gap-2 text-sm">
              {activePanel === "signIn" ? (
                <>
                  <button
                    type="button"
                    className="text-left font-medium text-brand-charcoal hover:text-brand-carbon"
                    onClick={() => {
                      resetMessages();
                      setActivePanel("signUp");
                    }}
                  >
                    {copy.auth.switchToSignUp}
                  </button>
                  <button
                    type="button"
                    className="text-left font-medium text-brand-charcoal hover:text-brand-carbon"
                    onClick={() => {
                      resetMessages();
                      setActivePanel("forgotPassword");
                    }}
                  >
                    {copy.auth.forgotPassword}
                  </button>
                </>
              ) : null}

              {activePanel === "signUp" ? (
                <button
                  type="button"
                  className="text-left font-medium text-brand-charcoal hover:text-brand-carbon"
                  onClick={() => {
                    resetMessages();
                    setActivePanel("signIn");
                  }}
                >
                  {copy.auth.switchToSignIn}
                </button>
              ) : null}

              {activePanel === "forgotPassword" ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-left font-medium text-brand-charcoal hover:text-brand-carbon"
                  onClick={() => {
                    resetMessages();
                    setActivePanel("signIn");
                  }}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {copy.auth.backToSignIn}
                </button>
              ) : null}
            </div>
          ) : null}
        </Card>
      </main>
    </div>
  );
}
