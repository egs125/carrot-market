import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if ( req.method === "GET" ) {
    const { id  = '' } = req.query;
    const product = await client.product.findUnique({
      where: { id: +id.toString() },
      include: {
        // user: true
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      }
    })
    res.json({
      ok: true,
      product,
    })
  }
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);