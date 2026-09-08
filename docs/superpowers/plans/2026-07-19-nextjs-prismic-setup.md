# Next.js and Prismic Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a current Next.js TypeScript and Tailwind application in the project root and connect it to the existing Prismic repository `mental-health-counseling`.

**Architecture:** Generate a standard Next.js App Router project with `create-next-app`, then use Prismic's official Slice Machine initializer to add the client, adapter, simulator, and repository configuration. Keep the scaffold minimal and do not add content models or slices beyond generated integration files.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, ESLint, Prismic, Slice Machine, npm

## Global Constraints

- Install into the existing repository root.
- Use the latest stable package releases selected by the official initializers.
- Configure Prismic repository name exactly as `mental-health-counseling`.
- Do not install Prisma ORM.
- Do not invent page types, slices, or application features.

---

### Task 1: Scaffold the Next.js application

**Files:**
- Create: `package.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`

**Interfaces:**
- Consumes: Empty project root containing only planning documentation.
- Produces: A runnable Next.js App Router application with npm scripts for development, linting, and production builds.

- [ ] **Step 1: Generate the application in the current directory**

Run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm --yes
```

Expected: `package.json`, `src/app`, TypeScript configuration, Tailwind styles, and installed dependencies are created without a nested project folder.

- [ ] **Step 2: Verify the generated scaffold**

Run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Expected: All three commands exit successfully.

- [ ] **Step 3: Commit the scaffold**

```bash
git add .
git commit -m "chore: scaffold Next.js app"
```

### Task 2: Connect the existing Prismic repository

**Files:**
- Create or modify: `slicemachine.config.json`
- Create or modify: `src/prismicio.ts`
- Create or modify: `src/app/slice-simulator/page.tsx`
- Create or modify: `src/slices/index.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: The Next.js App Router scaffold and authenticated access to the Prismic account containing `mental-health-counseling`.
- Produces: A Slice Machine configuration whose `repositoryName` is `mental-health-counseling`, plus the generated Prismic client and simulator route.

- [ ] **Step 1: Run the supported Slice Machine initializer**

Run:

```bash
npx @slicemachine/init@latest --repository mental-health-counseling
```

Expected: Prismic packages and generated integration files are added. If the initializer does not accept the repository flag, inspect `npx @slicemachine/init@latest --help` and use its documented existing-repository flow without changing the target repository.

- [ ] **Step 2: Assert the repository configuration**

Run:

```bash
node -e "const c=require('./slicemachine.config.json'); if(c.repositoryName!=='mental-health-counseling') process.exit(1)"
```

Expected: Exit status 0.

- [ ] **Step 3: Commit the integration**

```bash
git add .
git commit -m "chore: connect Prismic repository"
```

### Task 3: Verify the complete application

**Files:**
- Verify: `package.json`
- Verify: `slicemachine.config.json`
- Verify: `src/prismicio.ts`
- Verify: `src/app/slice-simulator/page.tsx`

**Interfaces:**
- Consumes: The completed Next.js and Prismic setup.
- Produces: Evidence that the configured application passes static and production checks.

- [ ] **Step 1: Run static verification**

Run:

```bash
npm run lint
npx tsc --noEmit
```

Expected: Both commands exit successfully without errors.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: Next.js completes a production build and includes the generated routes.

- [ ] **Step 3: Smoke-test the local server**

Run `npm run dev`, request `http://localhost:3000`, confirm an HTTP success response, and then stop the development server.

- [ ] **Step 4: Commit any verification-only corrections**

```bash
git add .
git commit -m "fix: finalize Next.js and Prismic setup"
```

Expected: Create this commit only if targeted corrections were required during verification.
