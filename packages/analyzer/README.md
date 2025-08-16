@oursynth/analyzer

Table of Contents
Overview

Features

Installation

Usage

API Reference

Directory Structure

Setup & Prerequisites

Roadmap & Future Ideas

Contributing

License

Overview
@oursynth/analyzer provides AST-powered tooling to inspect React components, detect reusable design patterns, and automate contributions back into your central design system.

Features
AST-based component analysis (props, styles, JSX structure)

Pattern recognition against existing design-system primitives

Automated contribution workflow:

Creates a feature branch

Extracts matched code into a shared component

Generates Storybook stories

Opens a Pull Request via GitHub CLI

Installation
bash
# NPM
npm install @oursynth/analyzer --save-dev

# Yarn
yarn add @oursynth/analyzer --dev
Usage
ts
import { ComponentAnalyzer } from '@oursynth/analyzer';

// Pass raw source code as string
const componentCode = `
  import React from 'react';
  export const Card = ({ title, children }) => (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
`;

async function runAnalysis() {
  const analysis = await ComponentAnalyzer.analyze(componentCode);

  console.log('Detected Props:', analysis.props);
  console.log('Matching Patterns:', analysis.matches);
  console.log('Suggested Refactor:', analysis.suggestions);
}

runAnalysis();
API Reference
ComponentAnalyzer.analyze(sourceCode: string): Promise<AnalysisResult>
sourceCode: React component source (JSX/TSX)

returns:

props: Array of prop names and types detected

matches: List of design-system components your code overlaps with

suggestions: Automated refactor steps and PR metadata

Directory Structure
@oursynth/analyzer
├── package.json
├── README.md
└── services
    ├── ComponentAnalyzer.ts        # Core AST parsing & analysis
    ├── PatternRecognitionService.ts # Matching logic against design system
    └── ContributionWorkflow.ts      # Git branch, Storybook, PR automation
Setup & Prerequisites
Node.js ≥ 16

Babel parser & traverse (automatically installed as peer dependencies)

GitHub CLI (gh) for PR automation

Ensure your project has a valid .storybook setup to generate stories

Roadmap & Future Ideas ⭐️
Support Emotion, SCSS, and other CSS-in-JS style systems

Enhance pattern-matching with machine-learning models

Live integration into Studio editor for on-the-fly refactoring

CLI mode for batch-processing of multiple components

Contributing
Fork the repo

Create a feature branch (git checkout -b feat/my-awesome-feature)

Install dependencies and build (npm install && npm run build)

Write tests and update documentation

Open a Pull Request and describe your changes

Please adhere to the Conventional Commits spec.

License
This project is licensed under the MIT License. See the LICENSE file for details.

