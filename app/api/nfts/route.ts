import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const nfts = await prisma.nft.findMany();
  return NextResponse.json(nfts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const nft = await prisma.nft.create({ data });
  return NextResponse.json(nft, { status: 201 });
}
