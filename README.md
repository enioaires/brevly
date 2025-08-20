This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Setup

1. Copy the environment variables file:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
   - Set up your database URL
   - Configure Clerk authentication keys
   - Set up email notifications (see Email Configuration section below)

### Email Configuration

This project includes automatic email notifications for waitlist registrations. To enable this feature:

1. **Gmail Setup**: You'll need a Gmail account to send notifications
2. **Generate Gmail App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/apppasswords)
   - You may need to enable 2-Factor Authentication first
   - Select "Mail" as the app and "Other" as the device
   - Copy the generated 16-character password
3. **Configure Environment Variables**:
   ```bash
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ADMIN_EMAIL=admin@brevlydigital.com
   FROM_EMAIL=noreply@brevlydigital.com
   ENABLE_EMAIL_NOTIFICATIONS=true
   ```

**Note**: Use the App Password, not your regular Gmail password. The App Password is a 16-character code without spaces.

#### Email Configuration Troubleshooting

- **"Invalid login"**: Make sure you're using the App Password, not your regular Gmail password
- **"Less secure app access"**: App Passwords bypass this requirement, no need to enable less secure apps
- **"2FA required"**: You must enable 2-Factor Authentication on your Gmail account before generating App Passwords
- **No emails received**: Check that `ADMIN_EMAIL` is set correctly and `ENABLE_EMAIL_NOTIFICATIONS=true`
- **Development mode**: Set `ENABLE_EMAIL_NOTIFICATIONS=false` to disable emails during development

### Development Server

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
