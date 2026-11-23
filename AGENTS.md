# Agent integrations
- Author remote MCP tools in `src/lib/mcp/` using the SDK Vite plugin; generated edge code is SDK-owned and activates only with app publication.
- Remote student data tools are read-only and use verified OAuth caller credentials plus existing RLS; never modify academic selections through integrations.
- Use real-path routing for OAuth consent and auth entry points while preserving hash routing for native-shell navigation, because external OAuth redirects cannot target hash routes.
- Register browser-local tools in the chat owner only while the chat is visible, using `use-webmcp-tool` and the shared fail-open telemetry wrapper.