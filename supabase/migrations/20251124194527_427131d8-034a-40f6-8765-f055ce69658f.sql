-- Seed hero content for all phase + variant combinations in site_content table

-- Products hero content
INSERT INTO site_content (key, value) VALUES
('hero.products.spark', '{
  "title": "Products to Build Your Spark Foundation",
  "subtitle": "Pick a small number of systems that give you time back and validate your model.",
  "body": "At the Spark phase, your goal isn''t to buy everything—it''s to install a handful of offers that remove uncertainty and busywork. These products help you clarify your offer, capture leads consistently, and stop running everything out of your head."
}'::jsonb),
('hero.products.momentum', '{
  "title": "Products to Scale Your Momentum",
  "subtitle": "Turn what''s working into repeatable systems and protect every lead and client.",
  "body": "In Momentum, your products should help standardize delivery, tighten follow-up, and stabilize cash flow. These offers are built to keep your growth from turning into chaos."
}'::jsonb),
('hero.products.mastery', '{
  "title": "Products for Mastery-Level Leverage",
  "subtitle": "Invest in systems that give you real-time visibility and strategic control.",
  "body": "At Mastery, your products are about leverage—dashboards, AI insights, and operating systems that make your business self-improving instead of owner-dependent."
}'::jsonb),

-- Apps hero content
('hero.apps.spark', '{
  "title": "Apps That Automate Your First Wins",
  "subtitle": "Lightweight automations that work quietly in the background.",
  "body": "In Spark, the right apps reclaim hours of manual work without adding complexity. These automations help you capture leads, follow up, and track payments without hiring a team."
}'::jsonb),
('hero.apps.momentum', '{
  "title": "Apps That Keep Your Momentum Under Control",
  "subtitle": "Automation that scales with your demand.",
  "body": "At the Momentum stage, apps should stop balls from dropping. These tools protect revenue, coordinate your team, and make sure every opportunity is handled."
}'::jsonb),
('hero.apps.mastery', '{
  "title": "Apps That Power a Self-Improving Business",
  "subtitle": "AI and automation as your silent operations team.",
  "body": "In Mastery, you use apps to see everything clearly and act faster. These systems integrate your data, surface insights, and automate decisions where it makes sense."
}'::jsonb),

-- Resources hero content
('hero.resources.spark', '{
  "title": "Resources to Get Your Spark Started Right",
  "subtitle": "Short guides and templates to remove confusion and get you moving.",
  "body": "Spark resources give you clarity: what to focus on, what to ignore, and how to set up the basics of an AI-aware, systemized business without overwhelm."
}'::jsonb),
('hero.resources.momentum', '{
  "title": "Resources to Systemize Your Momentum",
  "subtitle": "Playbooks and checklists to help your team execute consistently.",
  "body": "Momentum resources are all about repeatable processes. Use these to document workflows, tighten handoffs, and use AI to keep quality high as you grow."
}'::jsonb),
('hero.resources.mastery', '{
  "title": "Resources for Mastery-Level Leadership",
  "subtitle": "Strategic guides for data-driven, AI-powered decision making.",
  "body": "Mastery resources help you think like a systems architect. You''ll find frameworks for dashboards, forecasting, and designing an organization that improves itself."
}'::jsonb),

-- Newsletter hero content
('hero.newsletter.spark', '{
  "title": "Newsletter: AI for SMBs — Spark Edition",
  "subtitle": "Weekly, beginner-friendly insights to help you build your foundation.",
  "body": "Spark-focused issues show you simple, practical ways to use AI and automation right now—without a big budget or a tech team."
}'::jsonb),
('hero.newsletter.momentum', '{
  "title": "Newsletter: AI for SMBs — Momentum Edition",
  "subtitle": "Weekly systems and automation tips to scale what''s working.",
  "body": "Momentum-focused issues focus on scaling operations, protecting revenue, and building systems your team can actually follow."
}'::jsonb),
('hero.newsletter.mastery', '{
  "title": "Newsletter: AI for SMBs — Mastery Edition",
  "subtitle": "Weekly strategic insights for data-driven SMB leaders.",
  "body": "Mastery-focused issues help you build an AI-ready operating model—covering dashboards, forecasting, and high-leverage automations."
}'::jsonb)

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();