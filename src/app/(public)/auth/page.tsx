import { PurposeLine } from '@/components/patterns/PurposeLine';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons/icons';

export default function AuthPage() {
  return (
    <main className="mx-auto max-w-md p-8">
      <PurposeLine text="Sign in to keep your library." />
      <section className="mt-6">
        <SegmentedControl options={['Sign In', 'Sign Up']} defaultValue="Sign In" />
      </section>
      <section className="mt-4 space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
      </section>
      <section className="mt-4 flex items-center justify-between">
        <Button className="flex items-center gap-2">
          <Icon name="google" className="h-5 w-5" />
          Continue with Google
        </Button>
        <Button variant="primary">Sign In</Button>
      </section>
    </main>
  );
}
