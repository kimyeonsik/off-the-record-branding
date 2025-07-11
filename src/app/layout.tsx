import './globals.css';
import I18nProvider from '../i18nProvider';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}