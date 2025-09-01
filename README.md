# Next.js SpaceX Launches Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Or, for production/SSG testing:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Project Details

### How to Run
- Development mode: `npm run dev`  
- Production/SSG mode: `npm run build && npm run start`  

The second option is recommended if you want to experience static site generation (SSG).

---

### Architecture Decisions
- **App Router**: The project uses Next.js **App Router**, which provides server components, layouts, and better data-fetching strategies compared to the legacy Pages Router.  
- **Data Fetching**: Chose **React Query** over SWR or custom fetchers because:
  - Provides built-in caching, pagination, retries, and infinite queries.
  - Simplifies handling loading/error states.  
- **Rendering Strategy**:  
  - Launches listing page → **SSG** (static site generation).  
  - Launch details page → **SSG with `generateStaticParams`**.  

---

### SpaceX API Usage
The project integrates with the [SpaceX API v4](https://api.spacexdata.com/v4/) and supports searching, filtering, and pagination.

- **Query example**:
  ```ts
  interface Query {
    upcoming?: string;
    success?: string;
    name?: {
      $regex: string;
      $options: string;
    };
    date_utc?: {
      $gte?: string;
      $lte?: string;
    };
  }
  ```
- **Pagination Strategy**: Implemented infinite scroll (`useInfiniteQuery` from React Query).
- **Filters**: Supports upcoming launches, success/failure, name search (regex), and date ranges.

---

### Performance & Accessibility Considerations
- **Performance**:
  - SSG used where possible for fast load times.
  - API calls cached with React Query to avoid redundant fetches.
  - Infinite scrolling strategy minimizes payload size.
  - Filters and search are debounced
- **Accessibility**:
  - Used [shadcn/ui](https://ui.shadcn.com) components, which include optimized ARIA attributes.  
  - Search and filter inputs are properly labeled for screen readers.

---

### Trade-offs
- **React Query vs. Server Components**: Using React Query adds some client-side complexity but provides more flexibility with infinite queries. A pure server component approach could reduce bundle size but complicate pagination.  
- **App Router learning curve**: While powerful, App Router requires more setup compared to Pages Router.  
- **Filters not in URL**: Currently, filters are stored in state, meaning they cannot be shared or bookmarked.
- **SSG generateStaticParams **: Build time is longer because of fetching necessary data for static params.

---

### Known Limitations / TODOs
- [ ] Add filters to the URL so searches can be shared/bookmarked.  
- [ ] Improve error handling for API failures (e.g., retries/backoff).  
- [ ] Add unit tests and integration tests for API queries.  
- [ ] Implement server-side caching for API responses (e.g., with Next.js caching or an edge function).  
- [ ] Improve mobile responsiveness of the filters UI.  

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
