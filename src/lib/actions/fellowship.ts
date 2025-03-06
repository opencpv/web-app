import { Fellowship } from "@/types/fellowship";

const SAMPLE_FELLOWSHIPS: Fellowship[] = [
  {
    id: "1",
    slug: "web3-developer-fellowship",
    title: "Web3 Developer Fellowship",
    description:
      "Join our 12-week intensive program focused on building decentralized applications. Work alongside experienced mentors and contribute to real-world Web3 projects while learning cutting-edge blockchain development.",
    requirements: `
      <ul>
        <li>Experience with JavaScript/TypeScript and React</li>
        <li>Basic understanding of blockchain technology</li>
        <li>Strong problem-solving skills</li>
        <li>Ability to commit 20 hours per week</li>
      </ul>
    `,
    startDate: "2024-06-01",
    duration: "12 weeks",
    applicationUrl: "https://example.com/apply/web3-fellowship",
  },
  {
    id: "2",
    slug: "smart-contract-fellowship",
    title: "Smart Contract Development Fellowship",
    description:
      "Dive deep into Solidity and smart contract development in this 8-week fellowship. Learn security best practices, testing strategies, and gain hands-on experience building DeFi protocols.",
    requirements: `
      <ul>
        <li>Solid programming fundamentals</li>
        <li>Basic Solidity knowledge</li>
        <li>Understanding of DeFi concepts</li>
        <li>Minimum 15 hours weekly commitment</li>
      </ul>
    `,
    startDate: "2024-07-15",
    duration: "8 weeks",
    applicationUrl: "https://example.com/apply/smart-contract-fellowship",
  },
  {
    id: "3",
    slug: "dao-governance-fellowship",
    title: "DAO Governance Fellowship",
    description:
      "Learn about DAO operations, governance mechanisms, and treasury management. This 10-week program combines technical implementation with practical governance experience.",
    requirements: `
      <ul>
        <li>Previous Web3 experience</li>
        <li>Understanding of DAO concepts</li>
        <li>Good communication skills</li>
        <li>20 hours weekly commitment</li>
      </ul>
    `,
    startDate: "2024-08-01",
    duration: "10 weeks",
    applicationUrl: "https://example.com/apply/dao-governance-fellowship",
  },
];

export async function getFellowships(): Promise<Fellowship[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return SAMPLE_FELLOWSHIPS;
}

export async function getFellowshipBySlug(
  slug: string
): Promise<Fellowship | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    SAMPLE_FELLOWSHIPS.find((fellowship) => fellowship.slug === slug) || null
  );
}
