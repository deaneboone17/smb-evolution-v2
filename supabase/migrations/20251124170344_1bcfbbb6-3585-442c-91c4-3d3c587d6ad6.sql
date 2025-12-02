-- Add next_10_weeks_focus field to phases table for strategic messaging
ALTER TABLE public.phases 
ADD COLUMN IF NOT EXISTS next_10_weeks_focus TEXT;