'use client';

import { useState } from 'react';
import { ScrollReveal } from './Animations';

const faqs = [
  {
    question: "Como funciona o processo de criação de trilhas?",
    answer: "Nosso processo é simples e eficiente: 1) Você nos conta sua visão e objetivos, 2) Nossa IA gera múltiplas opções baseadas no seu briefing, 3) Nossos produtores humanos refinam e ajustam as melhores opções, 4) Você recebe as trilhas finais em múltiplos formatos com todos os direitos."
  },
  {
    question: "Quanto tempo leva para receber minha trilha?",
    answer: "O prazo padrão é de 24-48h para projetos urgentes, 3-7 dias para projetos normais, e 1-2 semanas para projetos flexíveis. Trilhas mais complexas ou que necessitam de múltiplas revisões podem levar um pouco mais."
  },
  {
    question: "Posso solicitar alterações na trilha?",
    answer: "Sim! Incluímos até 2 rodadas de revisão no preço. Revisões adicionais têm custo extra. Quanto mais detalhado for seu briefing inicial, maior a chance de acertarmos na primeira."
  },
  {
    question: "Em quais formatos recebo a trilha?",
    answer: "Você recebe sua trilha em múltiplos formatos: WAV (qualidade máxima), MP3 (uso geral), versões com e sem fade, stems individuais quando aplicável, e diferentes durações (15s, 30s, 60s, versão completa)."
  },
  {
    question: "Os direitos autorais são inclusos?",
    answer: "Sim! Todas as trilhas são 100% originais e livres de direitos autorais. Você recebe licença comercial completa para usar em qualquer projeto, incluindo fins comerciais, sem necessidade de pagamento de royalties."
  },
  {
    question: "Qual é a diferença entre IA e produção humana?",
    answer: "A IA gera rapidamente múltiplas variações criativas baseadas no seu briefing. Os produtores humanos então refinam, ajustam detalhes técnicos, fazem mixagem profissional e garantem que o resultado final tenha qualidade comercial."
  },
  {
    question: "Vocês criam trilhas para qualquer estilo musical?",
    answer: "Sim! Nosso sistema é treinado em diversos gêneros: eletrônico, orchestral, pop, rock, jazz, ambient, world music, e muito mais. Se você tem uma referência específica, compartilhe conosco."
  },
  {
    question: "Como é calculado o preço?",
    answer: "O preço varia conforme complexidade, prazo, duração e uso pretendido. Temos pacotes desde R$ 297 para trilhas simples até planos empresariais customizados. Consulte nossa página de preços para mais detalhes."
  },
  {
    question: "Posso ouvir exemplos antes de contratar?",
    answer: "Claro! Temos um portfólio extenso com exemplos de diferentes estilos e aplicações. Você também pode solicitar um preview personalizado baseado no seu briefing."
  },
  {
    question: "Atendem projetos internacionais?",
    answer: "Sim! Atendemos clientes no mundo todo. Nossa comunicação é feita em português, inglês e espanhol. Aceitamos pagamentos internacionais via cartão e transferência."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900/20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-base font-medium mb-6">
            ❓ Perguntas Frequentes
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Dúvidas sobre{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              trilhas sonoras?
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Aqui estão as respostas para as perguntas mais comuns sobre nosso processo e serviços.
          </p>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={index * 100}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-purple-400 transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`px-6 pb-6 transition-all duration-300 ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="border-t border-gray-800/50 pt-4">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={500} className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Nossa equipe está pronta para esclarecer qualquer questão específica sobre seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                Falar com especialista
              </button>
              <button className="px-8 py-3 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300">
                Ver mais exemplos
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}