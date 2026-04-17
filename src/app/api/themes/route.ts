import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/themes — list all presets
export async function GET() {
  try {
    const presets = await db.themePreset.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      presets.map((p) => ({
        id: p.id,
        name: p.name,
        config: JSON.parse(p.config),
        createdAt: p.createdAt,
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to load presets" },
      { status: 500 }
    );
  }
}

// POST /api/themes — save a new preset
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, config } = body;

    if (!name || !config) {
      return NextResponse.json(
        { error: "Name and config are required" },
        { status: 400 }
      );
    }

    const preset = await db.themePreset.create({
      data: {
        name: String(name),
        config: JSON.stringify(config),
      },
    });

    return NextResponse.json({
      id: preset.id,
      name: preset.name,
      config: JSON.parse(preset.config),
      createdAt: preset.createdAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to save preset" },
      { status: 500 }
    );
  }
}

// DELETE /api/themes?id=xxx — delete a preset
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await db.themePreset.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete preset" },
      { status: 500 }
    );
  }
}
