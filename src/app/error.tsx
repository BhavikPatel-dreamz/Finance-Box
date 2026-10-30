"use client";

import { Container } from "@/components/ui/container";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container as="main" className="flex flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-4 max-w-2xl text-muted">This page could not be displayed.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 w-fit border border-foreground px-4 py-2"
      >
        Try again
      </button>
    </Container>
  );
}
