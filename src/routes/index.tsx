import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { SchemeCard } from "@/components/SchemeCard";
import { findEligibleSchemes } from "@/lib/eligibility";
import type { UserProfile } from "@/data/schemes";
import { Toaster } from "@/components/ui/sonner";
import { Landmark, Sparkles, ShieldCheck, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AI Government Scheme Assistant — India" },
      {
        name: "description",
        content:
          "Find Indian government schemes you're eligible for. Smart matching with simple bilingual AI explanations.",
      },
    ],
  }),
});

function Index() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const matches = useMemo(() => (profile ? findEligibleSchemes(profile) : []), [profile]);

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gradient-tricolor)] shadow-[var(--shadow-card)]">
              <Landmark className="h-5 w-5 text-india-navy" />
            </div>
            <div>
              <h1 className="font-display text-base font-bold leading-tight text-india-navy sm:text-lg">
                Yojana Sahayak
              </h1>
              <p className="text-[11px] text-muted-foreground">AI Government Scheme Assistant</p>
            </div>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-india-green/30 bg-india-green/5 px-3 py-1 text-xs font-medium text-india-green sm:flex">
            <ShieldCheck className="h-3.5 w-3.5" /> Govt of India schemes
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {!profile && (
          <section className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-saffron/30 bg-saffron/5 px-3 py-1 text-xs font-medium text-saffron">
              <Sparkles className="h-3.5 w-3.5" /> Powered by AI
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-india-navy sm:text-5xl">
              Find Schemes <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-saffron via-india-navy to-india-green bg-clip-text text-transparent">
                Made for You
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              Answer 7 simple questions. Get a personalized list of Indian government
              schemes you're eligible for — explained in plain English & हिंदी.
            </p>
          </section>
        )}

        {!profile ? (
          <div className="mx-auto max-w-2xl">
            <ProfileForm onSubmit={setProfile} />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: FileSearch, title: "15+ schemes", desc: "Curated central schemes" },
                { icon: ShieldCheck, title: "Logic-based", desc: "Real eligibility rules" },
                { icon: Sparkles, title: "AI explained", desc: "Simple, bilingual" },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border/60 bg-card p-4 text-center shadow-[var(--shadow-card)]">
                  <f.icon className="mx-auto mb-2 h-5 w-5 text-saffron" />
                  <p className="font-semibold text-india-navy">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-india-navy sm:text-3xl">
                  {matches.length > 0
                    ? `${matches.length} scheme${matches.length === 1 ? "" : "s"} matched`
                    : "No exact matches found"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Based on your profile · Age {profile.age} · {profile.category} · {profile.state}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setProfile(null)}
                className="border-india-navy/30 text-india-navy hover:bg-india-navy/5"
              >
                Edit details
              </Button>
            </div>

            {matches.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  Try adjusting your details — many schemes have specific income or age criteria.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {matches.map((m) => (
                  <SchemeCard key={m.scheme.id} match={m} profile={profile} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-border/60 bg-background/60 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
          For informational purposes only. Always verify eligibility on the official scheme portal before applying.
        </div>
      </footer>
    </div>
  );
}
