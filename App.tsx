
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import WelcomeTab from './components/WelcomeTab';
import F0ZMathTab from './components/F0ZMathTab';
import AgentSimulationTab from './components/AgentSimulationTab';
import AdvancedConceptsTab from './components/AdvancedConceptsTab';
import GeminiExplanationModal from './components/GeminiExplanationModal';
import { getGeminiExplanation } from './services/geminiService';
import { InfoIcon, BrainIcon, MathIcon, CogIcon, CubeIcon } from './components/Icons';

type TabName = 'Welcome' | 'F0Z Math' | 'Agent Simulation' | 'Advanced Concepts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Welcome');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

  const handleExplainFormula = useCallback(async (title: string, formulaText: string) => {
    setModalTitle(`Explanation: ${title}`);
    setIsModalOpen(true);
    setIsLoadingExplanation(true);
    setExplanation(''); // Clear previous explanation
    
    const fetchedExplanation = await getGeminiExplanation(title, formulaText);
    setExplanation(fetchedExplanation);
    setIsLoadingExplanation(false);
  }, []);

  const tabComponents: Record<TabName, React.ReactNode> = {
    'Welcome': <WelcomeTab />,
    'F0Z Math': <F0ZMathTab onExplainFormula={handleExplainFormula} />,
    'Agent Simulation': <AgentSimulationTab onExplainFormula={handleExplainFormula} />,
    'Advanced Concepts': <AdvancedConceptsTab onExplainFormula={handleExplainFormula} />,
  };
  
  const tabsConfig = [
    { name: 'Welcome', icon: <InfoIcon /> },
    { name: 'F0Z Math', icon: <MathIcon /> },
    { name: 'Agent Simulation', icon: <CogIcon /> },
    { name: 'Advanced Concepts', icon: <CubeIcon /> } // Changed icon to CubeIcon, BrainIcon implies general AI
  ];


  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs 
          tabs={tabsConfig}
          activeTab={activeTab} 
          onTabChange={(tabName) => setActiveTab(tabName as TabName)} 
        />
        <div className="mt-2">
         {tabComponents[activeTab]}
        </div>
      </main>
      <Footer />
      <GeminiExplanationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        explanation={explanation}
        isLoading={isLoadingExplanation}
      />
    </div>
  );
};

export default App;
