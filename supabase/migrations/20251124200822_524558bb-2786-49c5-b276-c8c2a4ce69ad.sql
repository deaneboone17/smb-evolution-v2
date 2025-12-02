-- Seed phase context content for all variants
-- This content will be used by PhaseContextSection component

-- Home variant
INSERT INTO public.site_content (key, value) VALUES
('context.home.spark', '{
  "heading": "Where Are You in Your AI + Automation Journey?",
  "body": "The Spark → Momentum → Mastery framework helps you focus on what actually matters at each stage. Spark is about validation and foundation. Momentum is about scaling what works. Mastery is about leverage and strategic visibility. Take the assessment to identify your phase and see exactly which systems to install in the next 10 weeks."
}'::jsonb),
('context.home.momentum', '{
  "heading": "Where Are You in Your AI + Automation Journey?",
  "body": "The Spark → Momentum → Mastery framework helps you focus on what actually matters at each stage. You''re in Momentum—your business is growing and you need systems that scale without adding complexity. Focus on protecting revenue, coordinating your team, and making sure nothing falls through the cracks."
}'::jsonb),
('context.home.mastery', '{
  "heading": "Where Are You in Your AI + Automation Journey?",
  "body": "The Spark → Momentum → Mastery framework helps you focus on what actually matters at each stage. You''re in Mastery—your core operations are solid and now it''s about optimization, data-driven decisions, and building leverage through AI and automation at scale."
}'::jsonb);

-- Solutions variant
INSERT INTO public.site_content (key, value) VALUES
('context.solutions.spark', '{
  "heading": "What to Install in the Spark Phase",
  "body": "Your next 10 weeks should focus on getting clear on your offer, capturing leads consistently, and stopping the constant firefighting. These solutions help you validate your model and reclaim time—without requiring a big budget or a tech team. Start with one system that removes uncertainty and one that automates repetitive tasks."
}'::jsonb),
('context.solutions.momentum', '{
  "heading": "What to Install in the Momentum Phase",
  "body": "Your next 10 weeks should focus on scaling what works without losing quality or burning out. These solutions help you standardize delivery, tighten follow-up, and stabilize cash flow. Pick systems that protect every lead and client while coordinating your growing team."
}'::jsonb),
('context.solutions.mastery', '{
  "heading": "What to Install in the Mastery Phase",
  "body": "Your next 10 weeks should focus on building leverage through visibility and automation. These solutions give you real-time dashboards, AI-powered insights, and operating systems that make your business self-improving instead of owner-dependent. Choose systems that free you to lead strategically."
}'::jsonb);

-- Products variant
INSERT INTO public.site_content (key, value) VALUES
('context.products.spark', '{
  "heading": "Why These Products Matter in the Spark Phase",
  "body": "Spark products focus on validation and simplicity. You don''t need a huge tech stack—you need a handful of playbooks and systems that reclaim your time and prove your offer works. These products help you get organized, capture leads, and stop running everything out of your head."
}'::jsonb),
('context.products.momentum', '{
  "heading": "Why These Products Matter in the Momentum Phase",
  "body": "Momentum products focus on scaling and stability. Your business is growing and you need offers that help standardize delivery, automate follow-up, and protect cash flow. These products turn what''s working into repeatable systems your team can actually follow."
}'::jsonb),
('context.products.mastery', '{
  "heading": "Why These Products Matter in the Mastery Phase",
  "body": "Mastery products focus on leverage and visibility. Your operations are established—now it''s about executive-level dashboards, predictive insights, and AI systems that make the business self-improving. These products help you lead with data instead of gut instinct."
}'::jsonb);

-- Apps variant
INSERT INTO public.site_content (key, value) VALUES
('context.apps.spark', '{
  "heading": "How These Apps Support You in Spark",
  "body": "In Spark, the right apps reclaim hours of manual work without adding complexity. These automations help you capture leads, follow up consistently, and track payments—all working quietly in the background while you focus on validating your offer and serving early clients."
}'::jsonb),
('context.apps.momentum', '{
  "heading": "How These Apps Support You in Momentum",
  "body": "In Momentum, apps should stop balls from dropping. These tools protect revenue, coordinate your team, and make sure every opportunity is handled. They scale with your demand so growth doesn''t turn into chaos."
}'::jsonb),
('context.apps.mastery', '{
  "heading": "How These Apps Support You in Mastery",
  "body": "In Mastery, you use apps to see everything clearly and act faster. These systems integrate your data, surface insights, and automate decisions where it makes sense. They function as your silent operations team—giving you leverage without adding headcount."
}'::jsonb);

-- Resources variant
INSERT INTO public.site_content (key, value) VALUES
('context.resources.spark', '{
  "heading": "What These Resources Help You Do in Spark",
  "body": "Spark resources give you clarity—what to focus on, what to ignore, and how to set up the basics of an AI-aware, systemized business without overwhelm. Use these guides and templates to remove confusion and get moving quickly."
}'::jsonb),
('context.resources.momentum', '{
  "heading": "What These Resources Help You Do in Momentum",
  "body": "Momentum resources are all about repeatable processes. Use these playbooks and checklists to document workflows, tighten handoffs, and leverage AI to keep quality high as you grow. They help your team execute consistently without constant supervision."
}'::jsonb),
('context.resources.mastery', '{
  "heading": "What These Resources Help You Do in Mastery",
  "body": "Mastery resources help you think like a systems architect. You''ll find frameworks for dashboards, forecasting, and designing an organization that improves itself. These strategic guides are for leaders ready to use data and AI to drive decisions at scale."
}'::jsonb);

-- Newsletter variant
INSERT INTO public.site_content (key, value) VALUES
('context.newsletter.spark', '{
  "heading": "What You''ll Get in the Spark Edition",
  "body": "Spark-focused issues show you simple, practical ways to use AI and automation right now—without a big budget or a tech team. Each week, you get one beginner-friendly tip you can implement in under an hour to reclaim time and validate your offer."
}'::jsonb),
('context.newsletter.momentum', '{
  "heading": "What You''ll Get in the Momentum Edition",
  "body": "Momentum-focused issues focus on scaling operations, protecting revenue, and building systems your team can actually follow. Each week, you get tactical guidance on systemizing what works and preventing the chaos that comes with growth."
}'::jsonb),
('context.newsletter.mastery', '{
  "heading": "What You''ll Get in the Mastery Edition",
  "body": "Mastery-focused issues help you build an AI-ready operating model—covering dashboards, forecasting, and high-leverage automations. Each week, you get strategic insights for data-driven SMB leaders who want to optimize and innovate at scale."
}'::jsonb);

-- Assessment Results variant
INSERT INTO public.site_content (key, value) VALUES
('context.assessment-results.spark', '{
  "heading": "What Your Spark Result Means",
  "body": "You''re in Spark—the foundation-building phase. Your biggest priority right now is validating your offer and removing the busywork that keeps you stuck. Focus on installing one product that gives you clarity, one app that automates repetitive tasks, and reading one guide that shows you what to focus on next. Don''t try to do everything at once."
}'::jsonb),
('context.assessment-results.momentum', '{
  "heading": "What Your Momentum Result Means",
  "body": "You''re in Momentum—the scaling phase. Your business is growing and you need systems that protect what''s working without burning you out. Focus on installing systems that standardize delivery, automate follow-up, and coordinate your team. Your goal is to turn wins into repeatable processes."
}'::jsonb),
('context.assessment-results.mastery', '{
  "heading": "What Your Mastery Result Means",
  "body": "You''re in Mastery—the optimization and leverage phase. Your operations are solid and now it''s about data-driven decisions and strategic visibility. Focus on dashboards that show you what matters, AI systems that surface insights, and automations that make the business self-improving. Lead with data, not gut instinct."
}'::jsonb)

ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;