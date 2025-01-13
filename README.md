# Shopify App Template - Remix

This is a template for building Shopify apps using the Remix framework. It is optimized for Vercel deployment and includes built-in support for Tailwind CSS.

## Installation Instructions

Follow these steps to set up and deploy your Shopify app:

### 1. Fork the Repository

Begin by forking this repository to your own GitHub account.

### 2. Update Configuration Files

Modify the following fields in the configuration files:

#### `shopify.app.toml`

- **`name`**: Update to your app's name.
- **`handle`**: Provide a unique handle for your app.
- **`application_url`**: Replace with the URL provided by Vercel after the first deployment.
- **`redirect_url`**: Update to match the `application_url` value, with `/auth/callback` appended.
- **`client_id`**: Replace with the Client ID provided by your Shopify Partner Dashboard.

#### `package.json`

- **`name`**: Update to match your app's name.

### 3. Create a `.env` File

Create a `.env` file in the root of your project with the following content:

```env
# Shopify and Vercel
SHOPIFY_API_KEY=570dd80ead4538bbe2262e8eaf693274
SHOPIFY_API_SECRET=bc04c47d413ecfc12232ed4d7f5fcd50
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_orders
SHOPIFY_APP_URL=https://shopify-vercel-app-chi.vercel.app

# Database ultra important
DATABASE_URL=postgres://neondb_owner:vNfLsgS8d6lI@ep-green-forest-a5ja5x5i-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
DIRECT_DATABASE_URL=postgresql://neondb_owner:vNfLsgS8d6lI@ep-green-forest-a5ja5x5i.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 4. Install Dependencies

Install all necessary dependencies:

```bash
npm install
```

### 5. Generate and Migrate Prisma

Run the following commands to generate and migrate the Prisma schema:

```bash
npx prisma generate
npx prisma migrate deploy
```

### 6. Deploy to Vercel

Deploy the app to Vercel for the first time:

1. Create a new project on Vercel and connect it to your repository.
2. Update the `application_url` and `redirect_url` fields in `shopify.app.toml` to the URL provided by Vercel.
3. Add the `.env` file variables to your Vercel project's environment settings.
4. Deploy the project.

### 7. Deploy to Shopify

Run the Shopify CLI command to deploy your app:

```bash
shopify app deploy
```

Your app is now ready to install and use!

## Features

- **Optimized for Vercel**: Seamless deployment with tailored configurations for Vercel.
- **Built-in Tailwind CSS**: Style your app effortlessly with Tailwind CSS.
- **Shopify Integration**: Includes Polaris, AppBridge, and Webhooks for enhanced functionality.

## Need Help?

Feel free to reach out for assistance or customization:

- **Email**: [your_email@example.com](mailto:your_email@example.com)
- **GitHub**: [github.com/yourgithub](https://github.com/yourgithub)
- **LinkedIn**: [linkedin.com/in/yourlinkedin](https://linkedin.com/in/yourlinkedin)
