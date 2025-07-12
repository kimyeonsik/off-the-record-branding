"use client";

import { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

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
        setMessage(
          `${data.message} ${data.inviteCode}\n\n${data.note}`
        );
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
          <a href="#join-us" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-darker transition-colors">
            Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            당신의 폰을<br />
            <span className="text-primary">&lsquo;누가&rsquo; 보고 있나요?</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 mb-8 max-w-3xl mx-auto">
            &ldquo;폰 좀 줘봐.&rdquo; 이 한마디에 심장이 철렁한다면, 당신에게는 <b>Off The Record</b>가 필요합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#join-us" className="bg-primary text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-primary-darker transition-colors">
              Early Access
            </a>
            <button className="border border-primary text-primary px-10 py-5 rounded-lg text-lg font-semibold hover:bg-primary-dark hover:text-white transition-colors"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Breach Cases Section */}
      <section className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">이런 순간, 당신도 있었나요?</h2>
          <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto">
            피할 수 없다면, 완벽하게 숨기세요.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Case 1: 특수 관계인 (애인/배우자) 에 대한 위기 상황 - 가짜 비밀번호 */}
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">🔐 보여줘도 안전한, 두 번째 비밀 공간</h3>
              <p className="text-neutral-500">
                &ldquo;폰 좀 줘봐.&rdquo; 연인이 내가 늘 사용하는 비밀번호를 누르고 핸드폰을 검사하기 시작합니다.<br />
                하지만 그(녀)가 알고 있는 비밀번호는 사실 가짜 비밀번호입니다.<br />
                연인은 평범한 메모만 보고 아무 의심 없이 돌아섭니다. <br />
                당신의 서프라이즈 계획이나 진짜 비밀은 안전하게 지켜집니다.
              </p>
            </div>

            {/* Case 2: 특수 관계인 (애인/배우자) 에 대한 위기 상황 - Kill Switch */}
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">💥 Kill Switch: 궁극의 방어</h3>
              <p className="text-neutral-500">
                연인이 당신의 앱 비밀번호가 가짜라고 의심하며 진짜 비밀번호를 강하게 요구하는 절체절명의 순간입니다.<br />
                전혀 흔들릴 필요가 없습니다.<br />
                어떤 수단을 활용해도 가짜와 진짜 비밀번호를 구분 할 수 없습니다. <br />
                상대는 당신이 프리미엄 기능을 사용한다는 사실조차 확인 할 수 없습니다.
              </p>
            </div>

            {/* Case 3: 특수 관계인 (애인/배우자) 에 대한 위기 상황 - 지긋지긋한 해명 */}
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">😮‍💨 카톡까지 해명해야 하는 연애</h3>
              <p className="text-neutral-500">
                &ldquo;이 시간에 누구야?&rdquo; 직장 동료에게 온 업무 카톡 하나에 분위기가 싸늘해집니다.<br />
                Off The Record의 비밀 대화 기능과 위장 알림 덕분에, 당신은 더 이상 불필요한 오해에 대해 해명할 필요가 없습니다.<br />
                사적인 대화가 노출되지 않아 불필요한 감정 소모와 관계의 갈등을 피할 수 있습니다.
              </p>
            </div>

            {/* Case 4: 친구, 지인, 직장 동료 등에 대한 비밀 노출 - 카플레이 알림 */}
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">🤫 카플레이 알림, 의심을 피하다</h3>
              <p className="text-neutral-500">
                직장 동료와 카풀 중, 카플레이 화면에 비밀 채팅 메시지가 알림으로 뜹니다.<br />
                Off The Record는 이 알림을 &apos;[광고] 오늘까지만 AI 구독 20% 세일&apos;과 같은 평범한 광고 문구로 위장하여 보여줍니다.<br />
                동료는 아무 의심 없이 광고로 인식하고, 당신의 비밀 채팅은 안전하게 보호됩니다.
              </p>
            </div>
          </div>
          <p className="text-lg text-neutral-500 mt-12 max-w-3xl mx-auto">
            Off The Record는 당신의 소중한 프라이버시를 지키기 위해 탄생했습니다. 
            사랑하지만, 사생활은 존중받아야 합니다. Off The Record는 당신의 건강한 개인 공간을 응원합니다.
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
          
          <div className="grid md:grid-cols-2 gap-8">
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
                  &ldquo;우리는 프라이버시가 불신의 신호가 아닌, 건강한 개인 공간의 표현이라고 믿습니다. Off The Record는 단순한 앱이 아닌, 디지털 시대의 새로운 프라이버시 패러다임을 제시합니다. 완벽한 위장, 다층적 보안, 그리고 긴급 상황 대비까지 - 당신의 비밀은 그 어느 때보다 안전합니다.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Progress Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">개발 진척도</h2>
          <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
            Off The Record는 현재 활발히 개발 중입니다. 여러분의 기대를 뛰어넘는 서비스를 위해 최선을 다하고 있습니다.
          </p>
          <div className="w-full bg-neutral-200 rounded-full h-4 mb-4 mx-auto max-w-xl">
            <div className="bg-primary h-4 rounded-full" style={{ width: '63%' }}></div>
          </div>
          <p className="text-lg font-semibold text-primary">63% 완료</p>
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
            <h3 className="text-2xl font-semibold mb-6">Exclusive 서비스 코드를 발급받고 독점 혜택을 받으세요!</h3>
            <p className="text-neutral-500 mb-6">
              Exclusive 서비스 코드를 발급받으시면 앱 출시 후 해당 코드로 인증하여
              초기 사용자만을 위한 특별한 혜택과 초대로만 운영될 Exclusive 서비스에 접근할 수 있습니다.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">🔒 개인정보 보호 원칙</h4>
              <p className="text-blue-700 text-sm">
                프라이버시 앱을 만드는 저희는 이메일 주소나 기타 개인정보를 수집하지 않습니다. 
                개인정보 수집 자체가 프라이버시 침해의 시작이라고 믿기 때문입니다. 
                대신 고유한 서비스 코드를 통해 특별한 혜택을 제공하며, 이는 개인을 식별하지 않는 완전히 익명의 방식입니다.
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  기능 제안 (선택사항)
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  💡 이메일 주소는 수집하지 않습니다. 개인정보 보호가 저희의 핵심 가치이기 때문입니다.
                </p>
                <textarea 
                  placeholder="Off The Record에 추가되었으면 하는 기능이 있다면 알려주세요!" 
                  rows={4} 
                  className="w-full px-5 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light resize-none"
                  value={featureRequest}
                  onChange={(e) => setFeatureRequest(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-center">
                <HCaptcha
                  sitekey="b15c0c38-932c-461c-a73a-d14492fec236"
                  onVerify={(token: string) => setHcaptchaToken(token)}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-darker transition-colors"
                disabled={loading}
              >
                {loading ? '전송 중...' : 'Get Early Access Code'}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            
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
                <li><a href="#features" className="hover:text-primary-light transition-colors">기능</a></li>
                <li><a href="#security" className="hover:text-primary-light transition-colors">보안</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="#" onClick={() => alert('고객센터는 준비 중입니다.')} className="hover:text-primary-light transition-colors">고객센터</a></li>
                <li><a href="#" onClick={() => alert('FAQ는 준비 중입니다.')} className="hover:text-primary-light transition-colors">FAQ</a></li>
                <li><a href="#" onClick={() => alert('개인정보처리방침은 준비 중입니다.')} className="hover:text-primary-light transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">다운로드</h4>
              <div className="space-y-3">
                <a href="#" onClick={() => alert('iOS 앱은 준비 중입니다.')} className="flex items-center space-x-2 text-neutral-500 hover:text-primary-light transition-colors">
                  <span>📱</span>
                  <span>iOS App Store</span>
                </a>
                <a href="#" onClick={() => alert('Google Play 앱은 준비 중입니다.')} className="flex items-center space-x-2 text-neutral-500 hover:text-primary-light transition-colors">
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