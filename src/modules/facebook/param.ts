import type { PostPhotoParam } from "./type";

export const meParams = {
  fields: ["fan_count", "followers_count", "link", "name", "id", "username"],
};

export const feedsParams = {
  field: [
    "id",
    "attachments{description, media, media_type, type}",
    "created_time",
    "is_popular",
    "is_published",
    "permalink_url",
    "sheduled_publish_time",
  ],
};

export const photoParams = {
  fields: ["id", "link", "name", "created_time"],
};

export const postPhotoParams = (params: PostPhotoParam) => {
  const caption = `${params.caption}\nCre: ${params.creator || "Internet"}\n———————————\n#vtmeyes`;

  if (params.published) {
    return {
      url: params.url,
      caption: caption,
      published: params.published,
      scheduled_publish_time: params.scheduled_publish_time,
      unpublished_content_type: params.unpublished_content_type,
    };
  }

  return {
    url: params.url,
    caption: caption,
  };
};
