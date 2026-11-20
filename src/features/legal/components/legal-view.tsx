'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PurposeLine } from '@/components/patterns/purpose-line';

export function LegalView() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-text text-3xl font-bold">Legal</h1>
      <PurposeLine>Your books stay yours.</PurposeLine>
      <p className="text-amber-ink mt-4 text-sm">Draft — needs legal review</p>

      <Tabs defaultValue="privacy" className="mt-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="copyright">Copyright</TabsTrigger>
        </TabsList>
        <TabsContent
          value="privacy"
          className="rounded-card border-border bg-card mt-4 border p-5 text-sm leading-relaxed"
        >
          This draft describes the intended privacy approach: uploaded books remain private to the
          account and can be exported or deleted.
        </TabsContent>
        <TabsContent
          value="terms"
          className="rounded-card border-border bg-card mt-4 border p-5 text-sm leading-relaxed"
        >
          This draft explains the intended terms of use. It does not make a legal claim and needs
          review before publication.
        </TabsContent>
        <TabsContent
          value="retention"
          className="rounded-card border-border bg-card mt-4 border p-5 text-sm leading-relaxed"
        >
          This draft describes local mock data in the demo. Final retention periods are not yet
          established.
        </TabsContent>
        <TabsContent
          value="copyright"
          className="rounded-card border-border bg-card mt-4 border p-5 text-sm leading-relaxed"
        >
          Users keep ownership of their uploaded books. Copyright notices and takedown procedures
          need legal review.
        </TabsContent>
      </Tabs>
    </div>
  );
}
