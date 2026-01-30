-- Create favorite_courses table for students to save their preferred courses
CREATE TABLE public.favorite_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.favorite_courses ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own favorites"
ON public.favorite_courses
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites"
ON public.favorite_courses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites"
ON public.favorite_courses
FOR DELETE
USING (auth.uid() = user_id);