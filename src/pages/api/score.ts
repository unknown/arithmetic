// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

type Data = {
  message?: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return await createScore(req, res);
  }
  res.status(405).json({ message: "Method not allowed", success: false });
}

async function createScore(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body;
  try {
    const newEntry = await prisma.score.create({
      data: {
        score: body.score,
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error creating score", success: false });
  }
}
