export interface FAQ {
  q: string;
  a: string;
}

export interface BenefitsSection {
  type: "benefits";
  title: string;
  items: string[];
}

export interface WhySection {
  type: "why";
  title: string;
  items: string[];
}

export interface TaxProvisionData {
  code: string;
  title: string;
  description: string;
}

export interface TaxProvisionsSection {
  type: "tax-provisions";
  title: string;
  provisions: TaxProvisionData[];
}

export interface HighlightSection {
  type: "highlight";
  title: string;
  content: string;
  options: string[];
}

export interface CTASection {
  type: "cta";
  title: string;
  benefits: string[];
  buttonLabel: string;
  buttonHref: string;
}

export type StrategySection =
  | BenefitsSection
  | WhySection
  | TaxProvisionsSection
  | HighlightSection
  | CTASection;

export interface SidebarCTA {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
}

export interface Strategy {
  slug: string;
  title: string;
  subheading: string;
  content?: string;
  sections?: StrategySection[];
  faqs: FAQ[];
  sidebarCTA?: SidebarCTA;
}

export const strategies: Strategy[] = [
  {
    slug: "executive-retention",
    title: "Executive Retention",
    subheading:
      "Retain critical leadership talent with customized incentive strategies that strengthen loyalty, reward long-term commitment, and support business continuity.",

    content: `Losing a key executive can disrupt operations, impact growth, and create costly leadership gaps. Executive Retention strategies help businesses create meaningful incentives that encourage top performers to remain committed to the organization's long-term success.

These strategies can include deferred compensation arrangements, executive bonus programs, supplemental retirement benefits, and other customized reward structures designed around the needs of both the company and its leadership team. By aligning executive rewards with business goals, organizations create stronger engagement and long-term commitment.

A well-designed retention strategy provides executives with valuable future benefits while giving business owners confidence that critical leadership remains focused on driving growth and protecting company value. These plans can also support succession planning, leadership stability, and smoother business transitions.

Executive Retention solutions are commonly used by growing businesses, family-owned companies, and organizations that rely heavily on a small group of key leaders whose experience and expertise are essential to continued success.`,

    faqs: [
      {
        q: "Why is executive retention important?",
        a: "Retaining key leaders helps maintain operational stability, preserve institutional knowledge, and avoid the significant costs associated with executive turnover.",
      },
      {
        q: "What types of retention strategies are commonly used?",
        a: "Businesses often use deferred compensation plans, executive bonus arrangements, supplemental retirement benefits, and performance-based incentive programs.",
      },
      {
        q: "Can retention plans be customized for specific executives?",
        a: "Yes. Retention strategies are typically tailored to the executive's role, contribution, tenure, and the company's long-term objectives.",
      },
    ],
  },
  {
    slug: "business-continuity",
    title: "Business Continuity",
    subheading:
      "Build a strong foundation to ensure your business thrives for years to come.",

    content: `Unexpected events can threaten the stability and future of any business. Business Continuity strategies help organizations prepare for leadership transitions, key employee losses, ownership changes, and other disruptions that could impact operations and growth.

A comprehensive continuity plan identifies potential risks, establishes succession strategies, and creates financial safeguards that allow the business to continue operating during periods of uncertainty. By proactively planning for the unexpected, business owners can protect employees, customers, and stakeholders while preserving the long-term value of the organization.

Business Continuity planning often includes key person protection, succession planning, ownership transition strategies, and liquidity solutions designed to provide financial stability when critical events occur. These measures help reduce disruption, maintain confidence, and support ongoing business operations.

Whether your organization is family-owned, partner-owned, or privately held, a well-structured continuity strategy provides peace of mind and helps ensure the business remains resilient for future generations.`,

    faqs: [
      {
        q: "What is business continuity planning?",
        a: "Business continuity planning is the process of preparing for unexpected events that could disrupt operations, ensuring the company can continue functioning and meeting its obligations.",
      },
      {
        q: "Who should have a business continuity strategy?",
        a: "Any business that relies on key leaders, owners, or specialized employees can benefit from a continuity strategy, regardless of size or industry.",
      },
      {
        q: "What risks does business continuity planning address?",
        a: "It helps prepare for events such as the death or disability of key personnel, leadership transitions, ownership changes, economic disruptions, and other operational risks.",
      },
    ],
  },
  {
    slug: "succession-planning",
    title: "Succession Planning",
    subheading: "Plan today for a smooth transition and a strong tomorrow.",

    content: `Every business will eventually face a leadership or ownership transition. Without a clear succession plan, uncertainty can disrupt operations, impact employee confidence, and reduce business value. Succession Planning helps business owners prepare for the future by creating a structured roadmap for leadership continuity and long-term success.

A comprehensive succession strategy identifies future leaders, establishes ownership transition plans, and outlines the steps needed to maintain stability during periods of change. Whether the transition involves family members, business partners, key employees, or an outside buyer, proactive planning helps ensure the business continues operating smoothly.

Succession Planning also helps protect relationships with employees, customers, vendors, and stakeholders by reducing uncertainty and providing clarity about the company's future direction. Proper planning can minimize disruption, preserve institutional knowledge, and maintain the value owners have worked years to build.

Whether retirement is years away or approaching soon, creating a succession strategy today helps position your business for a successful transition and continued growth for future generations.`,

    faqs: [
      {
        q: "When should a business begin succession planning?",
        a: "Ideally, succession planning should begin several years before an expected transition to allow sufficient time for leadership development and implementation.",
      },
      {
        q: "Who can be a successor?",
        a: "Successors may include family members, business partners, key employees, management teams, or qualified external buyers depending on the owner's goals.",
      },
      {
        q: "Why is succession planning important?",
        a: "It helps ensure business continuity, protects company value, reduces transition risks, and provides clarity for employees, customers, and stakeholders.",
      },
      {
        q: "Does succession planning only apply to retirement?",
        a: "No. Succession planning also prepares businesses for unexpected events such as disability, death, leadership departures, or other unforeseen transitions.",
      },
    ],
  },
  {
    slug: "tax-efficiency",
    title: "Advanced Tax Efficiency Strategies For Business Owners",
    subheading:
      "Create opportunities for tax-efficient growth, flexible access to capital, family wealth transfer, and long-term liquidity.",
    sections: [
      {
        type: "benefits",
        title: "Benefits",
        items: [
          "Tax-Advantaged Growth",
          "Flexible Access",
          "Family Wealth Transfer",
          "Liquidity",
        ],
      },
      {
        type: "why",
        title: "Why Many Business Owners Look Beyond Traditional Planning",
        items: [
          "Increasing tax exposure",
          "Limited contribution opportunities",
          "Restricted access to capital",
          "Liquidity concerns",
          "Wealth transfer complexity",
        ],
      },
      {
        type: "tax-provisions",
        title: "Tax Code Provisions",
        provisions: [
          {
            code: "IRC Section 7702",
            title: "Tax-Advantaged Wealth Accumulation",
            description:
              "Permanent life insurance policies that meet the statutory definition receive favorable tax treatment, including tax-deferred cash value growth and tax-free access through policy loans and withdrawals.",
          },
          {
            code: "IRC Section 72(e)",
            title: "Flexible Access To Capital",
            description:
              "Cash value accumulated in a properly structured life insurance policy can be accessed on a tax-advantaged basis through policy loans and withdrawals, providing flexible liquidity without triggering immediate taxable income.",
          },
          {
            code: "IRC Section 101(a)",
            title: "Efficient Wealth Transfer",
            description:
              "Life insurance death benefits are generally received income tax-free by beneficiaries, enabling efficient transfer of wealth to family members or business partners.",
          },
        ],
      },
      {
        type: "highlight",
        title: "A Question Worth Asking",
        content:
          "If your business generated another $1,000,000 in profit next year, where would the next dollar go?",
        options: ["Taxable", "Tax Deferred", "Tax Advantaged"],
      },
      {
        type: "cta",
        title: "Private Business Owner Strategy Session",
        benefits: [
          "Protection",
          "Liquidity",
          "Flexibility",
          "Tax Efficiency",
          "Family Wealth Preservation",
        ],
        buttonLabel: "Schedule Your Private Strategy Session",
        buttonHref: "/contact",
      },
    ],
    faqs: [
      {
        q: "When should I start advanced tax planning?",
        a: "The best time is before year-end, but proactive planning throughout the year yields the best results.",
      },
      {
        q: "Are these strategies only for high-income earners?",
        a: "While some strategies target higher incomes, many techniques benefit business owners at all revenue levels.",
      },
      {
        q: "How do taxes affect entity choice?",
        a: "Each entity type has different tax treatments. We analyze your specific situation to recommend the optimal structure.",
      },
    ],
    sidebarCTA: {
      title: "Private Business Owner Strategy Session",
      description:
        "Schedule a private strategy session to explore how tax-advantaged strategies fit your unique situation.",
      primaryLabel: "Schedule Your Private Strategy Session",
      primaryHref: "/contact",
    },
  },
  {
    slug: "family-wealth",
    title: "Family Wealth Protection & Transfer Strategy",
    subheading:
      "Building Wealth Is Important. Making Sure Your Family Can Use It Is Essential. Help families create liquidity, protect wealth, simplify wealth transfer, and support future generations.",
    sections: [
      {
        type: "benefits",
        title: "Benefits",
        items: [
          "Family Wealth Protection",
          "Immediate Liquidity",
          "Efficient Wealth Transfer",
          "Probate Avoidance",
          "Family Financial Security",
          "Multi-Generational Impact",
        ],
      },
      {
        type: "why",
        title: "Would Your Family Inherit Wealth Or Complexity?",
        items: [
          "Successful businesses",
          "Real estate portfolios",
          "Investment accounts",
          "Retirement plans",
          "Significant net worth",
        ],
      },
      {
        type: "why",
        title: "What Your Family Will Need",
        items: [
          "Create liquidity",
          "Protect family wealth",
          "Simplify wealth transfer",
          "Preserve family assets",
          "Support future generations",
        ],
      },
      {
        type: "why",
        title: "The Challenge Of Illiquid Wealth",
        items: [
          "Privately held businesses",
          "Commercial real estate",
          "Rental property portfolios",
          "Investment partnerships",
          "Closely held stock",
          "What happens if significant capital is needed tomorrow?",
        ],
      },
      {
        type: "benefits",
        title: "Creating Liquidity Without Selling Assets",
        items: [
          "Maintain business ownership",
          "Preserve investment portfolios",
          "Retain real estate holdings",
          "Avoid forced asset sales",
          "Create financial flexibility",
        ],
      },
      {
        type: "benefits",
        title: "The Foundation: Revocable Living Trust",
        items: [
          "Avoid Probate",
          "Greater Privacy",
          "Faster Distribution",
          "Continuity During Incapacity",
          "Simplified Administration",
          "Greater Control",
        ],
      },
      {
        type: "tax-provisions",
        title: "The Role Of Life Insurance In Wealth Transfer",
        provisions: [
          {
            code: "IRC Section 101(a)",
            title: "Tax-Free Death Benefit",
            description:
              "Meet financial obligations, preserve family assets, continue operating a business, retain investment holdings, avoid forced sales, and create financial flexibility.",
          },
        ],
      },
      {
        type: "benefits",
        title: "What Successful Families Want",
        items: [
          "Certainty",
          "Liquidity",
          "Flexibility",
          "Family Protection",
          "Efficient Wealth Transfer",
          "Multi-Generational Impact",
        ],
      },
      {
        type: "highlight",
        title: "A Question Worth Asking",
        content:
          "If something happened to you tomorrow...\n\nWould your family immediately have access to the resources they need?\n\nOr would they be forced to navigate a complex financial and legal process during one of the most difficult times of their lives?",
        options: [],
      },
      {
        type: "cta",
        title: "Family Wealth Protection Session",
        benefits: [
          "Protection",
          "Liquidity",
          "Flexibility",
          "Family Wealth Preservation",
          "Efficient Wealth Transfer",
          "Multi-Generational Financial Confidence",
        ],
        buttonLabel: "Schedule Your Family Wealth Protection Session",
        buttonHref: "/contact",
      },
    ],
    faqs: [
      {
        q: "What is a revocable living trust?",
        a: "A revocable living trust is a legal document that allows you to maintain control of your assets during your lifetime while ensuring they pass to your beneficiaries efficiently, privately, and without probate upon your death.",
      },
      {
        q: "How does life insurance help with wealth transfer?",
        a: "Life insurance provides immediate, income-tax-free liquidity that can be used to pay estate taxes, settle debts, equalize inheritances, and provide for family members without forcing the sale of businesses or other assets.",
      },
      {
        q: "What happens without an estate plan?",
        a: "Without a plan, assets pass through probate, which is public, time-consuming, and expensive. State law determines who inherits, and your family may face significant delays accessing resources during a difficult time.",
      },
      {
        q: "Can I update my estate plan?",
        a: "Yes. Estate plans should be reviewed every 3 to 5 years or after major life events such as marriage, divorce, birth, or business sale.",
      },
    ],
    sidebarCTA: {
      title: "Family Wealth Protection Session",
      description:
        "Schedule a private strategy session to develop a comprehensive family wealth protection and transfer plan tailored to your unique situation.",
      primaryLabel: "Schedule Your Family Wealth Protection Session",
      primaryHref: "/contact",
    },
  },
];
