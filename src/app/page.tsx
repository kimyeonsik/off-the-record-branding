'use client';

import { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation();
  const [featureRequest, setFeatureRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    if (!hcaptchaToken) {
      setMessage(t('JoinUs.hcaptcha_missing'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featureRequest, hcaptchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          t('JoinUs.success_message', { message: data.message, inviteCode: data.inviteCode, note: data.note })
        );
        setIsSuccess(true);
        setFeatureRequest('');
        setHcaptchaToken(null);
      } else {
        setMessage(t('JoinUs.error_message', { message: data.message }) || t('JoinUs.generic_error'));
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage(t('JoinUs.connection_error'));
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-lg shadow-sm border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold">Off The Record</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-primary transition-colors">{t('Navigation.features')}</a>
            <a href="#security" className="hover:text-primary transition-colors">{t('Navigation.security')}</a>
            <LanguageSwitcher />
          </div>
          <a href="#join-us" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-darker transition-colors">
            {t('Navigation.earlyAccess')}
          </a>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: t('Hero.title') }} />
          <p className="text-lg md:text-xl text-neutral-500 mb-8 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t('Hero.subtitle') }} />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#join-us" className="bg-primary text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-primary-darker transition-colors">
              {t('Hero.ctaPrimary')}
            </a>
            <button className="border border-primary text-primary px-10 py-5 rounded-lg text-lg font-semibold hover:bg-primary-dark hover:text-white transition-colors"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('Hero.ctaSecondary')}
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t('PrivacyBreach.title')}</h2>
          <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto">{t('PrivacyBreach.subtitle')}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t('PrivacyBreach.case1_title')}</h3>
              <p className="text-neutral-500">
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case1_situation') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case1_action') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case1_resolution') }} />
              </p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t('PrivacyBreach.case2_title')}</h3>
              <p className="text-neutral-500">
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case2_situation') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case2_action') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case2_resolution') }} />
              </p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t('PrivacyBreach.case3_title')}</h3>
              <p className="text-neutral-500">
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case3_situation') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case3_action') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case3_resolution') }} />
              </p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{t('PrivacyBreach.case4_title')}</h3>
              <p className="text-neutral-500">
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case4_situation') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case4_action') }} /><br />
                <span dangerouslySetInnerHTML={{ __html: t('PrivacyBreach.case4_resolution') }} />
              </p>
            </div>
          </div>
          <p className="text-lg text-neutral-500 mt-12 max-w-3xl mx-auto">{t('PrivacyBreach.conclusion')}</p>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('Features.title')}</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">{t('Features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('Features.feature1_title')}</h3>
              <p className="text-neutral-500">{t('Features.feature1_description')}</p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-secondary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-secondary text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('Features.feature2_title')}</h3>
              <p className="text-neutral-500">{t('Features.feature2_description')}</p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-accent-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('Features.feature3_title')}</h3>
              <p className="text-neutral-500">{t('Features.feature3_description')}</p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('Features.feature4_title')}</h3>
              <p className="text-neutral-500">{t('Features.feature4_description')}</p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-secondary-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-secondary text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('Features.feature5_title')}</h3>
              <p className="text-neutral-500">{t('Features.feature5_description')}</p>
            </div>
            <div className="bg-background border border-neutral-200 rounded-xl p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="w-12 h-12 bg-accent-light/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent text-xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('Features.feature6_title')}</h3>
              <p className="text-neutral-500">{t('Features.feature6_description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t('Security.title')}</h2>
              <p className="text-xl text-neutral-500 mb-8">{t('Security.subtitle')}</p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t('Security.principle1_title')}</h3>
                    <p className="text-neutral-500">{t('Security.principle1_description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t('Security.principle2_title')}</h3>
                    <p className="text-neutral-500">{t('Security.principle2_description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t('Security.principle3_title')}</h3>
                    <p className="text-neutral-500">{t('Security.principle3_description')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/10 to-secondary-light/10 rounded-2xl p-8">
              <div className="bg-neutral-50 rounded-xl p-8 shadow-md">
                <h3 className="text-lg font-semibold mb-4">{t('Security.philosophy_title')}</h3>
                <blockquote className="text-neutral-500 italic">{t('Security.philosophy_quote')}</blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t('Development.title')}</h2>
          <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">{t('Development.subtitle')}</p>
          <div className="w-full bg-neutral-200 rounded-full h-4 mb-4 mx-auto max-w-xl">
            <div className="bg-primary h-4 rounded-full" style={{ width: '63%' }}></div>
          </div>
          <p className="text-lg font-semibold text-primary">{t('Development.progressText')}</p>
        </div>
      </section>

      <section id="join-us" className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t('JoinUs.title')}</h2>
          <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">{t('JoinUs.subtitle')}</p>
          <div className="max-w-2xl mx-auto bg-background border border-neutral-200 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">{t('JoinUs.form_title')}</h3>
            <p className="text-neutral-500 mb-6">{t('JoinUs.form_description')}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">{t('JoinUs.privacy_title')}</h4>
              <p className="text-blue-700 text-sm">{t('JoinUs.privacy_description')}</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('JoinUs.feature_request_label')}</label>
                <p className="text-xs text-neutral-500 mb-2">{t('JoinUs.feature_request_note')}</p>
                <textarea 
                  placeholder={t('JoinUs.feature_request_placeholder')} 
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
                {loading ? t('JoinUs.submit_loading') : t('JoinUs.submit_button')}
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
              <p className="text-neutral-500" dangerouslySetInnerHTML={{ __html: t('Footer.tagline') }} />
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('Footer.product')}</h4>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="#features" className="hover:text-primary-light transition-colors">{t('Navigation.features')}</a></li>
                <li><a href="#security" className="hover:text-primary-light transition-colors">{t('Navigation.security')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('Footer.support')}</h4>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="#" onClick={() => alert('고객센터는 준비 중입니다.')} className="hover:text-primary-light transition-colors">{t('Footer.support_center')}</a></li>
                <li><a href="#" onClick={() => alert('FAQ는 준비 중입니다.')} className="hover:text-primary-light transition-colors">{t('Footer.faq')}</a></li>
                <li><a href="#" onClick={() => alert('개인정보처리방침은 준비 중입니다.')} className="hover:text-primary-light transition-colors">{t('Footer.privacy_policy')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('Footer.downloads')}</h4>
              <div className="space-y-3">
                <a href="#" onClick={() => alert('iOS 앱은 준비 중입니다.')} className="flex items-center space-x-2 text-neutral-500 hover:text-primary-light transition-colors">
                  <span>📱</span>
                  <span>{t('Footer.ios_app')}</span>
                </a>
                <a href="#" onClick={() => alert('Google Play 앱은 준비 중입니다.')} className="flex items-center space-x-2 text-neutral-500 hover:text-primary-light transition-colors">
                  <span>🤖</span>
                  <span>{t('Footer.android_app')}</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-200 mt-8 pt-8 text-center text-neutral-500">
            <p>{t('Footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}