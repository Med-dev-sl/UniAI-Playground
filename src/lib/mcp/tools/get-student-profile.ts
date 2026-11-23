import { defineTool, ToolError } from '@lovable.dev/mcp-js';
import { supabaseForUser } from '../supabase';

export default defineTool({
  name: 'get_student_profile', title: 'Get student academic profile',
  description: 'Read the signed-in student’s saved name, university, academic level, faculty and course.',
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_args, ctx) => {
    const db = await supabaseForUser(ctx);
    const { data, error } = await db.from('profiles').select('full_name, university_id, academic_level, faculty_id, course_id').eq('user_id', ctx.getUserId()).maybeSingle();
    if (error) throw new ToolError('Could not read your academic profile.');
    return { content: [{ type: 'text', text: data ? JSON.stringify(data) : 'No academic profile saved yet.' }] };
  },
});