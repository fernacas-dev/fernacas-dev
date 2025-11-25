import React from 'react';

interface EditorSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const EditorSection: React.FC<EditorSectionProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 mb-4">
      <div className="flex items-center gap-2 mb-4 text-slate-200">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
