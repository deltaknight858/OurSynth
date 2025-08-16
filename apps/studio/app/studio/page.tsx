import TimeMachine from '../../components/TimeMachine';

export default function StudioTimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8">
      <h1 className="text-cyan-400 font-bold text-3xl mb-4 drop-shadow-neon">Time Machine</h1>
      <TimeMachine />
    </div>
  );
}
