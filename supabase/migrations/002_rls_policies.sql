-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memofiches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Memofiches policies
CREATE POLICY "Anyone can view published memofiches" ON public.memofiches
    FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can view all memofiches" ON public.memofiches
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create memofiches" ON public.memofiches
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own memofiches" ON public.memofiches
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own memofiches" ON public.memofiches
    FOR DELETE USING (auth.uid() = created_by);

-- User progress policies
CREATE POLICY "Users can view their own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress" ON public.user_progress
    FOR DELETE USING (auth.uid() = user_id);

-- Glossary terms policies
CREATE POLICY "Anyone can view glossary terms" ON public.glossary_terms
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create glossary terms" ON public.glossary_terms
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update glossary terms" ON public.glossary_terms
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete glossary terms" ON public.glossary_terms
    FOR DELETE USING (auth.role() = 'authenticated');
