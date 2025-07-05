import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

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

    // hCaptcha 검증 성공 시 데이터 처리
    const filePath = path.join(process.cwd(), 'data', 'waiting-list.json');
    let waitingList = [];

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      waitingList = JSON.parse(fileContent);
    } catch (readError: unknown) {
      if (typeof readError === 'object' && readError !== null && 'code' in readError && readError.code === 'ENOENT') {
        waitingList = [];
      } else {
        console.error('Error reading waiting-list.json:', readError);
        return NextResponse.json({ message: 'Failed to read data file.' }, { status: 500 });
      }
    }

    // 개인 정보 수집 없이 고유 초대 코드 생성
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require('crypto'); // Node.js 내장 모듈
    const inviteCode = crypto.randomUUID(); // UUID 생성

    const newItem = {
      inviteCode, // 고유 초대 코드
      featureRequest: featureRequest || null,
      timestamp: new Date().toISOString(),
    };

    waitingList.push(newItem);

    await fs.writeFile(filePath, JSON.stringify(waitingList, null, 2), 'utf-8');

    return NextResponse.json({ 
      message: 'Successfully added to waiting list! Your exclusive invite code is:',
      inviteCode: inviteCode // 초대 코드 반환
    }, { status: 200 });

  } catch (error) {
    console.error('Error in waiting list API:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}