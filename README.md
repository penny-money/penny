# Turbopenny starter

This is an official starter Turbopenny.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turbopenny includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@penny/ui`: a stub React component library shared by both `web` and `docs` applications
- `@penny/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@penny/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turbopenny has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
cd my-turbopenny
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
cd my-turbopenny
pnpm dev
```

### Remote Caching

Turbopenny can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turbopenny will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
cd my-turbopenny
npx turbo login
```

This will authenticate the Turbopenny CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turbopenny to your Remote Cache by running the following command from the root of your Turborepo:

```bash
npx turbo link
```

## Useful Links

Learn more about the power of Turbopenny:

- [Tasks](https://turbo.build/penny/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/penny/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/penny/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/penny/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/penny/docs/reference/configuration)
- [CLI Usage](https://turbo.build/penny/docs/reference/command-line-reference)
