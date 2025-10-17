'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function RequestsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  
  // Detecta tipo de serviço pela query string
  const [tipoServico, setTipoServico] = useState('trilha');
  const [valorServico, setValorServico] = useState('R$ 49,99');
  
  useEffect(() => {
    const tipo = searchParams.get('tipo');
    if (tipo === 'branding') {
      setTipoServico('branding');
      setValorServico('R$ 100,00');
    } else {
      setTipoServico('trilha');
      setValorServico('R$ 49,99');
    }
  }, [searchParams]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [contact, setContact] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState('24h');
  const [projectType, setProjectType] = useState('');
  const [status, setStatus] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth?mode=login');
      return;
    }

    const request = {
      id: Date.now(),
      user: user.email,
      title,
      description,
      mood,
      contact,
      duration,
      budget: '79.99',
      deadline: '24h',
      projectType,
      createdAt: new Date().toISOString(),
    };

    setCurrentRequest(request);
    setShowPaymentModal(true);
  };

  const handlePayment = (method) => {
    // Simula processo de pagamento
    const existing = JSON.parse(localStorage.getItem('track_requests') || '[]');
    const paidRequest = { ...currentRequest, paymentMethod: method, status: 'paid' };
    existing.push(paidRequest);
    localStorage.setItem('track_requests', JSON.stringify(existing));

    setShowPaymentModal(false);
    setStatus('submitted');
    
    // Reset form
    setTitle('');
    setDescription('');
    setMood('');
    setContact('');
    setDuration('');
    setProjectType('');
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50"></div>
      
      <div className="relative z-10 py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                Solicite Sua Trilha Personalizada
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforme sua visão em realidade sonora. Nossa equipe especializada criará uma trilha única 
              que eleva seu projeto a outro nível.
            </p>
            {/* Voltar ao Início */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="inline-flex items-center px-5 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 font-medium rounded-lg transition-all duration-300"
              >
                ← Voltar ao Início
              </button>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-bold text-white mb-2">1. Briefing Detalhado</h3>
              <p className="text-gray-400 text-sm">Conte sua visão, objetivos e referências para entendermos exatamente o que você precisa.</p>
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-bold text-white mb-2">2. Criação Profissional</h3>
              <p className="text-gray-400 text-sm">Nossa equipe combina IA avançada com expertise humana para criar sua trilha única.</p>
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-bold text-white mb-2">3. Entrega Completa</h3>
              <p className="text-gray-400 text-sm">Receba sua trilha em múltiplos formatos com licença comercial completa.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Formulário de Solicitação</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título do Projeto *</label>
                      <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Nome do seu projeto ou empresa"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Projeto *</label>
                      <select 
                        value={projectType} 
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="podcast">Podcast/Programa</option>
                        <option value="video">Vídeo/YouTube</option>
                        <option value="marca">Identidade de Marca</option>
                        <option value="evento">Evento/Apresentação</option>
                        <option value="jogo">Jogo/App</option>
                        <option value="comercial">Comercial/Publicidade</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Descrição Detalhada *</label>
                    <textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Descreva seu projeto, público-alvo, objetivos, referências musicais, e qualquer detalhe importante..."
                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Mood/Atmosfera *</label>
                      <input 
                        value={mood} 
                        onChange={(e) => setMood(e.target.value)} 
                        placeholder="Ex: Épico, melancólico, energético, minimalista"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Duração Desejada</label>
                      <select 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      >
                        <option value="">Selecione a duração</option>
                        <option value="15s">15 segundos</option>
                        <option value="30s">30 segundos</option>
                        <option value="60s">1 minuto</option>
                        <option value="2-3min">2-3 minutos</option>
                        <option value="loop">Loop contínuo</option>
                        <option value="customizada">Duração customizada</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prazo de Entrega</label>
                      <div className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white">
                        Até 24 horas
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Valor do Serviço</label>
                      <div className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white flex items-center justify-between">
                        <span>{tipoServico === 'branding' ? 'Audio Branding' : 'Trilha Personalizada (24h)'}</span>
                        <span className="text-2xl font-bold text-green-400">{valorServico}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contato para Retorno *</label>
                    <input 
                      value={contact} 
                      onChange={(e) => setContact(e.target.value)} 
                      placeholder="Email, WhatsApp ou Discord"
                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-4 pt-6">
                    <button 
                      type="submit" 
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                    >
                      Enviar Solicitação
                    </button>
                    <button 
                      type="button" 
                      onClick={() => router.push('/dashboard')} 
                      className="px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 font-medium rounded-lg transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  </div>

                  {status === 'submitted' && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                      <p className="text-green-400 font-medium">✅ Solicitação enviada com sucesso!</p>
                      <p className="text-green-300 text-sm mt-1">Retornaremos em até 2 horas. Redirecionando...</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar with Trust Elements */}
            <div className="space-y-6">
              {/* Guarantees */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">🛡️ Nossas Garantias</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">100% Original e Livre de Direitos</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">Revisões Ilimitadas até Aprovação</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">Múltiplos Formatos de Entrega</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">Licença Comercial Completa</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">📊 Nossos Números</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">500+</div>
                    <div className="text-gray-400 text-xs">Trilhas Criadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">98%</div>
                    <div className="text-gray-400 text-xs">Satisfação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">24h</div>
                    <div className="text-gray-400 text-xs">Tempo Médio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">∞</div>
                    <div className="text-gray-400 text-xs">Revisões</div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">💬 Precisa de Ajuda?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Nossa equipe está pronta para esclarecer qualquer dúvida sobre seu projeto.
                </p>
                <button className="w-full px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 rounded-lg transition-all duration-300 text-sm">
                  💬 Conversar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Finalizar Pagamento</h3>
              <p className="text-gray-300">Complete o pagamento para confirmar sua trilha personalizada</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-white mb-3">Resumo do Pedido</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Projeto:</span>
                  <span className="text-white">{currentRequest?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tipo:</span>
                  <span className="text-white">{currentRequest?.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Prazo:</span>
                  <span className="text-white">Até 24 horas</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Total:</span>
                    <span className="text-2xl font-bold text-green-400">R$ 79,99</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <button
                onClick={() => handlePayment('pix')}
                className="w-full p-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span className="text-xl">📱</span>
                <span className="font-medium">Pagar com PIX - R$ 79,99</span>
              </button>

              <button
                onClick={() => handlePayment('card')}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span className="text-xl">💳</span>
                <span className="font-medium">Pagar com Cartão - R$ 79,99</span>
              </button>

              <button
                onClick={() => handlePayment('paypal')}
                className="w-full p-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span className="text-xl">🌐</span>
                <span className="font-medium">Pagar com PayPal - R$ 79,99</span>
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🔒</span>
                <p className="text-green-300 text-xs">Pagamento 100% seguro. Seus dados estão protegidos.</p>
              </div>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-4 px-4 py-2 text-gray-400 hover:text-white transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
