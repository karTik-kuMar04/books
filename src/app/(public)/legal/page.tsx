import { PurposeLine } from '@/components/patterns/PurposeLine';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export default function LegalPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <PurposeLine text="Your books stay yours." />
      <Tabs defaultValue="privacy" className="mt-6">
        <TabsList>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="copyright">Copyright</TabsTrigger>
        </TabsList>
        <TabsContent value="privacy" className="mt-4">
          <p>
            We never share your uploaded books. All processing stays in your browser unless you
            explicitly export.
          </p>
        </TabsContent>
        <TabsContent value="terms" className="mt-4">
          <p>
            Use of Folio is governed by our Terms of Service. You may delete your data at any time.
          </p>
        </TabsContent>
        <TabsContent value="retention" className="mt-4">
          <p>
            Books are stored locally for the duration of your session. No server‑side persistence.
          </p>
        </TabsContent>
        <TabsContent value="copyright" className="mt-4">
          <p>
            All rights remain with the original authors. Folio does not claim ownership of your
            content.
          </p>
        </TabsContent>
      </Tabs>
    </main>
  );
}
