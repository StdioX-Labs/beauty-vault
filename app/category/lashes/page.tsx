import OldPageView, { oldPageMetadata } from '@/lib/old-site/OldPageView';
import { getOldPage } from '@/lib/old-site/pages';

const page = getOldPage('category/lashes')!;

export const metadata = oldPageMetadata(page);

export default function LashesCategory() {
  return <OldPageView page={page} />;
}
