"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Hammer, ShieldQuestion, ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const tools = [
  {
    href: "/check",
    icon: Search,
    title: "Check a Claim",
    description:
      "Paste any claim and explore what kind of statement it is, what it assumes, and how you might evaluate it.",
    color: "amber",
  },
  {
    href: "/build",
    icon: Hammer,
    title: "Build an Argument",
    description:
      "Structure your thinking with a conclusion and supporting premises. Get feedback on clarity and strength.",
    color: "emerald",
  },
  {
    href: "/stress",
    icon: ShieldQuestion,
    title: "Stress Test",
    description:
      "Submit an argument and see it steelmanned, challenged, and examined for vulnerabilities.",
    color: "violet",
  },
];

const colorMap: Record<string, { bg: string; icon: string; hover: string }> = {
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    hover: "group-hover:bg-amber-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    hover: "group-hover:bg-emerald-100",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    hover: "group-hover:bg-violet-100",
  },
};

export default function Home() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto px-4 py-16 md:py-24"
    >
      <motion.div variants={item} className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
          Think clearly, together.
        </h1>
        <p className="text-lg text-stone-500 max-w-xl mx-auto">
          Agora is a calm space for sharpening your reasoning. Examine claims,
          build arguments, and test your thinking — no judgment, just clarity.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const colors = colorMap[tool.color];
          return (
            <motion.div key={tool.href} variants={item}>
              <Link
                href={tool.href}
                className="group block bg-white rounded-2xl shadow-sm border border-stone-200 p-6 hover:shadow-md transition-shadow h-full"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.hover} flex items-center justify-center mb-4 transition-colors`}
                >
                  <tool.icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <h2 className="font-semibold text-stone-900 mb-2">{tool.title}</h2>
                <p className="text-sm text-stone-500 mb-4">{tool.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:gap-2 transition-all">
                  Get started <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
