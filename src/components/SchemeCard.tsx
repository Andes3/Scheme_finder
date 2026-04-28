import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink, FileText, Gift, Loader2, CheckCircle2 } from "lucide-react";
import type { MatchedScheme } from "@/lib/eligibility";
import type { UserProfile } from "@/data/schemes";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  match: MatchedScheme;
  profile: UserProfile;
}

export function SchemeCard({ match, profile }: Props) {
  const { scheme, reasons } = match;
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("explain-scheme", {
        body: {
          schemeName: scheme.name,
          schemeDescription: scheme.description,
          benefits: scheme.benefits,
          documents: scheme.documents,
          userProfile: profile,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setExplanation(data.explanation || "No explanation returned.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to get AI explanation";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-border/60 shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-elegant)]">
      <div className="h-1.5 bg-[var(--gradient-tricolor)]" />
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display text-xl leading-tight text-india-navy">
            {scheme.name}
          </CardTitle>
          <Badge className="shrink-0 bg-india-green text-india-green-foreground hover:bg-india-green">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Eligible
          </Badge>
        </div>
        <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground">
          {scheme.ministry}
        </CardDescription>
        <p className="text-sm text-foreground/80">{scheme.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-secondary/60 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-india-navy">
            Why you're eligible
          </p>
          <ul className="space-y-1">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-india-green" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-india-navy">
            <Gift className="h-3.5 w-3.5" /> Benefits
          </p>
          <ul className="space-y-1 text-sm text-foreground/80">
            {scheme.benefits.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-saffron">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-india-navy">
            <FileText className="h-3.5 w-3.5" /> Documents needed
          </p>
          <div className="flex flex-wrap gap-1.5">
            {scheme.documents.map((d, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {d}
              </Badge>
            ))}
          </div>
        </div>

        {explanation && (
          <div className="rounded-lg border border-saffron/30 bg-saffron/5 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-saffron">
              <Sparkles className="h-3.5 w-3.5" /> AI Explanation
            </p>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {explanation}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1 border-saffron/40 text-saffron hover:bg-saffron/10 hover:text-saffron"
            onClick={fetchExplanation}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Explaining...</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Explain with AI</>
            )}
          </Button>
          <Button asChild className="flex-1 bg-india-navy text-primary-foreground hover:bg-india-navy/90">
            <a href={scheme.applyUrl} target="_blank" rel="noreferrer noopener">
              Apply Now <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
