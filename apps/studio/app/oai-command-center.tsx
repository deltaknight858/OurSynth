import dynamic from 'next/dynamic';

const OAICommandCenter = dynamic(() => import('../src/features/oai/CommandCenter').then(m => m.OAICommandCenter), { ssr: false });

export default function OAICommandCenterPage() {
  return <OAICommandCenter />;
}
