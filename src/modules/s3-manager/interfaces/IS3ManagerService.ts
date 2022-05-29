export const IS3ManagerService = 'IS3ManagerService';

export interface IS3ManagerService {
  listBucketContents(): Promise<string[]>;

  deleteFile(cloudStorageKey: string): Promise<boolean>;

  downloadFile(cloudStorageKey: string): Promise<S3DownloadResponse>;

  uploadFile(file: Express.Multer.File): Promise<S3UploadResponse>;
}

export class S3DownloadResponse {
  filename: string;
  file: Buffer;
  mimeType: string;
}

export class S3UploadResponse {
  constructor(params: S3UploadResponse) {
    Object.assign(this, params);
  }

  /**
   * URL of the uploaded object.
   */
  Location: string;
  /**
   * ETag of the uploaded object.
   */
  ETag: string;
  /**
   * Bucket to which the object was uploaded.
   */
  Bucket: string;
  /**
   * Key to which the object was uploaded.
   */
  Key: string;

  ContentType: string;

  FileExtension: string;
}
