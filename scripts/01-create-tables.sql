-- Create semesters table
CREATE TABLE IF NOT EXISTS semesters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  semester_id UUID REFERENCES semesters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  credit_hours INTEGER NOT NULL CHECK (credit_hours > 0),
  gpa DECIMAL(3,2) NOT NULL CHECK (gpa >= 0 AND gpa <= 4.0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_semesters_user_id ON semesters(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_semester_id ON courses(semester_id);

-- Enable Row Level Security
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can only see their own semesters" ON semesters
  FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can only see courses from their semesters" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM semesters 
      WHERE semesters.id = courses.semester_id 
      AND semesters.user_id = auth.jwt() ->> 'sub'
    )
  );
