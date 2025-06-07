import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const agents = await prisma.agent.findMany();
  return NextResponse.json(agents);
}

export async function POST(req: Request) {
  const data = await req.json();
  const agent = await prisma.agent.create({ data });
  return NextResponse.json(agent, { status: 201 });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const agent = await prisma.agent.update({ where: { id: data.id }, data });
  return NextResponse.json(agent);
}
