import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, featureRequest } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', 'waiting-list.json');
    let waitingList = [];

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      waitingList = JSON.parse(fileContent);
    } catch (readError: any) {
      if (readError.code === 'ENOENT') {
        // File does not exist, will be created
        waitingList = [];
      } else {
        console.error('Error reading waiting-list.json:', readError);
        return NextResponse.json({ message: 'Failed to read data file.' }, { status: 500 });
      }
    }

    const newItem = {
      email,
      featureRequest: featureRequest || null,
      timestamp: new Date().toISOString(),
    };

    waitingList.push(newItem);

    await fs.writeFile(filePath, JSON.stringify(waitingList, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Successfully added to waiting list!' }, { status: 200 });

  } catch (error) {
    console.error('Error in waiting list API:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}