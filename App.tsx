import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Wand2, 
  Copy, 
  Check, 
  User, 
  Code2, 
  Briefcase, 
  MessageSquare, 
  LayoutTemplate,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { EditorSection } from './components/EditorSection';
import { InputField, TextAreaField } from './components/InputField';
import { generateReadme } from './services/geminiService';
import { ProfileData, INITIAL_DATA } from './types';
import ReactMarkdown from 'react-markdown';

const App: React.FC = () => {
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [markdown, setMarkdown] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  // Generate initial markdown on load using the template (simulated) or just empty
  useEffect(() => {
    // We construct a basic template immediately so the user sees something
    // But we let them click "Generate" to use AI for the polished version
    handleGenerate(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleTechStackChange = (field: keyof ProfileData['techStack'], value: string) => {
    setData(prev => ({
      ...prev,
      techStack: { ...prev.techStack, [field]: value }
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Direct pass for immediate feedback before AI enhancement
      const aiResult = await generateReadme(data);
      setMarkdown(aiResult);
    } catch (error) {
      console.error("Failed to generate:", error);
      // Fallback if API key missing or error
      setMarkdown("# Error\nCould not generate README. Please check your API Key configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans">
      
      {/* Left Panel: Editor */}
      <div className="w-full md:w-1/2 lg:w-5/12 h-auto md:h-screen overflow-y-auto border-r border-slate-800 flex flex-col">
        <header className="p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-600 rounded-lg">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-indigo-400">
              GitProfile Gen
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Generate a professional GitHub README tailored to your profile using Gemini AI.
          </p>
        </header>

        <div className="p-6 space-y-6 pb-24">
          
          <EditorSection title="Personal Info" icon={<User className="w-5 h-5 text-brand-400" />}>
            <InputField 
              label="Display Name" 
              value={data.name} 
              onChange={(e) => handleInputChange('name', e.target.value)} 
            />
            <InputField 
              label="Role / Title" 
              value={data.role} 
              onChange={(e) => handleInputChange('role', e.target.value)} 
            />
            <TextAreaField 
              label="Short Bio / Introduction" 
              value={data.intro} 
              onChange={(e) => handleInputChange('intro', e.target.value)} 
              rows={3}
            />
          </EditorSection>

          <EditorSection title="About Details" icon={<LayoutTemplate className="w-5 h-5 text-brand-400" />}>
            <TextAreaField 
              label="Bullet Points (One per line)" 
              placeholder="- Detail 1..."
              value={data.aboutItems} 
              onChange={(e) => handleInputChange('aboutItems', e.target.value)} 
            />
          </EditorSection>

          <EditorSection title="Tech Stack" icon={<Code2 className="w-5 h-5 text-brand-400" />}>
            <TextAreaField 
              label="Backend" 
              value={data.techStack.backend} 
              onChange={(e) => handleTechStackChange('backend', e.target.value)} 
              className="min-h-[80px]"
            />
            <TextAreaField 
              label="Frontend" 
              value={data.techStack.frontend} 
              onChange={(e) => handleTechStackChange('frontend', e.target.value)} 
              className="min-h-[80px]"
            />
            <TextAreaField 
              label="Tools & Ecosystem" 
              value={data.techStack.tools} 
              onChange={(e) => handleTechStackChange('tools', e.target.value)} 
              className="min-h-[80px]"
            />
          </EditorSection>

          <EditorSection title="Work & Focus" icon={<Briefcase className="w-5 h-5 text-brand-400" />}>
            <TextAreaField 
              label="What I Usually Work On (One per line)" 
              value={data.workItems} 
              onChange={(e) => handleInputChange('workItems', e.target.value)} 
            />
            <TextAreaField 
              label="What You'll Find Here (One per line)" 
              value={data.repoItems} 
              onChange={(e) => handleInputChange('repoItems', e.target.value)} 
            />
          </EditorSection>

          <EditorSection title="Contact" icon={<MessageSquare className="w-5 h-5 text-brand-400" />}>
             <InputField 
              label="Email or Social Links" 
              value={data.contact} 
              onChange={(e) => handleInputChange('contact', e.target.value)} 
            />
          </EditorSection>

        </div>

        {/* Floating Action Button for Mobile / Sticky Footer for Desktop */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 sticky bottom-0 z-20">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white transition-all transform active:scale-95 ${
              isGenerating 
                ? 'bg-slate-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-900/20'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate README with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="w-full md:w-1/2 lg:w-7/12 h-auto md:h-screen bg-slate-950 flex flex-col">
        {/* Preview Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/30">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'code' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Raw Code
            </button>
          </div>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors px-3 py-1.5 rounded-md hover:bg-slate-800"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {isCopied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {activeTab === 'preview' ? (
             <div className="prose prose-invert prose-slate max-w-none mx-auto bg-slate-900/40 p-8 rounded-xl border border-slate-800 shadow-2xl">
                {/* Simulated GitHub Markdown Styling */}
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold border-b border-slate-700 pb-2 mb-6 mt-0" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold border-b border-slate-800 pb-2 mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 mb-4 text-slate-300" {...props} />,
                    li: ({node, ...props}) => <li className="marker:text-slate-500" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-slate-100" {...props} />,
                  }}
                >
                  {markdown}
                </ReactMarkdown>
             </div>
          ) : (
            <div className="relative h-full">
              <div className="absolute top-0 right-0 p-2 bg-slate-800 text-xs rounded-bl-lg text-slate-400 border-l border-b border-slate-700">
                markdown
              </div>
              <pre className="font-mono text-sm text-slate-300 bg-slate-900 p-6 rounded-lg border border-slate-800 h-full overflow-auto whitespace-pre-wrap">
                {markdown}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
