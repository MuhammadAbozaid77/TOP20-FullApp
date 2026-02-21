import { IncomingForm } from "formidable";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: { bodyParser: false }, // لازم مع FormData
};

export async function POST(req) {
  const form = new IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      try {
        const file = files.image; // الاسم اللي هيبعت من formData.append
        if (!file) {
          return resolve(
            NextResponse.json(
              { success: false, error: "No file uploaded" },
              { status: 400 }
            )
          );
        }

        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "test_uploads", // أي فولدر تحب
        });

        resolve(
          NextResponse.json({
            success: true,
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
          })
        );
      } catch (uploadErr) {
        resolve(
          NextResponse.json(
            { success: false, error: uploadErr.message },
            { status: 500 }
          )
        );
      }
    });
  });
}
