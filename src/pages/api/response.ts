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
    return await createResponse(req, res);
  }
  res.status(405).json({ message: "Method not allowed", success: false });
}

async function createResponse(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body;
  try {
    const newEntry = await prisma.response.create({
      data: {
        num1: body.num1,
        num2: body.num2,
        operation: body.operation,
        duration: body.duration,
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ message: "Error creating response", success: false });
  }
}
