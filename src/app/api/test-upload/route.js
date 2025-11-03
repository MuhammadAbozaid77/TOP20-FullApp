import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body; // base64 image
    const result = await cloudinary.uploader.upload(image, {
      folder: "users_profile",
    });

    return Response.json({ success: true, url: result.secure_url });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
