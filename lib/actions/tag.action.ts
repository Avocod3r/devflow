"use server";

import { connectToDatabase } from "@/lib/mongoose";
import {
  GetAllTagsParams,
  GetTopInteractedTagsParams,
} from "@/lib/actions/shared.types";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

export async function getTopInteractedTags(
  params: GetTopInteractedTagsParams
) {
  try {
    connectToDatabase();

    const { userId /* limit = 3 */ } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    // TODO:
    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    // const { page = 1, filter, pageSize = 20, searchQuery } = params;

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return { popularTags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
