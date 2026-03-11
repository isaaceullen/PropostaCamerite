import React, { useState, useEffect } from 'react';
import { Download, FileText, Settings, Loader2, Calendar, MapPin, Clock, Users, Trash2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import ItemTable from './components/ItemTable';
import { ProposalItem, ColorSettings, ProposalSettings } from './types';
import { INITIAL_ITEMS } from './constants';
import { generateProposalPDF } from './services/pdfService';

const App: React.FC = () => {
  const [items, setItems] = useState<ProposalItem[]>(() => {
    const saved = localStorage.getItem('camerite_items');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [proposalSettings, setProposalSettings] = useState<ProposalSettings>(() => {
    const saved = localStorage.getItem('camerite_settings');
    return saved ? JSON.parse(saved) : {
      validityDays: 60,
      proposalDate: new Date().toISOString().split('T')[0],
      city: 'Joinville',
      population: 0,
      recipientName: '',
      cnpj: '',
      address: ''
    };
  });
  
  const colors: ColorSettings = {
    headerFooterBg: '#3E2475',
    tableText: '#3E2475'
  };

  useEffect(() => {
    localStorage.setItem('camerite_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('camerite_settings', JSON.stringify(proposalSettings));
  }, [proposalSettings]);

  const handleUpdateItem = (id: number, field: 'quantity' | 'unitPrice', value: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleResetData = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os dados preenchidos? Isso resetará as quantidades e configurações.")) {
      setItems(JSON.parse(JSON.stringify(INITIAL_ITEMS)));
      setProposalSettings({
        validityDays: 60,
        proposalDate: new Date().toISOString().split('T')[0],
        city: 'Joinville',
        population: 0,
        recipientName: '',
        cnpj: '',
        address: ''
      });
      localStorage.removeItem('camerite_items');
      localStorage.removeItem('camerite_settings');
    }
  };

  const handleFileSelect = (file: File) => {
    setPdfFile(file);
  };

  const handleClearFile = () => {
    setPdfFile(null);
  };

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const handleGeneratePDF = async () => {
    if (!pdfFile) {
      alert("Por favor, faça upload do PDF base primeiro.");
      return;
    }

    const hasItems = items.some(i => i.quantity > 0);
    if (!hasItems) {
      alert("Selecione pelo menos um item (Quantidade > 0).");
      return;
    }

    setIsGenerating(true);

    try {
      const fileBuffer = await pdfFile.arrayBuffer();
      const pdfBytes = await generateProposalPDF(fileBuffer, items, colors, proposalSettings);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Proposta_Camerite_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Verifique se o arquivo é válido.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-32">
      <header className="bg-camerite-dark/20 border-b border-camerite-main/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-camerite-main to-camerite-dark rounded-lg flex items-center justify-center shadow-lg shadow-camerite-main/20">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Camerite</h1>
              <p className="text-xs text-camerite-main font-medium uppercase tracking-widest">Gerador de Orçamentos</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={handleResetData}
                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 flex items-center gap-2 transition-colors text-sm font-medium"
                title="Limpar todos os dados"
             >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Limpar Dados</span>
             </button>
             <div className="hidden md:flex px-3 py-1.5 bg-camerite-main/10 rounded-lg border border-camerite-main/30 items-center gap-2">
                <Settings className="w-4 h-4 text-camerite-main" />
                <span className="text-xs text-gray-300">v6.2 - Estável</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-6 rounded-full bg-camerite-main flex items-center justify-center text-xs font-bold text-white">1</div>
             <h2 className="text-lg font-semibold text-white">Upload da Proposta Base (PDF)</h2>
          </div>
          <FileUpload 
            onFileSelect={handleFileSelect} 
            selectedFile={pdfFile} 
            onClear={handleClearFile} 
          />
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-6 rounded-full bg-camerite-main flex items-center justify-center text-xs font-bold text-white">2</div>
             <h2 className="text-lg font-semibold text-white">Configurar Itens e Quantidades</h2>
          </div>
          <ItemTable items={items} onUpdateItem={handleUpdateItem} />
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-6 rounded-full bg-camerite-main flex items-center justify-center text-xs font-bold text-white">3</div>
             <h2 className="text-lg font-semibold text-white">Informações da Proposta</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <Clock className="w-4 h-4 text-camerite-main" /> Validade (dias)
                </label>
                <input 
                   type="number"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.validityDays}
                   onChange={(e) => setProposalSettings({...proposalSettings, validityDays: parseInt(e.target.value) || 0})}
                />
             </div>
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <MapPin className="w-4 h-4 text-gray-500" /> Cidade
                </label>
                <input 
                   type="text"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.city}
                   onChange={(e) => setProposalSettings({...proposalSettings, city: e.target.value})}
                />
             </div>
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <Users className="w-4 h-4 text-camerite-main" /> População (Habitantes)
                </label>
                <input 
                   type="number"
                   placeholder="Ex: 50000"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.population || ''}
                   onChange={(e) => setProposalSettings({...proposalSettings, population: parseInt(e.target.value) || 0})}
                />
             </div>
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <Calendar className="w-4 h-4 text-camerite-main" /> Data
                </label>
                <input 
                   type="date"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.proposalDate}
                   onChange={(e) => setProposalSettings({...proposalSettings, proposalDate: e.target.value})}
                />
             </div>
             <div className="space-y-2 lg:col-span-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <Users className="w-4 h-4 text-camerite-main" /> Nome do Destinatário
                </label>
                <input 
                   type="text"
                   placeholder="Ex: Prefeitura Municipal de Joinville"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.recipientName || ''}
                   onChange={(e) => setProposalSettings({...proposalSettings, recipientName: e.target.value})}
                />
             </div>
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <FileText className="w-4 h-4 text-camerite-main" /> CNPJ
                </label>
                <input 
                   type="text"
                   placeholder="00.000.000/0000-00"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.cnpj || ''}
                   onChange={(e) => setProposalSettings({...proposalSettings, cnpj: formatCNPJ(e.target.value)})}
                />
             </div>
             <div className="space-y-2 lg:col-span-1">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <MapPin className="w-4 h-4 text-camerite-main" /> Endereço
                </label>
                <input 
                   type="text"
                   placeholder="Ex: Rua das Palmeiras, 123"
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-camerite-main"
                   value={proposalSettings.address || ''}
                   onChange={(e) => setProposalSettings({...proposalSettings, address: e.target.value})}
                />
             </div>
          </div>
        </section>

      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a]/90 border-t border-gray-800 backdrop-blur-md p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-sm text-gray-400">
              {items.filter(i => i.quantity > 0).length} itens selecionados.
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Camerite Sistemas S/A</div>
          </div>
          <button
            onClick={handleGeneratePDF}
            disabled={!pdfFile || isGenerating}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1
              ${!pdfFile 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-camerite-dark to-camerite-main text-white hover:shadow-camerite-main/40'
              }
            `}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Gerar PDF Final
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
