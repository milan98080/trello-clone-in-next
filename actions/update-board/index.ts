"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ENTITY_TYPE, ACTION } from "@prisma/client";

import { createAuditLog } from "@/lib/create-audit-log";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });

  } catch (error) {
    return {
      error: "Failed to Update",
    };
  }

  revalidatePath(`/board/${id}`);
  return {
    data: board,
  };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
