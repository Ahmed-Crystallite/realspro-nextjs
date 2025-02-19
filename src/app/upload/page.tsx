"use client"

import VideoUploadForm from "@/components/VideoUploadForm"

export default function VideoUploadPage() {
  return (
    <div className="max-w-md mx-auto my-[60px] bg-secondary-content py-[20px] rounded-md px-5">
        <h1 className="text-4xl leading-tight font-bold mb-10">Upload New Reel</h1>
        <VideoUploadForm />
    </div>
  )
}
