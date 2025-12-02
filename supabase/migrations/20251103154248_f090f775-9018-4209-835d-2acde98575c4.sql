-- Add size constraint to UTM JSONB column to prevent resource exhaustion
ALTER TABLE assessment_submissions
ADD CONSTRAINT utm_size_limit
CHECK (utm IS NULL OR pg_column_size(utm) < 5000);

-- Add comment explaining the constraint
COMMENT ON CONSTRAINT utm_size_limit ON assessment_submissions IS 
'Limits UTM JSONB column to 5KB to prevent DoS attacks and storage exhaustion';