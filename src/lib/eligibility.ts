import { SCHEMES, type Scheme, type UserProfile } from "@/data/schemes";

export interface MatchedScheme {
  scheme: Scheme;
  reasons: string[];
}

export function findEligibleSchemes(profile: UserProfile): MatchedScheme[] {
  const matches: MatchedScheme[] = [];

  for (const scheme of SCHEMES) {
    const e = scheme.eligibility;
    const reasons: string[] = [];
    let eligible = true;

    if (e.minAge !== undefined) {
      if (profile.age < e.minAge) { eligible = false; }
      else reasons.push(`Age ${profile.age} ≥ required ${e.minAge}`);
    }
    if (e.maxAge !== undefined) {
      if (profile.age > e.maxAge) { eligible = false; }
      else reasons.push(`Age ${profile.age} ≤ allowed ${e.maxAge}`);
    }
    if (e.maxIncome !== undefined) {
      if (profile.income > e.maxIncome) { eligible = false; }
      else reasons.push(`Income ₹${profile.income.toLocaleString("en-IN")} within ₹${e.maxIncome.toLocaleString("en-IN")} limit`);
    }
    if (e.categories && e.categories.length > 0) {
      if (!e.categories.includes(profile.category)) { eligible = false; }
      else reasons.push(`Category ${profile.category} matches`);
    }
    if (e.occupations && e.occupations.length > 0) {
      if (!e.occupations.includes(profile.occupation)) { eligible = false; }
      else reasons.push(`Occupation ${profile.occupation} qualifies`);
    }
    if (e.genders && e.genders.length > 0) {
      if (!e.genders.includes(profile.gender)) { eligible = false; }
      else reasons.push(`Gender criterion met`);
    }
    if (e.specialStatus && e.specialStatus.length > 0) {
      if (!e.specialStatus.includes(profile.specialStatus)) { eligible = false; }
      else reasons.push(`Special status: ${profile.specialStatus}`);
    }
    if (e.states && e.states.length > 0) {
      if (!e.states.includes(profile.state)) { eligible = false; }
      else reasons.push(`Available in ${profile.state}`);
    }

    // Stand Up India: SC/ST OR Female
    if (scheme.id === "stand-up-india") {
      const isScSt = profile.category === "SC" || profile.category === "ST";
      const isWoman = profile.gender === "Female";
      eligible = isScSt || isWoman;
      if (eligible) {
        reasons.push(isScSt ? `${profile.category} entrepreneur qualifies` : "Woman entrepreneur qualifies");
      }
    }

    if (eligible) {
      matches.push({ scheme, reasons });
    }
  }

  return matches;
}
