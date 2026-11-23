import { defineTool, ToolError } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { supabaseForUser } from '../supabase';

export default defineTool({
  name: 'list_conversations', title: 'List saved student chats',
  description: 'List up to 50 recent conversations owned by the signed-in student, optionally filtered by course.',
  inputSchema: { course_id: z.string().min(1).optional().describe('Optional course identifier to filter saved chats.') },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ course_id }, ctx) => {
    const db = await supabaseForUser(ctx);
    let query = db.from('conversations').select('id, course_id, title, updated_at').eq('user_id', ctx.getUserId()).order('updated_at', { ascending: false }).limit(50);
    if (course_id !== undefined) query = query.eq('course_id', course_id);
    const { data, error } = await query;
    if (error) throw new ToolError('Could not read your saved chats.');
    return { content: [{ type: 'text', text: JSON.stringify(data ?? []) }] };
  },
});