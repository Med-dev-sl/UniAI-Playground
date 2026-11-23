import { defineTool, ToolError } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { supabaseForUser } from '../supabase';

export default defineTool({
  name: 'read_conversation', title: 'Read saved chat messages',
  description: 'Read a page of up to 50 messages from a conversation owned by the signed-in student.',
  inputSchema: {
    conversation_id: z.string().uuid().describe('Conversation ID returned by list_conversations.'),
    offset: z.number().int().min(0).max(10000).default(0).describe('Message offset for reading the next page.'),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ conversation_id, offset }, ctx) => {
    const db = await supabaseForUser(ctx);
    const { data: conversation, error: ownerError } = await db.from('conversations').select('id').eq('id', conversation_id).eq('user_id', ctx.getUserId()).maybeSingle();
    if (ownerError || !conversation) throw new ToolError('Conversation not found or unavailable to this account.');
    const { data, error } = await db.from('messages').select('id, role, content, created_at').eq('conversation_id', conversation_id).order('created_at', { ascending: true }).order('id').range(offset, offset + 49);
    if (error) throw new ToolError('Could not read this conversation.');
    return { content: [{ type: 'text', text: JSON.stringify({ messages: data ?? [], next_offset: data?.length === 50 ? offset + 50 : null }) }] };
  },
});