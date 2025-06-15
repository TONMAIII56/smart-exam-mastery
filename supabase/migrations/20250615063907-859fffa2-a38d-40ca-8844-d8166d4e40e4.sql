
-- Create admin roles enum if not exists
DO $$ BEGIN
    CREATE TYPE admin_role AS ENUM ('super_admin', 'content_manager', 'moderator');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create exam status enum
DO $$ BEGIN
    CREATE TYPE exam_status AS ENUM ('draft', 'review', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create question status enum  
DO $$ BEGIN
    CREATE TYPE question_status AS ENUM ('draft', 'review', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add admin role to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS admin_role admin_role;

-- Add status and metadata columns to exams table
ALTER TABLE exams ADD COLUMN IF NOT EXISTS status exam_status DEFAULT 'draft';
ALTER TABLE exams ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE exams ADD COLUMN IF NOT EXISTS premium_only BOOLEAN DEFAULT false;
ALTER TABLE exams ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'public';
ALTER TABLE exams ADD COLUMN IF NOT EXISTS exam_code TEXT;

-- Add status and metadata columns to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS status question_status DEFAULT 'draft';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE questions ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;

-- Create exam_templates table for CSV/Excel upload templates
CREATE TABLE IF NOT EXISTS exam_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    template_data JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_log table for tracking changes
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by UUID REFERENCES profiles(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create question_versions table for version control
CREATE TABLE IF NOT EXISTS question_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    question_data JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exam_analytics table for tracking usage
CREATE TABLE IF NOT EXISTS exam_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL, -- 'difficulty', 'popularity', 'success_rate'
    metric_value NUMERIC,
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE exam_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin access
CREATE POLICY "Admin access to exam_templates" ON exam_templates
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND admin_role IN ('super_admin', 'content_manager')
        )
    );

CREATE POLICY "Admin access to audit_log" ON audit_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND admin_role IN ('super_admin', 'content_manager')
        )
    );

CREATE POLICY "Admin access to question_versions" ON question_versions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND admin_role IN ('super_admin', 'content_manager')
        )
    );

CREATE POLICY "Admin access to exam_analytics" ON exam_analytics
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND admin_role IN ('super_admin', 'content_manager')
        )
    );

-- Function to check admin permissions
CREATE OR REPLACE FUNCTION check_admin_permission(required_role admin_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_role admin_role;
BEGIN
    SELECT admin_role INTO user_role
    FROM profiles
    WHERE id = auth.uid();
    
    RETURN CASE
        WHEN required_role = 'moderator' AND user_role IN ('moderator', 'content_manager', 'super_admin') THEN TRUE
        WHEN required_role = 'content_manager' AND user_role IN ('content_manager', 'super_admin') THEN TRUE
        WHEN required_role = 'super_admin' AND user_role = 'super_admin' THEN TRUE
        ELSE FALSE
    END;
END;
$$;

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
    p_table_name TEXT,
    p_record_id UUID,
    p_action TEXT,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
    VALUES (p_table_name, p_record_id, p_action, p_old_values, p_new_values, auth.uid())
    RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_exams_status ON exams(status);
CREATE INDEX IF NOT EXISTS idx_exams_exam_type_subject ON exams(exam_type, subject);
CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_exam_analytics_exam_id ON exam_analytics(exam_id);
