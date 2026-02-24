ALTER TABLE public.messages 
ADD COLUMN file_name TEXT,
ADD COLUMN file_type TEXT;
ALTER TABLE public.messages RENAME COLUMN image_url TO file_url;
