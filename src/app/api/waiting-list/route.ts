import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { featureRequest, hcaptchaToken } = await req.json();

    // hCaptcha 검증
    const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY; // Vercel 환경 변수에서 가져옴

    if (!HCAPTCHA_SECRET_KEY) {
      console.error('HCAPTCHA_SECRET_KEY is not set in environment variables.');
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const verificationResponse = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${HCAPTCHA_SECRET_KEY}&response=${hcaptchaToken}`,
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      console.error('hCaptcha verification failed:', verificationData['error-codes']);
      return NextResponse.json({ message: 'hCaptcha verification failed. Please try again.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase URL or Anon Key is not set in environment variables.');
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 개인 정보 수집 없이 고유 초대 코드 생성
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require('crypto'); // Node.js 내장 모듈
    const inviteCode = crypto.randomUUID(); // UUID 생성

    const newItem = {
      inviteCode, // 고유 초대 코드
      featureRequest: featureRequest || null,
      timestamp: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('exclusive_codes') // Supabase 테이블 이름
      .insert([newItem]);

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return NextResponse.json({ message: 'Failed to save data.' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Exclusive 서비스 코드가 발급되었습니다! 귀하의 고유 코드는 다음과 같습니다:',
      inviteCode: inviteCode, // 초대 코드 반환
      note: '저희는 보안을 위해 개인을 식별할 수 있는 어떠한 정보도 저장하지 않습니다. 따라서 별도의 알림은 보내드리지 않습니다. 발급된 코드를 통해 서비스 진행 상황을 확인해주세요.'
    }, { status: 200 });

  } catch (error) {
    console.error('Error in waiting list API:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}