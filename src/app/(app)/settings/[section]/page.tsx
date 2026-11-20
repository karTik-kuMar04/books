import { SettingsView } from '@/features/settings';

export default async function SettingsSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <SettingsView section={section} />;
}
