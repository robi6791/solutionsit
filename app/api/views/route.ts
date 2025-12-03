import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "views.json");

export async function GET() {
  try {
    let views = 0;

    try {
      const file = await fs.readFile(FILE_PATH, "utf-8");
      const parsed = JSON.parse(file);
      views = typeof parsed.views === "number" ? parsed.views : 0;
    } catch {
      // jeśli pliku nie ma / jest błędny – start od 0
      views = 0;
    }

    const newViews = views + 1;

    await fs.writeFile(
      FILE_PATH,
      JSON.stringify({ views: newViews }, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      { views: newViews },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error updating views counter", error);
    return NextResponse.json({ views: 0, error: "failed" }, { status: 500 });
  }
}
