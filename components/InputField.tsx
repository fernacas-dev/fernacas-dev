import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>
    <input
      className={`bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${className}`}
      {...props}
    />
  </div>
);

export const TextAreaField: React.FC<TextAreaProps> = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>
    <textarea
      className={`bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-y ${className}`}
      {...props}
    />
  </div>
);
