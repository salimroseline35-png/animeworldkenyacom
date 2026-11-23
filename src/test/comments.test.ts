import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

import { validateComment } from "@/lib/comments";

describe("Post comments", () => {
  it("needs a name", () => {
    expect(validateComment("   ", "Frieren all the way")).toBe("Please add your name.");
  });

  it("needs a comment", () => {
    expect(validateComment("Wanjiru", "  ")).toBe("Please write a comment.");
  });

  it("allows names up to 40 characters", () => {
    expect(validateComment("a".repeat(40), "Hi")).toBeNull();
    expect(validateComment("a".repeat(41), "Hi")).not.toBeNull();
  });

  it("allows comments up to 600 characters", () => {
    expect(validateComment("Wanjiru", "b".repeat(600))).toBeNull();
    expect(validateComment("Wanjiru", "b".repeat(601))).not.toBeNull();
  });
});
