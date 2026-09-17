export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  sections: { heading: string; body: string }[];
};

export const insights: Insight[] = [
  {
    slug: "managed-it-vs-co-managed-it",
    title: "Managed IT vs. co-managed IT: which support model fits your team?",
    description: "A practical comparison for Michigan business leaders and internal IT teams deciding how much technology responsibility to outsource.",
    category: "Strategy",
    publishedAt: "2026-09-17",
    sections: [
      { heading: "Start with ownership", body: "Fully managed IT is designed for organizations that want one accountable partner for day-to-day operations, support, security, and planning. Co-managed IT strengthens an existing internal team with capacity, specialist knowledge, tooling, or escalation support." },
      { heading: "Compare the work that must stay internal", body: "The best model depends on what your internal team needs to retain: business-system knowledge, vendor ownership, strategy, executive communication, or hands-on technical delivery. Define those boundaries before comparing providers." },
      { heading: "Ask for a clear operating model", body: "A useful proposal identifies responsibilities, escalation paths, service hours, reporting, security ownership, projects, and how priorities will be reviewed. A list of tools alone is not an operating model." },
    ],
  },
  {
    slug: "questions-to-ask-a-managed-it-provider",
    title: "Questions to ask before choosing a managed IT provider",
    description: "A buyer-focused checklist for evaluating accountability, security, support, continuity, and technology planning.",
    category: "Buying guide",
    publishedAt: "2026-09-17",
    sections: [
      { heading: "How will support work in practice?", body: "Ask how requests are submitted, how priorities are defined, who owns unresolved issues, and how the provider communicates during incidents. Look for a clear explanation rather than a promise of speed without context." },
      { heading: "Who owns security and recovery?", body: "Clarify responsibility for identity, endpoint protection, monitoring, backups, incident response, vendor coordination, and recovery testing. These responsibilities should be documented and reviewed regularly." },
      { heading: "How will the relationship improve over time?", body: "A strong partner should explain how it documents your environment, reports on recurring issues, recommends improvements, and connects technology decisions to your budget and business priorities." },
    ],
  },
  {
    slug: "how-to-prepare-for-a-cybersecurity-risk-conversation",
    title: "How to prepare for a cybersecurity risk conversation",
    description: "The business information to gather before discussing cybersecurity priorities, resilience, and practical next steps.",
    category: "Cybersecurity",
    publishedAt: "2026-09-17",
    sections: [
      { heading: "Identify what must keep working", body: "List the systems, data, applications, vendors, and workflows that would materially disrupt your organization if they were unavailable or compromised." },
      { heading: "Clarify expectations", body: "Document contractual, insurance, customer, and regulatory expectations that affect the organization. This helps turn broad security concerns into specific decisions." },
      { heading: "Focus on evidence", body: "Useful discussions start with what is known: access controls, backup testing, incident procedures, asset visibility, and recent changes. Unknowns are normal; they should become a prioritized assessment plan." },
    ],
  },
];

export const insightBySlug = new Map(insights.map((insight) => [insight.slug, insight]));
