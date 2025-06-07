-- Drop existing tables to recreate with proper foreign keys
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS semesters CASCADE;

-- Create semesters table with proper user reference
CREATE TABLE IF NOT EXISTS semesters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table with proper foreign key relationships
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  credit_hours INTEGER NOT NULL CHECK (credit_hours > 0),
  gpa DECIMAL(3,2) NOT NULL CHECK (gpa >= 0 AND gpa <= 4.0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create update triggers for semesters
CREATE TRIGGER update_semesters_updated_at BEFORE UPDATE ON semesters
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create update triggers for courses
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_semesters_user_id ON semesters(user_id);
CREATE INDEX IF NOT EXISTS idx_semesters_created_at ON semesters(created_at);
CREATE INDEX IF NOT EXISTS idx_courses_semester_id ON courses(semester_id);
CREATE INDEX IF NOT EXISTS idx_courses_user_id ON courses(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON courses(created_at);

-- Enable Row Level Security
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for semesters
CREATE POLICY "Users can only access their own semesters" ON semesters
  FOR ALL USING (user_id = auth.jwt() ->> 'sub');

-- Create RLS policies for courses
CREATE POLICY "Users can only access their own courses" ON courses
  FOR ALL USING (user_id = auth.jwt() ->> 'sub');

-- Alternative policy for courses (via semester relationship)
CREATE POLICY "Users can access courses through their semesters" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM semesters 
      WHERE semesters.id = courses.semester_id 
      AND semesters.user_id = auth.jwt() ->> 'sub'
    )
  ); 