import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Trash2, Clock } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';
import { Conversation } from '@/hooks/useChatHistory';
import { formatDistanceToNow } from 'date-fns';

interface ConversationHistoryProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelect: (conversationId: string) => void;
  onNew: () => void;
  onDelete: (conversationId: string) => void;
}

export function ConversationHistory({
  conversations,
  currentConversationId,
  onSelect,
  onNew,
  onDelete,
}: ConversationHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-4 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-electric" />
          Chat History
        </h3>
        <AnimatedButton variant="ghost" size="sm" onClick={onNew}>
          <Plus className="w-4 h-4" />
        </AnimatedButton>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground text-center py-4"
            >
              No previous chats
            </motion.p>
          ) : (
            conversations.map((convo, index) => (
              <motion.div
                key={convo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(convo.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all group ${
                  currentConversationId === convo.id
                    ? 'bg-electric/20 border border-electric/30'
                    : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {convo.title || 'New Chat'}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(convo.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(convo.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
