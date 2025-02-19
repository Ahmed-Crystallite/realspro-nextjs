import { IVideos } from "@/models/Video.model"

export type VideoFormData = Omit<IVideos, "_id">

type FetchOptions<T = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: T
  headers?: Record<string, string>
}

class ApiClient {
  private async fetch<T, U = unknown>(
    endpoint: string,
    options: FetchOptions<U> = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    }

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  }

  async getVideos() {
    return this.fetch<IVideos[]>("/videos")
  }

  async getVideo(id: string) {
    return this.fetch<IVideos>(`/videos/${id}`)
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideos>("/videos", {
      method: "POST",
      body: videoData,
    })
  }
}

export const apiClient = new ApiClient()
