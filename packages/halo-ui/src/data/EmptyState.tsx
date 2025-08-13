import React from 'react';

export function EmptyState({ icon, title, description, action }: { icon?: React.ReactNode; title?: string; description?: string; action?: React.ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white/10">
			<div className="text-4xl mb-2">{icon}</div>
			<h3 className="text-lg font-bold mb-1">{title}</h3>
			<p className="text-gray-500 mb-3">{description}</p>
			{action}
		</div>
	);
}
