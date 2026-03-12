import "dotenv/config";

// ============================================================
// Model configuration - auto-detect provider from env
// ============================================================

export function getModelConfig(): { provider: string; model: string } {
  if (process.env.ANTHROPIC_API_KEY) {
    return {
      provider: "anthropic",
      model: process.env.MODEL_NAME || "claude-sonnet-4-5-20250929",
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      provider: "openai",
      model: process.env.MODEL_NAME || "gpt-4o",
    };
  }
  throw new Error(
    "No API key found. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in .env"
  );
}

export function getModelString(): string {
  const { provider, model } = getModelConfig();
  return `${provider}:${model}`;
}
