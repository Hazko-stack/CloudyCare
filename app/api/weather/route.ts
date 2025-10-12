import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adm4 = searchParams.get('adm4');

  if (!adm4) {
    return NextResponse.json(
      { error: 'Parameter adm4 (kode wilayah) diperlukan' },
      { status: 400 }
    );
  }

  const codePattern = /^\d{2}\.\d{2}\.\d{2}\.\d{4}$/;
  if (!codePattern.test(adm4)) {
    return NextResponse.json(
      { error: 'Format kode wilayah tidak valid. Contoh: 31.71.03.1001' },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching weather data for region: ${adm4}`);
    
    const response = await fetch(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
          'Cache-Control': 'no-cache',
        },
        next: { revalidate: 1800 }
      }
    );

    console.log(`BMKG API Response Status: ${response.status}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Kode wilayah tidak ditemukan' },
          { status: 404 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: 'Terlalu banyak permintaan. Silakan tunggu sebentar.' },
          { status: 429 }
        );
      } else if (response.status >= 500) {
        return NextResponse.json(
          { error: 'Server BMKG sedang bermasalah. Silakan coba lagi nanti.' },
          { status: 502 }
        );
      }
      
      const errorText = await response.text();
      console.error(`BMKG API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched weather data');

    if (!data || !data.data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: 'Format data tidak valid dari BMKG' },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'public, max-age=1800'); // Cache for 30 minutes
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    let errorMessage = 'Gagal mengambil data cuaca dari BMKG';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Tidak dapat terhubung ke server BMKG';
        statusCode = 503;
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Timeout saat mengambil data dari BMKG';
        statusCode = 504;
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error?.toString() : undefined
      },
      { status: statusCode }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}