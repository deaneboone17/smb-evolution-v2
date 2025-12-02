# SMB Evolution.ai

Transform Your Business Journey - A full-stack business evolution platform built with React, Vite, and Lovable Cloud (Supabase).

## 🚀 Project Overview

SMB Evolution.ai guides businesses through three evolution phases:
- **Spark**: Build your foundation
- **Momentum**: Scale operations  
- **Mastery**: Achieve industry leadership

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Row-Level Security
- **Content**: MDX support via react-markdown

## 📦 Features

- ✅ Free business evolution assessment
- ✅ Phase-filtered solutions, products, apps, and resources
- ✅ Newsletter with MDX support
- ✅ Flashboard CMS-compatible database schema
- ✅ SEO-optimized pages
- ✅ Responsive design with custom brand tokens
- ✅ Secure backend with RLS policies

## 🗄️ Database Schema

The database is designed for Flashboard CMS compatibility:

### Core Tables
- **phases**: Spark, Momentum, Mastery taxonomy
- **site_settings**: Global site configuration
- **pages**: Static page content with JSONB sections
- **solutions**: Consulting services
- **products**: Courses and templates
- **apps**: Micro-SaaS offerings
- **resources**: Guides and playbooks
- **newsletter_issues**: Newsletter content with MDX
- **newsletter_ctas**: CTAs for newsletter issues
- **events**: Webinars and events (scaffolded)
- **user_roles**: Admin access control

### Security
All tables have Row-Level Security (RLS) enabled:
- Public read access for `published = true` content
- Admin-only write access via `is_admin()` function
- Separate `user_roles` table for role management

## 🔌 Connecting Flashboard CMS

### Step 1: Get Your Database Connection URL

1. Access your Lovable Cloud backend:
   - Open your project in Lovable
   - Click on the "Cloud" tab in the left sidebar
   - Navigate to "Database" section

2. **Important**: You need the **Transaction Pooler** connection string (not the Direct connection):
   - Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
   - This uses port **6543** (pooler) not 5432 (direct)

### Step 2: Connect to Flashboard

1. Go to [Flashboard](https://www.getflashboard.com/)
2. Create a new project or open an existing one
3. Navigate to "Data Sources" → "Connect Database"
4. Select "PostgreSQL"
5. Paste your **Transaction Pooler** connection URL
6. Test the connection
7. You're done! All tables are now manageable via Flashboard's visual interface

### Step 3: Create an Admin User

To manage content, you need admin access:

```sql
-- Replace with your user ID from auth.users table
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-id-here', 'admin');
```

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Variables

These are automatically managed by Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## 📝 Content Management

### Via Flashboard (Recommended)
- Visual interface for all content
- Real-time updates
- No SQL knowledge required
- Manage published status, phases, and relationships

### Via SQL (Advanced)
Access the backend SQL editor in Lovable Cloud to run custom queries.

## 🔐 Security Best Practices

1. **Never commit secrets** - Connection strings contain sensitive data
2. **Use admin roles** - Don't disable RLS to edit content
3. **Review RLS policies** - Ensure they match your security requirements
4. **Backup regularly** - Use Lovable Cloud's backup features

## 📚 Key Routes

- `/` - Homepage
- `/assessment` - Business assessment tool
- `/assessment/results/:segment` - Assessment results (low/mid/high)
- `/solutions` - Consulting services
- `/products` - Courses and templates
- `/apps` - Micro-SaaS tools
- `/resources` - Free guides and playbooks
- `/newsletter` - Newsletter archive
- `/about` - About page
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## 🎨 Design System

### Brand Colors
- **Primary**: Deep Navy (#1B1B3A) + Blue (#1C77C3)
- **Spark**: Red (#FF6B6B)
- **Momentum**: Yellow (#FFD166)
- **Mastery**: Green (#06D6A0)

### Typography
- **Headings**: Montserrat
- **Body**: Inter
- **Accent**: Space Grotesk

## 🚢 Deployment

Deploy directly from Lovable:
1. Click "Publish" in the top right
2. Your app will be deployed to Lovable's hosting
3. Custom domains available in project settings

## 📖 Documentation

- [Lovable Cloud Docs](https://docs.lovable.dev/features/cloud)
- [Flashboard Integration](https://www.getflashboard.com/docs/integrations/lovable)
- [Supabase (Lovable Cloud) Docs](https://supabase.com/docs)

## 🤝 Support

- **Issues**: Report in Lovable chat or project issues
- **Email**: hello@smbevolution.ai
- **Community**: Join the Lovable Discord

## 📄 License

Copyright © 2025 SMB Evolution.ai. All rights reserved.

---

Built with ❤️ using [Lovable](https://lovable.dev)
