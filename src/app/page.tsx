"use client";

import { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha'; // hCaptcha 임포트

export default function Home() {
  const [featureRequest, setFeatureRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null); // hCaptcha 토큰 상태

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    if (!hcaptchaToken) {
      setMessage('Please complete the hCaptcha verification.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featureRequest, hcaptchaToken }), // hCaptcha 토큰 전송
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsSuccess(true);
        setFeatureRequest('');
        setHcaptchaToken(null); // 토큰 초기화
      } else {
        setMessage(data.message || 'Something went wrong.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage('Failed to connect to the server.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-lg shadow-sm border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold">Off The Record</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-primary transition-colors">기능</a>
            <a href="#security" className="hover:text-primary transition-colors">보안</a>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-darker transition-colors">
            대기자 명단 가입
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            당신의 프라이버시,<br />
            <span className="text-primary">우리가 지켜드립니다.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 mb-8 max-w-3xl mx-auto">
            디지털 시대, 당신의 소중한 비밀이 안전한가요? <br />
            Off The Record는 당신의 프라이버시를 위한 새로운 패러다임을 제시합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-primary-darker transition-colors">
              대기자 명단 가입하기
            </button>
            <button className="border border-primary text-primary px-10 py-5 rounded-lg text-lg font-semibold hover:bg-primary-dark hover:text-white transition-colors">
              자세히 알아보기
            </button>
          </div>
        </div>
      </section> {/* End of Hero Section */}

      {/* Privacy Breach Cases Section */}
      <section className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">당신의 프라이버시, 안전한가요?</h2>
          <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto">
            디지털 시대, 우리는 알게 모르게 수많은 프라이버시 침해 위험에 노출되어 있습니다.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">📱 스마트폰 공유의 함정</h3>
              <p className="text-neutral-500">
                가족이나 친구와 스마트폰을 공유하다가, 의도치 않게 개인적인 메시지나 사진이 노출된 경험이 있으신가요?
              </p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">💬 민감한 대화 기록</h3>
              <p className="text-neutral-500">
                건강, 재정, 가족 문제 등 민감한 대화 내용이 앱에 기록되어 불안했던 적은 없으신가요?
              </p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">💡 사업 아이디어 유출</h3>
              <p className="text-neutral-500">
                중요한 사업 아이디어나 기밀 정보가 디지털 공간에서 안전하게 보호되고 있다고 확신하시나요?
              </p>
            </div>
          </div>
          <p className="text-lg text-neutral-500 mt-12 max-w-3xl mx-auto">
            Off The Record는 이러한 문제들로부터 당신의 소중한 프라이버시를 지키기 위해 탄생했습니다.
            우리는 당신의 비밀이 안전하게 유지될 수 있도록 돕고 싶습니다.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">프라이버시를 위한 핵심 기능</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Off The Record는 당신의 디지털 생활을 안전하게 보호하기 위한 강력한 도구들을 제공합니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">다층적 저장소 시스템</h3>
              <p className="text-neutral-500">
                일반 메모와 비밀 메모를 분리하여, 겉으로는 평범한 메모 앱처럼 보입니다.
              </p>
            </div>
            
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-secondary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-secondary text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">다층적 보안 시스템</h3>
              <p className="text-neutral-500">
                기본 PIN부터 이중 비밀번호, Kill Switch까지, 당신의 비밀을 완벽하게 보호합니다.
              </p>
            </div>
            
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-accent-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">암호화 채팅 (예정)</h3>
              <p className="text-neutral-500">
                Signal 프로토콜 기반의 End-to-End 암호화로 안전한 대화를 지원합니다.
              </p>
            </div>
            
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">구독 위장 시스템 (예정)</h3>
              <p className="text-neutral-500">
                프리미엄 기능을 사용하면서도 기본 사용자처럼 위장하여 의심을 피합니다. 혹은 광고를 유지하여 구독중임을 숨깁니다.
              </p>
            </div>
            
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-secondary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-secondary text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">침입 감지 (예정)</h3>
              <p className="text-neutral-500">
                PIN 오류 시 시도 시간과 영상/음성을 기록하여 무단 접근을 감지합니다.
              </p>
            </div>
            
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-accent-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">서버 무저장 원칙</h3>
              <p className="text-neutral-500">
                모든 대화와 콘텐츠는 서버에 저장되지 않고, 오직 당신의 기기에만 안전하게 보관됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                우리의 약속: 진정한 프라이버시 보호
              </h2>
              <p className="text-xl text-neutral-500 mb-8">
                Off The Record는 단순한 콘텐츠 보호를 넘어, 프라이버시를 원한다는 사실 자체도 보호합니다.
                당신의 디지털 생활을 안전하게 지키기 위한 우리의 핵심 원칙입니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">서버 무저장 원칙 (Zero-Knowledge)</h3>
                    <p className="text-neutral-500">
                      모든 대화와 콘텐츠는 서버에 저장되지 않습니다. 오직 당신의 기기에만 안전하게 보관되며,
                      설령 서버가 해킹당해도 당신의 비밀은 노출되지 않습니다.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">강력한 클라이언트 측 암호화</h3>
                    <p className="text-neutral-500">
                      당신의 모든 데이터는 기기 내에서 AES-256-CBC와 같은 최신 암호화 기술로 즉시 암호화됩니다.
                      PIN은 암호화 키를 파생시키는 데 사용될 뿐, 절대 저장되지 않으며, 키 또한 메모리에서 안전하게 관리됩니다.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">다층적 보안 시스템 & 메모리 보호</h3>
                    <p className="text-neutral-500">
                      기본 PIN, 이중 비밀번호, 그리고 위급 상황을 위한 Kill Switch까지.
                      민감한 암호화 키는 앱이 실행되는 동안에도 메모리에서 안전하게 보호되며, 사용 후 즉시 삭제됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-light/10 to-secondary-light/10 rounded-2xl p-8">
              <div className="bg-neutral-50 rounded-xl p-8 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Off The Record의 철학</h3>
                <blockquote className="text-neutral-500 italic">
                  {""우리는 프라이버시가 불신의 신호가 아닌, 건강한 개인 공간의 표현이라고 믿습니다. Off The Record는 단순한 앱이 아닌, 디지털 시대의 새로운 프라이버시 패러다임을 제시합니다. 완벽한 위장, 다층적 보안, 그리고 긴급 상황 대비까지 - 당신의 비밀은 그 어느 때보다 안전합니다.""}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us / Waiting List Section */}
      <section id="join-us" className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">함께 만들어가요, 당신의 프라이버시 앱을!</h2>
          <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
            Off The Record는 현재 개발 중입니다. 당신의 소중한 의견과 참여가 더 나은 앱을 만듭니다.
          </p>
          
          <div className="max-w-2xl mx-auto bg-background border border-neutral-200 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">대기자 명단에 참여하고 독점 혜택을 받으세요!</h3>
            <p className="text-neutral-500 mb-6">
              대기자 명단에 가입하시면 앱 출시 시 가장 먼저 소식을 받고,
              초기 사용자만을 위한 특별한 혜택과 초대로만 운영될 Exclusive 서비스에 접근할 수 있는 초대를 받게 됩니다.
            </p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <textarea 
                placeholder="Off The Record에 추가되었으면 하는 기능이 있다면 알려주세요! (선택 사항)" 
                rows={4} 
                className="w-full px-5 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light resize-none"
                value={featureRequest}
                onChange={(e) => setFeatureRequest(e.target.value)}
              ></textarea>
              <div className="flex justify-center">
                <HCaptcha
                  sitekey="b15c0c38-932c-461c-a73a-d14492fec236"
                  onVerify={(token) => setHcaptchaToken(token)}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-darker transition-colors"
                disabled={loading}
              >
                {loading ? '전송 중...' : '대기자 명단 가입하기'}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <p className="text-sm text-neutral-500 mt-4">
              * 귀하의 정보는 서비스 출시 알림 및 기능 개선을 위해서만 사용됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-neutral-800 text-neutral-200">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-bold">Off The Record</span>
              </div>
              <p className="text-neutral-500">
                완벽한 위장, 완벽한 비밀.<br />
                디지털 시대의 새로운 프라이버시 패러다임.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">제품</h4>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="#" className="hover:text-primary-light transition-colors">기능</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">보안</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="#" className="hover:text-primary-light transition-colors">고객센터</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">다운로드</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-2 text-neutral-500 hover:text-primary-light transition-colors">
                  <span>📱</span>
                  <span>iOS App Store</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-neutral-500 hover:text-primary-light transition-colors">
                  <span>🤖</span>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 mt-8 pt-8 text-center text-neutral-500">
            <p>&copy; 2024 Off The Record. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}