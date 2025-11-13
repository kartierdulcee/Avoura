export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background px-6 py-24 text-foreground sm:px-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="font-serif text-4xl tracking-tight">Privacy</h1>
        <p className="text-sm leading-7 text-foreground/70 sm:text-base">
          Auvora respects your privacy. We collect only the information needed
          to fulfill orders, personalise your experience, and comply with legal
          obligations. Payment details are handled securely by Stripe and never
          stored on our servers.
        </p>
        <p className="text-sm leading-7 text-foreground/70 sm:text-base">
          For the full policy or data requests, write to{" "}
          <a
            href="mailto:privacy@auvorabakery.com"
            className="underline decoration-foreground/40 transition hover:decoration-foreground"
          >
            privacy@auvorabakery.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
