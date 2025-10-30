-- Create categories table
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create questions table
CREATE TABLE public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create health_check_responses table
CREATE TABLE public.health_check_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  completed_at timestamp with time zone
);

-- Create response_answers table
CREATE TABLE public.response_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid REFERENCES public.health_check_responses(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(response_id, question_id)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_check_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.response_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories
  FOR SELECT
  USING (true);

-- RLS Policies for questions (public read)
CREATE POLICY "Questions are viewable by everyone"
  ON public.questions
  FOR SELECT
  USING (true);

-- RLS Policies for health_check_responses
CREATE POLICY "Users can view their own responses"
  ON public.health_check_responses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own responses"
  ON public.health_check_responses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own responses"
  ON public.health_check_responses
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own responses"
  ON public.health_check_responses
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for response_answers
CREATE POLICY "Users can view their own answers"
  ON public.response_answers
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.health_check_responses
    WHERE id = response_answers.response_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own answers"
  ON public.response_answers
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.health_check_responses
    WHERE id = response_answers.response_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own answers"
  ON public.response_answers
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.health_check_responses
    WHERE id = response_answers.response_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own answers"
  ON public.response_answers
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.health_check_responses
    WHERE id = response_answers.response_id
    AND user_id = auth.uid()
  ));

-- Insert initial categories
INSERT INTO public.categories (title, description, icon, display_order) VALUES
  ('Direction', 'How clear and aligned is your strategic direction?', 'Target', 1),
  ('Execution', 'How effectively are you executing and gaining market momentum?', 'TrendingUp', 2),
  ('Leadership', 'How strong and effective is your leadership team?', 'Users', 3),
  ('Collaboration', 'How well do teams work together across the organization?', 'Users2', 4),
  ('Systems, Processes and Structures', 'How well-structured and scalable is your organization?', 'Building', 5),
  ('Data', 'How effectively do you collect, analyze, and use data for decision-making?', 'Database', 6);

-- Insert questions for Direction
INSERT INTO public.questions (category_id, text, display_order)
SELECT id, 'We have a clear and shared long-term goal.', 1 FROM public.categories WHERE title = 'Direction'
UNION ALL
SELECT id, 'Everyone knows what we want to achieve in the next months.', 2 FROM public.categories WHERE title = 'Direction'
UNION ALL
SELECT id, 'Our goals guide our daily decisions.', 3 FROM public.categories WHERE title = 'Direction'
UNION ALL
SELECT id, 'We have clearly defined what sets us apart from our competitors.', 4 FROM public.categories WHERE title = 'Direction';

-- Insert questions for Execution
INSERT INTO public.questions (category_id, text, display_order)
SELECT id, 'We have a clear strategy how we want to achieve our goals.', 1 FROM public.categories WHERE title = 'Execution'
UNION ALL
SELECT id, 'Everyone works on topics that contribute to our goals.', 2 FROM public.categories WHERE title = 'Execution'
UNION ALL
SELECT id, 'We consistently hit our targets.', 3 FROM public.categories WHERE title = 'Execution'
UNION ALL
SELECT id, 'We hold each other accountable for achieving our goals.', 4 FROM public.categories WHERE title = 'Execution';

-- Insert questions for Leadership
INSERT INTO public.questions (category_id, text, display_order)
SELECT id, 'We have the right people in our leadership roles.', 1 FROM public.categories WHERE title = 'Leadership'
UNION ALL
SELECT id, 'Our leaders make tough calls quickly and stand by them.', 2 FROM public.categories WHERE title = 'Leadership'
UNION ALL
SELECT id, 'We trust each other to own our areas fully.', 3 FROM public.categories WHERE title = 'Leadership'
UNION ALL
SELECT id, 'We enable high-performance as a leadership team', 4 FROM public.categories WHERE title = 'Leadership';

-- Insert questions for Collaboration
INSERT INTO public.questions (category_id, text, display_order)
SELECT id, 'We have very effective and efficient meetings.', 1 FROM public.categories WHERE title = 'Collaboration'
UNION ALL
SELECT id, 'Our company culture is clearly aligned with our goals.', 2 FROM public.categories WHERE title = 'Collaboration'
UNION ALL
SELECT id, 'We have a strong feedback culture.', 3 FROM public.categories WHERE title = 'Collaboration'
UNION ALL
SELECT id, 'We have great collaboration and alignment across teams.', 4 FROM public.categories WHERE title = 'Collaboration';

-- Insert questions for Systems, Processes and Structures
INSERT INTO public.questions (category_id, text, display_order)
SELECT id, 'We have identified, simplified and clearly described our 3-5 most important processes.', 1 FROM public.categories WHERE title = 'Systems, Processes and Structures'
UNION ALL
SELECT id, 'We have systems and processes in place to get constant feedback from our customers/users.', 2 FROM public.categories WHERE title = 'Systems, Processes and Structures'
UNION ALL
SELECT id, 'Roles and responsibilities are clear.', 3 FROM public.categories WHERE title = 'Systems, Processes and Structures'
UNION ALL
SELECT id, 'Our values are clearly reflected in our processes (hiring, performance reviews, firing, development…).', 4 FROM public.categories WHERE title = 'Systems, Processes and Structures';

-- Insert questions for Data
INSERT INTO public.questions (category_id, text, display_order)
SELECT id, 'We have identified and constantly monitor the 1-5 key metrics for our business.', 1 FROM public.categories WHERE title = 'Data'
UNION ALL
SELECT id, 'Everyone can access the data relevant for decision making in their role.', 2 FROM public.categories WHERE title = 'Data'
UNION ALL
SELECT id, 'We use data consistently to guide our decisions.', 3 FROM public.categories WHERE title = 'Data'
UNION ALL
SELECT id, 'We visualise our data in meaningful ways to identify patterns and to track progress.', 4 FROM public.categories WHERE title = 'Data';