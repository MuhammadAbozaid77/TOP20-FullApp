import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body; // base64 image

    const result = await cloudinary.uploader.upload(image, {
      folder: "users_profile",
    });

    // نرجع كل الحاجات المهمة
    return Response.json({
      success: true,
      url: result.url,
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}

// await cloudinary.uploader.destroy(public_id);
