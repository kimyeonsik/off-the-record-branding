import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-neutral/20 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold">Off The Record</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-primary transition-colors">기능</a>
            <a href="#security" className="hover:text-primary transition-colors">보안</a>
            <a href="#pricing" className="hover:text-primary transition-colors">요금제</a>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
            다운로드
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            완벽한 위장,<br />
            <span className="text-primary">완벽한 비밀</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-light mb-8 max-w-3xl mx-auto">
            겉으로는 평범한 메모 앱, 내부에는 강력한 프라이버시 보호 기능을 숨긴 
            진정한 디지털 비밀 요원
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors">
              무료 다운로드
            </button>
            <button className="border border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition-colors">
              데모 보기
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-neutral-dark/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">주요 기능</h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              프라이버시 보호를 위한 다층적 보안 시스템
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background border border-neutral/20 rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">다층적 저장소</h3>
              <p className="text-neutral-light">
                일반 저장소와 비밀 저장소를 분리하여 완벽한 위장 가능
              </p>
            </div>
            
            <div className="bg-background border border-neutral/20 rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-secondary text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">이중 비밀번호</h3>
              <p className="text-neutral-light">
                Fake PIN과 Real PIN으로 진짜 비밀을 완벽하게 보호
              </p>
            </div>
            
            <div className="bg-background border border-neutral/20 rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Kill Switch</h3>
              <p className="text-neutral-light">
                위급 상황에서 모든 민감한 정보를 즉시 삭제
              </p>
            </div>
            
            <div className="bg-background border border-neutral/20 rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">암호화 채팅</h3>
              <p className="text-neutral-light">
                Signal 프로토콜 기반 End-to-End 암호화 대화
              </p>
            </div>
            
            <div className="bg-background border border-neutral/20 rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-secondary text-xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">구독 위장</h3>
              <p className="text-neutral-light">
                프리미엄 기능을 사용하면서도 기본 사용자로 위장
              </p>
            </div>
            
            <div className="bg-background border border-neutral/20 rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">침입 감지</h3>
              <p className="text-neutral-light">
                PIN 오류 시 시도 시간과 영상/음성 기록 (예정)
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
                완벽한 프라이버시 보호
              </h2>
              <p className="text-xl text-neutral-light mb-8">
                단순한 콘텐츠 보호를 넘어, 프라이버시를 원한다는 사실 자체도 보호합니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">서버 무저장</h3>
                    <p className="text-neutral-light">모든 대화와 콘텐츠는 서버에 저장되지 않습니다.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">로컬 암호화</h3>
                    <p className="text-neutral-light">모든 데이터는 디바이스에서 암호화되어 저장됩니다.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">다층적 보안</h3>
                    <p className="text-neutral-light">PIN, 이중 비밀번호, Kill Switch로 다층 보안 제공</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="bg-background rounded-xl p-6 border border-neutral/20">
                <h3 className="text-lg font-semibold mb-4">프라이버시 철학</h3>
                <blockquote className="text-neutral-light italic">
                  "진정한 프라이버시 보호는 콘텐츠 보호를 넘어, 프라이버시를 원한다는 사실 자체도 보호해야 합니다. 
                  마치 비밀 요원의 위장 작전처럼."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-neutral-dark/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">요금제</h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              기본 보안부터 완벽한 위장까지, 필요에 맞는 요금제를 선택하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background border border-neutral/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2">기본</h3>
                <div className="text-4xl font-bold mb-4">무료</div>
                <p className="text-neutral-light">기본적인 프라이버시 보호</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="text-primary">✓</span>
                  <span>일반 메모 및 사진 저장</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary">✓</span>
                  <span>기본 PIN 보호</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-primary">✓</span>
                  <span>비밀 저장소</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-neutral">✗</span>
                  <span className="text-neutral-light">이중 비밀번호</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-neutral">✗</span>
                  <span className="text-neutral-light">Kill Switch</span>
                </li>
              </ul>
              
              <button className="w-full bg-neutral text-white py-3 rounded-full font-semibold hover:bg-neutral-dark transition-colors">
                지금 시작하기
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-8 relative">
              <div className="absolute top-4 right-4 bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold">
                인기
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2">프리미엄</h3>
                <div className="text-4xl font-bold mb-4">₩9,900<span className="text-lg font-normal">/월</span></div>
                <p className="text-white/80">완벽한 위장과 고급 보안</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="text-accent">✓</span>
                  <span>기본 기능 모두 포함</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-accent">✓</span>
                  <span>이중 비밀번호 (Fake/Real PIN)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-accent">✓</span>
                  <span>Kill Switch 기능</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-accent">✓</span>
                  <span>암호화 채팅</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-accent">✓</span>
                  <span>구독 위장 기능</span>
                </li>
              </ul>
              
              <button className="w-full bg-white text-primary py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                프리미엄 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-neutral-dark/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-bold">Off The Record</span>
              </div>
              <p className="text-neutral-light">
                완벽한 위장, 완벽한 비밀.<br />
                디지털 시대의 새로운 프라이버시 패러다임.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">제품</h4>
              <ul className="space-y-2 text-neutral-light">
                <li><a href="#" className="hover:text-primary transition-colors">기능</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">보안</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">요금제</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-neutral-light">
                <li><a href="#" className="hover:text-primary transition-colors">고객센터</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">다운로드</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-2 text-neutral-light hover:text-primary transition-colors">
                  <span>📱</span>
                  <span>iOS App Store</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-neutral-light hover:text-primary transition-colors">
                  <span>🤖</span>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral/20 mt-8 pt-8 text-center text-neutral-light">
            <p>&copy; 2024 Off The Record. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}