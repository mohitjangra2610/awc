import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const strategies = [
  {
    slug: "executive-bonus-strategy",
    title: "Executive Bonus Strategy",
    subheading:
      "Reward and retain key executives with tax-advantaged wealth accumulation strategies designed for growth-oriented businesses.",
    content: `An Executive Bonus Plan (Section 162 Bonus Plan) allows businesses to provide key employees with life insurance benefits the employer can deduct. The company pays premiums on a policy owned by the executive, receiving a full tax deduction while the executive builds tax-advantaged cash value.\n\nEmployers select key employees to participate. Premiums are paid directly to the insurer on the executive's behalf. The executive owns the policy and accesses cash value for retirement, emergencies, or other needs. The employer deducts premiums as reasonable business expense.\n\nExecutives gain a valuable benefit with minimal out-of-pocket cost. The business retains top talent and receives a tax deduction. Cash value grows tax-deferred and can be accessed tax-advantaged. This creates a win-win that strengthens the employer-employee relationship.\n\nThis strategy is ideal for C-corporations, S-corporations, and LLCs seeking to attract, retain, and reward key executives without qualified plan complexity.`,
    faqs: [
      {
        q: "What types of businesses can use an Executive Bonus Plan?",
        a: "Any business entity can implement an executive bonus plan, though C-corporations receive the most favorable tax treatment because they deduct the full premium.",
      },
      {
        q: "Are there limits on how much can be contributed?",
        a: "Unlike qualified retirement plans, there are no contribution limits. Premiums must represent reasonable compensation.",
      },
      {
        q: "Does the executive pay taxes on the premiums?",
        a: "Yes, the executive reports the premium amount as taxable income. Strategies exist to offset this tax cost.",
      },
    ],
  },
  {
    slug: "buy-sell-funding-strategy",
    title: "Buy-Sell Funding Strategy",
    subheading:
      "Ensure a seamless business transition with funded buy-sell agreements that protect all stakeholders and preserve business value.",
    content: `A buy-sell agreement is a legally binding contract ensuring smooth ownership transition when an owner dies, becomes disabled, or retires. Without proper funding, these agreements fail when needed most. Life insurance provides the most reliable funding source.\n\nBusiness owners enter a buy-sell agreement specifying future ownership transfer terms. Each owner's interest is funded with a life insurance policy. When an owner dies, surviving owners receive the death benefit tax-free and purchase the deceased owner's shares from their family.\n\nThe family receives fair value for the business interest. Surviving owners retain control without outside interference. The business continues operating without disruption. Creditors and employees have confidence in business continuity.\n\nCross-purchase agreements (owners buy policies on each other) and entity-purchase agreements (the business buys policies on each owner) have distinct tax and legal implications. Our team helps determine the right structure.`,
    faqs: [
      {
        q: "How is the buy-sell price determined?",
        a: "The agreement should specify a valuation method agreed upon by all owners, reviewed and updated regularly to reflect current fair market value.",
      },
      {
        q: "Can disability be covered?",
        a: "Yes. Disability buy-out insurance can be added to fund the purchase if an owner becomes disabled.",
      },
      {
        q: "Is the death benefit taxable?",
        a: "Life insurance proceeds received by a business or individual are generally received income tax-free.",
      },
    ],
  },
  {
    slug: "key-person-protection-strategy",
    title: "Key Person Protection Strategy",
    subheading:
      "Protect your business from the financial impact of losing a critical team member, founder, or executive whose contributions are essential to your success.",
    content: `Key person insurance is a life insurance policy a business purchases on a critical employee. The business owns the policy, pays premiums, and is the beneficiary. If the key person dies, the business receives the death benefit tax-free to cover losses and transition costs.\n\nThe loss of a key executive, founder, or technical lead can devastate a business. Revenue drops, credit lines freeze, key relationships falter, and employee morale suffers. Key person insurance provides the capital to survive and rebuild.\n\nCoverage amount depends on the key person's revenue contribution, replacement cost, time needed to restore operations, and potential business value loss during transition.\n\nBeyond life insurance, key person coverage can include disability insurance protecting against long-term disability impact and business overhead expense insurance keeping the business running during transition.`,
    faqs: [
      {
        q: "Who qualifies as a key person?",
        a: "Any employee whose loss would cause significant financial harm, including founders, top salespeople, technical leads, and key managers.",
      },
      {
        q: "Can the business name itself as beneficiary?",
        a: "Yes. The business owns the policy, pays premiums, and is named as beneficiary.",
      },
      {
        q: "How are premiums treated for tax purposes?",
        a: "Premiums are not tax-deductible, but the death benefit is received income tax-free.",
      },
      {
        q: "How often should coverage be reviewed?",
        a: "Annually, or whenever there are significant changes in the business or the key person's role.",
      },
    ],
  },
  {
    slug: "advanced-tax-strategy",
    title: "Advanced Tax Strategy",
    subheading:
      "Structure your business and personal wealth to minimize tax exposure while maximizing long-term growth and financial flexibility.",
    content: `Advanced tax strategies integrate your business structure, investment approach, retirement planning, and estate goals into a cohesive framework that minimizes taxes legally and ethically across all stages of your financial life.\n\nEntity choice (C-corp, S-corp, LLC, partnership) has profound tax implications. We help evaluate whether changes could reduce self-employment taxes, lower overall tax rates, or provide better asset protection.\n\nBeyond standard 401(k) plans, business owners can leverage cash balance plans, defined benefit plans, and other strategies to accelerate retirement savings while reducing current taxable income. These plans can allow contributions of $100,000 or more annually.\n\nCharitable remainder trusts, donor-advised funds, and family limited partnerships can reduce current taxes, provide income streams, and create lasting legacies while transferring wealth efficiently to the next generation.`,
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
  },
  {
    slug: "family-wealth-protection-strategy",
    title: "Family Wealth Protection Strategy",
    subheading:
      "Preserve and transfer your family's wealth across generations with comprehensive protection, tax-efficient strategies, and legacy planning.",
    content: `Family wealth protection ensures everything you have built is preserved, protected, and transferred according to your wishes. It encompasses estate planning, asset protection, trust strategies, and governance structures designed to maintain family wealth across multiple generations.\n\nA comprehensive estate plan includes a will, revocable living trust, durable power of attorney, healthcare directive, and beneficiary designations. These documents ensure your assets pass to your chosen beneficiaries efficiently and privately.\n\nIrrevocable life insurance trusts (ILITs), grantor retained annuity trusts (GRATs), intentionally defective grantor trusts (IDGTs), and dynasty trusts can remove assets from your taxable estate while providing for your family and protecting assets from creditors and divorce.\n\nBeyond legal structures, successful wealth transfer requires family governance. Regular family meetings, mission statements, and education programs prepare the next generation to handle wealth responsibly and maintain family unity.`,
    faqs: [
      {
        q: "How much does estate planning cost?",
        a: "Costs vary based on complexity. A basic plan may cost $2,000 to $5,000, while comprehensive plans with trusts may range from $5,000 to $15,000.",
      },
      {
        q: "What happens without a plan?",
        a: "Without proper planning, assets pass through probate, which is public, time-consuming, and expensive. State law determines who inherits.",
      },
      {
        q: "Can I update my plan?",
        a: "Yes. Estate plans should be reviewed every 3 to 5 years or after major life events such as marriage, divorce, birth, or business sale.",
      },
      {
        q: "How do trusts protect assets?",
        a: "Certain trusts shield assets from creditors, lawsuits, and divorce while maintaining your control over distribution terms.",
      },
    ],
  },
];

interface Props {
  readonly params: Promise<{ readonly slug: string }>;
}

export default async function StrategyDetailPage({ params }: Props) {
  const { slug } = await params;

  const strategy = strategies.find((s) => s.slug === slug);

  if (!strategy) {
    notFound();
  }

  return (
    <main className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
        <section className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-border-muted bg-muted h-65 sm:h-95">
            <div className="flex h-full w-full items-center justify-center bg-linear-135 from-navy/5 via-gold-accent/5 to-navy/10">
              <span className="text-xs font-medium tracking-widest uppercase text-navy/20">
                Strategy Image
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-accent">
              Business Owner Strategy
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              {strategy.title}
            </h1>
            {strategy.subheading ? (
              <p className="text-lg leading-8 text-text-dim">{strategy.subheading}</p>
            ) : null}
          </div>

          <article className="prose prose-neutral max-w-none">
            <p className="whitespace-pre-line text-base leading-8 text-text-dim">
              {strategy.content}
            </p>
          </article>

          {strategy.faqs.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-navy">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {strategy.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-base font-semibold">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-text-dim">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ) : null}
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-navy">All Strategies</h2>
              <div className="mt-4 space-y-2">
                {strategies.map((s) => {
                  const isActive = s.slug === strategy.slug;
                  return (
                    <Button
                      key={s.slug}
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-between rounded-xl ${
                        isActive
                          ? "bg-navy text-white hover:bg-navy/90"
                          : "text-text-dim hover:bg-muted"
                      }`}
                    >
                      <Link href={`/entrepreneur/${s.slug}`}>
                        <span className="truncate">{s.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border-muted shadow-sm">
            <CardContent className="space-y-4 p-5">
              <h2 className="text-lg font-bold text-navy">Ready to get started?</h2>
              <p className="text-sm leading-6 text-text-dim">
                Schedule a private strategy session to explore how this approach fits your unique situation.
              </p>
              <Button
                asChild
                className="w-full rounded-xl bg-navy text-white hover:bg-navy/90"
              >
                <Link href="/contact">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Schedule a Session
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-navy text-navy hover:bg-navy/5"
              >
                <Link href="/entrepreneurs">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Strategies
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
