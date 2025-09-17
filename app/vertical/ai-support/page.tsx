import { verticals } from '@/lib/verticals';
import BuilderVerticalPage from '@/components/builder/BuilderVerticalPage';

export default function Page() {
  return <BuilderVerticalPage vertical={verticals['ai-support']} />;
}
