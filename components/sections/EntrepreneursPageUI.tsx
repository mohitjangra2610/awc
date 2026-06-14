"use client";

import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Shield,
  UserCheck,
  RefreshCw,
  TrendingUp,
  Heart,
  GitBranch,
  ArrowRight,
  Target,
  Monitor,
  Cloud,
  Wrench,
  Briefcase,
  HeartPulse,
  Home,
  ArrowUpRight,
  FileText,
  Phone,
  Mail,
  Award,
  AlertTriangle,
  UserX,
  BarChart3,
  Scale,
  Clock,
} from "lucide-react";
import Image from "next/image";

const trustBarItems = [
  { icon: UserCheck, label: "Executive Retention" },
  { icon: RefreshCw, label: "Business Continuity" },
  { icon: TrendingUp, label: "Tax Efficiency" },
  { icon: Heart, label: "Family Wealth" },
  { icon: GitBranch, label: "Succession Planning" },
];

const questionCards = [
  "What if you couldn't work for six months?",
  "Is your family financially protected?",
  "Do you have a succession plan?",
  "Are you maximizing tax-efficient wealth?",
  "Can your business retain key executives?",
  "What's your wealth transfer strategy?",
];

const fiveCards = [
  {
    icon: UserCheck,
    title: "Executive Bonus Strategy",
    desc: "Reward and retain top talent with tax-advantaged wealth.",
    tags: ["Retention", "Tax Efficiency", "Loyalty"],
    href: "/entrepreneur/executive-bonus-strategy",
  },
  {
    icon: Scale,
    title: "Buy-Sell Funding Strategy",
    desc: "Fund agreements that ensure a smooth business transition.",
    tags: ["Continuity", "Fair Valuation", "Liquidity"],
    href: "/entrepreneur/buy-sell-funding-strategy",
  },
  {
    icon: Shield,
    title: "Key Person Protection",
    desc: "Protect your business when a critical leader is lost.",
    tags: ["Risk Mitigation", "Stability", "Confidence"],
    href: "/entrepreneur/key-person-protection-strategy",
  },
  {
    icon: BarChart3,
    title: "Advanced Tax Strategy",
    desc: "Minimize tax exposure while maximizing wealth growth.",
    tags: ["Tax Optimization", "Growth", "Compliance"],
    href: "/entrepreneur/advanced-tax-strategy",
  },
  {
    icon: Heart,
    title: "Family Wealth Protection",
    desc: "Preserve your family's wealth across generations.",
    tags: ["Legacy", "Asset Protection", "Security"],
    href: "/entrepreneur/family-wealth-protection-strategy",
  },
];

const audienceItems = [
  { icon: TrendingUp, label: "Growth Entrepreneurs" },
  { icon: Monitor, label: "Tech Founders" },
  { icon: Cloud, label: "SaaS Owners" },
  { icon: Wrench, label: "Engineering Firms" },
  { icon: Briefcase, label: "Consulting Firms" },
  { icon: HeartPulse, label: "Healthcare Owners" },
  { icon: Home, label: "Family Businesses" },
  { icon: ArrowUpRight, label: "Planning Exit or Succession" },
];

const executionCards = [
  { icon: Award, title: "Serious", desc: "They treat wealth strategy like business strategy." },
  { icon: Target, title: "Decisive", desc: "They act when timing matters." },
  { icon: ArrowUpRight, title: "Action-Oriented", desc: "They move from plan to execution." },
];

const costItems = [
  { icon: UserX, text: "Key employee leaves" },
  { icon: AlertTriangle, text: "Partner dies unexpectedly" },
  { icon: TrendingUp, text: "Opportunity disappears" },
  { icon: FileText, text: "Tax law changes" },
  { icon: Heart, text: "Family crisis occurs" },
  { icon: Clock, text: "Retirement timeline shrinks" },
];

const strategyBenefits = [
  "Protection", "Liquidity", "Certainty",
  "Tax Efficiency", "Business Continuity", "Family Wealth",
];

const processSteps = [
  { step: 1, title: "Discovery", desc: "We learn your business, family, and goals." },
  { step: 2, title: "Review", desc: "Assess your current strategies and objectives." },
  { step: 3, title: "Evaluation", desc: "Match tailored solutions to your needs." },
  { step: 4, title: "Roadmap", desc: "Actionable plan with clear milestones." },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 lg:py-16">
          <div className="flex flex-col gap-6 max-w-xl">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em]"
            >
              Business Owner Strategies
            </Badge>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-navy leading-[1.1]">
              A successful business deserves
              <br />
              <span className="text-gold-accent">a wealth strategy to match.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-prose">
              Growth creates opportunity. It also creates risk. We help business owners protect what they&apos;ve built.
            </p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2" role="list" aria-label="Strategy checklist">
              {[
                "Executive Retention", "Business Continuity", "Key Person Risk",
                "Wealth Accumulation", "Family Protection", "Wealth Transfer",
                "Succession Planning",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gold-accent/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-gold-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-navy text-white hover:bg-navy/90 px-6 sm:px-8 py-5 text-sm sm:text-base rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/contact">
                  Schedule a Strategy Session
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-navy/20 text-navy hover:bg-navy/5 px-6 sm:px-8 py-5 text-sm sm:text-base rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="#strategies">Explore Strategies</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[320px] sm:h-[420px] lg:h-[560px]">
            {/* Main image */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden ring-1 ring-foreground/5">
              <Image
                src="/ent_banner.jpg"
                alt="Business owner wealth strategy"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-5 py-5 sm:py-7">
          {trustBarItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white ring-1 ring-foreground/5 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-accent" />
                </div>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function QuestionCardsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5"
            >
              Critical Questions
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15] mb-4">
              Most owners build wealth.
              <br />
              <span className="text-gold-accent">Few protect it.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-prose">
              The most successful owners ask hard questions before circumstances force them to.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {questionCards.map((q, i) => (
              <div
                key={i}
                className="group rounded-xl border border-gray-100 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gold-accent/20"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">{q}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FiveConversationsSection() {
  return (
    <section id="strategies" className="py-16 lg:py-24 bg-gray-50/50 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Badge
            variant="secondary"
            className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5 mx-auto"
          >
            Strategic Framework
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
            Five conversations every business owner needs
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {fiveCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-accent/20 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-gold-accent">
                  <Icon className="w-4 h-4 text-white" />
                </div>

                <h3 className="text-sm font-semibold text-navy mb-2">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{card.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.tags.map((t) => (
                    <span key={t} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy group-hover:text-gold-accent transition-colors duration-300">
                  Learn More
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function MillionDollarSection() {
  return (
    <section className="py-16 lg:py-24 bg-navy text-white overflow-hidden px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-4xl mx-auto">
              <Badge
                variant="secondary"
                className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5"
          >
            What If
          </Badge>

          <p className="text-gold-accent/80 text-sm sm:text-base tracking-widest uppercase mb-8 font-medium">
            Your company generated another $1,000,000 next year?
          </p>

          <div className="space-y-4">
            {[
              ["Would your strategy protect that wealth?", "Growth creates exposure. Without structure, more revenue means more risk."],
              ["Are you structured to minimize taxes?", "Tax efficiency should be built in, not bolted on."],
              ["Can your key people share in that success?", "Align incentives with performance for sustainable growth."],
              ["Is your family prepared for what comes next?", "Plan for succession and continuity across generations."],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-gold-accent/30"
              >
                <span className="text-gold-accent text-2xl sm:text-3xl font-light leading-none flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base sm:text-xl font-semibold mb-1">{title}</h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhoWeWorkWithSection() {
  return (
    <section className="py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <Badge
            variant="secondary"
            className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5 mx-auto"
          >
            Who We Serve
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
            Who we work best with
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {audienceItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group rounded-xl border border-gray-100 bg-white p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gold-accent/20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-3 transition-colors duration-300 group-hover:bg-navy/10">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-navy transition-colors duration-300 group-hover:text-gold-accent" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-navy leading-snug">{item.label}</h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ExecutionSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50/50 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5"
            >
              Our Philosophy
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15] mb-4">
              We believe in execution.
              <br />
              <span className="text-gold-accent">Not endless research.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-prose">
              Our clients value a partner who acts with the same urgency they do.
            </p>
          </div>

          <div className="space-y-4">
            {executionCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gold-accent/20">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold-accent">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-0.5">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CostOfWaitingSection() {
  return (
    <section className="py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5 mx-auto"
            >
              The Risk of Inaction
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
              The cost of waiting is invisible.
            </h2>
            <p className="text-gold-accent text-base sm:text-xl font-medium mt-2">
              Until it isn&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {costItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-amber-200/50 hover:bg-amber-50/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium leading-snug">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StrategySessionSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50/50 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5 mx-auto"
            >
              Your Next Step
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-navy leading-[1.15]">
              Private strategy session
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              <div>
                <h3 className="text-sm font-semibold text-navy mb-4">What You Gain</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {strategyBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-gray-50/80">
                      <Check className="w-3 h-3 text-gold-accent flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-navy mb-3">Ideal For</h3>
                  <div className="rounded-xl border border-gold-accent/20 bg-gold-accent/[0.02] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Business owners ready to evaluate solutions in the next <strong className="text-navy">30–60 days</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-navy mb-4">What to Expect</h3>
                <div className="space-y-0">
                  {processSteps.map((step, i) => (
                    <div key={step.title} className="relative pb-6 last:pb-0">
                      {i < processSteps.length - 1 && (
                        <div className="absolute left-3.5 top-7 bottom-0 w-px bg-gray-200" />
                      )}
                      <div className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-navy mb-0.5">{step.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Button
                asChild
                size="lg"
                className="bg-navy text-white hover:bg-navy/90 px-8 py-5 text-sm rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/contact">
                  Schedule Your Private Strategy Session
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-16 lg:py-24 bg-navy text-white text-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Badge
            variant="secondary"
            className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5 mx-auto"
          >
            Begin Your Journey
          </Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
            Ready to explore what&apos;s possible?
          </h2>

          <p className="text-white/50 text-sm sm:text-base max-w-prose mx-auto mb-8 leading-relaxed">
            Take the first step toward a wealth strategy built for everything you&apos;ve created.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gold-accent text-navy hover:bg-gold-accent/90 px-8 py-5 text-sm font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto"
          >
            <Link href="/contact">
              Schedule Your Private Strategy Session
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ContactBlock() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="h-auto rounded-lg border-0 px-4 py-1.5 font-semibold bg-gold-accent/80 text-gray-700 uppercase tracking-[0.15em] mb-5 mx-auto"
            >
              Contact
            </Badge>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-gold-accent/20 mx-auto mb-4 overflow-hidden">
              <Image
                src="/pk.png"
                alt="Prasanth Kollaikal"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-navy mb-1">Prasanth Kollaikal (PK)</h3>
            <p className="text-gold-accent text-sm font-medium">Chief Financial Officer</p>
            <p className="text-gray-400 text-xs mb-6">American Wealth</p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 max-w-sm mx-auto">
              <div className="flex flex-col items-center gap-1">
                <Phone className="w-4 h-4 text-gold-accent" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider text-center">Phone</p>
                  <a href="tel:+13176020574" className="text-xs sm:text-sm text-gray-600 hover:text-navy transition-colors text-center block">
                    +1 (317) 602-0574
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Mail className="w-4 h-4 text-gold-accent" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider text-center">Email</p>
                  <a href="mailto:pk@americanwealthcorp.com" className="text-xs sm:text-sm text-gray-600 hover:text-navy transition-colors text-center block whitespace-nowrap">
                    pk@americanwealthcorp.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function EntrepreneursPageUI() {
  return (
    <div>
      <HeroSection />
      <TrustBar />
      <QuestionCardsSection />
      <FiveConversationsSection />
      <MillionDollarSection />
      <WhoWeWorkWithSection />
      <ExecutionSection />
      <CostOfWaitingSection />
      <StrategySessionSection />
      <FinalCTASection />
      <ContactBlock />
    </div>
  );
}
