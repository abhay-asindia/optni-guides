import { searchIndex } from "../lib/site.ts";

export const GET = () => new Response(JSON.stringify(searchIndex()), { headers: { "Content-Type": "application/json" } });
