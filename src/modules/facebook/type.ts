export type PostPhotoParam = {
  url: string;
  caption: string;
  published?: boolean;
  scheduled_publish_time?: number;
  unpublished_content_type?: UnpublishedContentType;
  temporary?: boolean;
};

export const enum UnpublishedContentType {
  SCHEDULED,
  SCHEDULED_RECURRING,
  DRAFT,
  ADS_POST,
  INLINE_CREATED,
  PUBLISHED,
  REVIEWABLE_BRANDED_CONTENT,
}
