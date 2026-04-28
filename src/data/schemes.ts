export type Category = "General" | "OBC" | "SC" | "ST";
export type Occupation = "Student" | "Farmer" | "Employee" | "Unemployed";
export type SpecialStatus = "None" | "Disabled" | "Widow" | "Senior Citizen";
export type Gender = "Male" | "Female" | "Other";

export interface UserProfile {
  age: number;
  gender: Gender;
  state: string;
  income: number;
  category: Category;
  occupation: Occupation;
  specialStatus: SpecialStatus;
}

export interface Scheme {
  id: string;
  name: string;
  ministry: string;
  description: string;
  benefits: string[];
  documents: string[];
  applyUrl: string;
  eligibility: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    categories?: Category[];
    occupations?: Occupation[];
    genders?: Gender[];
    specialStatus?: SpecialStatus[];
    states?: string[]; // empty/undefined = all India
    rule?: string; // human readable
  };
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
];

export const SCHEMES: Scheme[] = [
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    ministry: "Ministry of Housing and Urban Affairs",
    description: "Affordable housing for all — provides financial assistance to build or buy a pucca house.",
    benefits: ["Subsidy up to ₹2.67 lakh on home loan interest", "Pucca house with basic amenities", "Priority for women, SC/ST, differently-abled"],
    documents: ["Aadhaar Card", "Income Certificate", "Bank Account Details", "Property Documents"],
    applyUrl: "https://pmaymis.gov.in/",
    eligibility: {
      maxIncome: 1800000,
      minAge: 18,
      rule: "Annual household income up to ₹18 lakh, no pucca house owned",
    },
  },
  {
    id: "pmkisan",
    name: "PM Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Income support of ₹6,000/year to all landholding farmer families.",
    benefits: ["₹6,000 per year in 3 installments", "Direct bank transfer", "No paperwork hassles"],
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Citizenship Proof"],
    applyUrl: "https://pmkisan.gov.in/",
    eligibility: {
      occupations: ["Farmer"],
      minAge: 18,
      rule: "Small and marginal farmer families with cultivable land",
    },
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat — PM-JAY",
    ministry: "Ministry of Health and Family Welfare",
    description: "Health insurance cover of ₹5 lakh per family per year for secondary and tertiary care.",
    benefits: ["₹5 lakh annual health cover", "Cashless treatment in 25,000+ hospitals", "Covers pre & post hospitalization"],
    documents: ["Aadhaar Card", "Ration Card", "Mobile Number"],
    applyUrl: "https://pmjay.gov.in/",
    eligibility: {
      maxIncome: 250000,
      rule: "Economically vulnerable families as per SECC database",
    },
  },
  {
    id: "skillindia",
    name: "Skill India Mission (PMKVY)",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    description: "Free skill training and certification for youth to improve employability.",
    benefits: ["Free industry-relevant training", "Government certification", "Placement assistance", "Monetary reward up to ₹8,000"],
    documents: ["Aadhaar Card", "Educational Certificates", "Bank Account"],
    applyUrl: "https://www.pmkvyofficial.org/",
    eligibility: {
      minAge: 15,
      maxAge: 45,
      occupations: ["Student", "Unemployed"],
      rule: "Indian citizens aged 15–45, school/college dropouts or unemployed",
    },
  },
  {
    id: "scholarship-sc",
    name: "Post-Matric Scholarship for SC Students",
    ministry: "Ministry of Social Justice & Empowerment",
    description: "Financial assistance to SC students pursuing post-matriculation studies.",
    benefits: ["Tuition fee reimbursement", "Maintenance allowance", "Book grants", "Hostel allowance"],
    documents: ["Caste Certificate", "Income Certificate", "Aadhaar Card", "Admission Proof"],
    applyUrl: "https://scholarships.gov.in/",
    eligibility: {
      categories: ["SC"],
      occupations: ["Student"],
      maxIncome: 250000,
      minAge: 15,
      rule: "SC students with family income up to ₹2.5 lakh, pursuing class 11+",
    },
  },
  {
    id: "scholarship-st",
    name: "Post-Matric Scholarship for ST Students",
    ministry: "Ministry of Tribal Affairs",
    description: "Scholarship for ST students for higher studies after class 10.",
    benefits: ["Full tuition fee", "Monthly maintenance", "Study tour & thesis grants"],
    documents: ["ST Certificate", "Income Certificate", "Aadhaar Card", "Admission Letter"],
    applyUrl: "https://scholarships.gov.in/",
    eligibility: {
      categories: ["ST"],
      occupations: ["Student"],
      maxIncome: 250000,
      rule: "ST students with family income up to ₹2.5 lakh",
    },
  },
  {
    id: "obc-scholarship",
    name: "Post-Matric Scholarship for OBC Students",
    ministry: "Ministry of Social Justice & Empowerment",
    description: "Financial support for OBC students for studies beyond matriculation.",
    benefits: ["Maintenance allowance", "Tuition fees", "Other compulsory fees"],
    documents: ["OBC Certificate", "Income Certificate", "Aadhaar Card"],
    applyUrl: "https://scholarships.gov.in/",
    eligibility: {
      categories: ["OBC"],
      occupations: ["Student"],
      maxIncome: 150000,
      rule: "OBC students, family income up to ₹1.5 lakh",
    },
  },
  {
    id: "ujjwala",
    name: "PM Ujjwala Yojana",
    ministry: "Ministry of Petroleum & Natural Gas",
    description: "Free LPG connection to women from BPL households.",
    benefits: ["Free LPG connection", "First refill & stove free", "₹1,600 cash assistance"],
    documents: ["Aadhaar Card", "BPL Ration Card", "Bank Account", "Photo"],
    applyUrl: "https://pmuy.gov.in/",
    eligibility: {
      genders: ["Female"],
      maxIncome: 200000,
      minAge: 18,
      rule: "Adult women from BPL households without LPG connection",
    },
  },
  {
    id: "vaya-vandana",
    name: "Pradhan Mantri Vaya Vandana Yojana",
    ministry: "Ministry of Finance (LIC)",
    description: "Pension scheme for senior citizens with assured returns.",
    benefits: ["Guaranteed pension up to ₹9,250/month", "10-year policy term", "Loan facility after 3 years"],
    documents: ["Aadhaar Card", "Age Proof", "Bank Account", "PAN Card"],
    applyUrl: "https://licindia.in/",
    eligibility: {
      minAge: 60,
      specialStatus: ["Senior Citizen"],
      rule: "Senior citizens aged 60 years and above",
    },
  },
  {
    id: "widow-pension",
    name: "Indira Gandhi National Widow Pension Scheme",
    ministry: "Ministry of Rural Development",
    description: "Monthly pension for widows from BPL families.",
    benefits: ["₹300/month pension (40-79 yrs)", "₹500/month (80+ yrs)", "Direct bank transfer"],
    documents: ["Widow Certificate", "BPL Card", "Aadhaar Card", "Bank Details"],
    applyUrl: "https://nsap.nic.in/",
    eligibility: {
      genders: ["Female"],
      specialStatus: ["Widow"],
      minAge: 40,
      maxIncome: 200000,
      rule: "Widows aged 40+ from BPL families",
    },
  },
  {
    id: "disability-pension",
    name: "Indira Gandhi National Disability Pension Scheme",
    ministry: "Ministry of Rural Development",
    description: "Monthly financial support for severely disabled persons from BPL families.",
    benefits: ["₹300/month (18-79 yrs)", "₹500/month (80+ yrs)", "Lifetime support"],
    documents: ["Disability Certificate (80%+)", "BPL Card", "Aadhaar Card"],
    applyUrl: "https://nsap.nic.in/",
    eligibility: {
      specialStatus: ["Disabled"],
      minAge: 18,
      maxIncome: 200000,
      rule: "Persons with 80%+ disability from BPL families, aged 18+",
    },
  },
  {
    id: "mudra",
    name: "PM MUDRA Yojana",
    ministry: "Ministry of Finance",
    description: "Collateral-free loans up to ₹10 lakh for non-corporate small businesses.",
    benefits: ["Shishu loan up to ₹50,000", "Kishor up to ₹5 lakh", "Tarun up to ₹10 lakh", "No collateral"],
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Bank Statements"],
    applyUrl: "https://www.mudra.org.in/",
    eligibility: {
      minAge: 18,
      occupations: ["Unemployed", "Employee"],
      rule: "Indian adults starting/expanding small non-farm business",
    },
  },
  {
    id: "stand-up-india",
    name: "Stand Up India",
    ministry: "Ministry of Finance",
    description: "Bank loans ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs.",
    benefits: ["Loan ₹10 lakh – ₹1 crore", "Composite loan for setup + working capital", "7-year repayment"],
    documents: ["Aadhaar Card", "Caste Certificate (if applicable)", "Project Report", "Business Address Proof"],
    applyUrl: "https://www.standupmitra.in/",
    eligibility: {
      minAge: 18,
      rule: "SC/ST or women entrepreneurs setting up greenfield enterprise",
      // logic-only: matched if (SC/ST) OR (Female)
    },
  },
  {
    id: "annapurna",
    name: "Annapurna Scheme",
    ministry: "Ministry of Rural Development",
    description: "10 kg free food grains per month to senior citizens not covered under NOAPS.",
    benefits: ["10 kg free food grain monthly", "Lifetime entitlement"],
    documents: ["Age Proof", "Aadhaar Card", "Ration Card"],
    applyUrl: "https://nsap.nic.in/",
    eligibility: {
      minAge: 65,
      specialStatus: ["Senior Citizen"],
      maxIncome: 100000,
      rule: "Destitute senior citizens aged 65+ not receiving old-age pension",
    },
  },
  {
    id: "pmjjby",
    name: "PM Jeevan Jyoti Bima Yojana",
    ministry: "Ministry of Finance",
    description: "Life insurance cover of ₹2 lakh at just ₹436/year.",
    benefits: ["₹2 lakh life cover", "Premium only ₹436/year", "Auto-debit from bank"],
    documents: ["Aadhaar Card", "Bank Account", "Nominee Details"],
    applyUrl: "https://www.jansuraksha.gov.in/",
    eligibility: {
      minAge: 18,
      maxAge: 50,
      rule: "Indians aged 18–50 with a savings bank account",
    },
  },
];
