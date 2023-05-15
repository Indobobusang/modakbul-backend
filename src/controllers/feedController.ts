import feedService from "../services/feedService";
import { catchAsync } from "../utils/errorHandler";
import { Request, Response } from "express";
import { deleteImage } from "../utils/imageUploader";

const postFeedByUserId = catchAsync(async (req: Request, res: Response) => {
  const images: any = req.files;

  if (!images) {
    const error = new Error("IMAGE UPLOAD FAILED");
    (error as any).statusCode = 400;
    throw error;
  }
  try {
    const { userId, content } = JSON.parse(req.body.data);
    if (!content) {
      const error = new Error("NO CONTENT!");
      (error as any).statusCode = 400;
      throw error;
    }

    await feedService.postFeedByUserId(userId, images, content);
    return res.status(200).json({ message: "FEED UPLOAD SUCCESS!" });
  } catch (error) {
    for (let i = 0; i < images.length; i++) deleteImage(images[i].key);
  }
});

export default {
  postFeedByUserId,
};