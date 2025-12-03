import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server"; // ✅ Use server-side auth

const f = createUploadthing();

// ✅ Fixed auth helper
const handleAuth = async () => {
    const session = await auth();
    const userId = session.userId;
    
    if (!userId) throw new Error("Unauthorized");
    
    return { userId };
};

// FileRouter for your app
export const ourFileRouter = {
    // Course image upload
    courseImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
    .middleware(async () => {
        return await handleAuth();
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("Course image uploaded by:", metadata.userId);
        console.log("File URL:", file.ufsUrl);
        return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),

    // Course attachments (PDFs, docs, etc.)
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(async () => {
            return await handleAuth();
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Attachment uploaded by:", metadata.userId);
            console.log("File URL:", file.ufsUrl);
            return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
        }),

    // Chapter videos
    chapterVideo: f({
        video: {
            maxFileCount: 1,
            maxFileSize: "1GB",
        },
    })
    .middleware(async () => {
        return await handleAuth();
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("Chapter video uploaded by:", metadata.userId);
        console.log("File URL:", file.ufsUrl);
        return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;