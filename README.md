This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Development

To run this project locally, follow these steps:

1. **Install Dependencies**
   First, ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. **Run the Development Server**
   Start the local development server:
   ```bash
   npm run dev
   ```

3. **View the App**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Troubleshooting Local Deployment

If you encounter issues running the app locally (e.g., the server starts but hangs indefinitely without loading pages, or throws `MODULE_NOT_FOUND` errors inside `next/dist`):

1. **Clean Reinstall:** The `node_modules` folder or `.next` cache might be corrupted. Run the following to reset your environment:
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run dev
   ```

2. **Port Conflicts:** If port 3000 is blocked or a previous Next.js instance crashed and left a lock file, kill the stale processes:
   ```bash
   lsof -ti :3000 | xargs kill -9
   # or
   npx kill-port 3000
   ```

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
