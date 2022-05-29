import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as mime from 'mime';
import { InjectAwsService } from 'nest-aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  IS3ManagerService,
  S3DownloadResponse,
  S3UploadResponse,
} from './interfaces';

//////////////////////////////////////////////////////////////////////////

@Injectable()
export class S3ManagerService implements IS3ManagerService {
  /**
   *
   */

  private static _BucketName: string;

  constructor(
    @InjectAwsService(S3) private readonly S3Client: S3,
    private configService: ConfigService,
  ) {}

  private get BucketName(): string {
    if (!S3ManagerService._BucketName) {
      const BucketPath = this.configService.get<string>(
        'RESOURCES_S3_BUCKET_NAME',
      );
      S3ManagerService._BucketName = BucketPath;
    }

    return S3ManagerService._BucketName;
  }

  async listBucketContents(): Promise<string[]> {
    const response = await this.S3Client.listObjectsV2({
      Bucket: this.BucketName,
    }).promise();

    return response.Contents.map((c) => c.Key);
  }

  async deleteFile(cloudStorageKey: string): Promise<boolean> {
    const params: S3.Types.DeleteObjectRequest = {
      Bucket: this.BucketName,
      Key: cloudStorageKey,
    };

    const deleteResponse = await this.S3Client.deleteObject(params).promise();

    return deleteResponse.DeleteMarker;
  }

  async downloadFile(cloudStorageKey: string): Promise<S3DownloadResponse> {
    //
    const params: S3.Types.GetObjectRequest = {
      Bucket: this.BucketName,
      Key: cloudStorageKey,
    };

    console.log({
      Bucket: this.BucketName,
      Key: cloudStorageKey,
    });

    const s3DownloadResponse: S3.Types.GetObjectOutput =
      await this.S3Client.getObject(params).promise();

    const data: S3.Body = s3DownloadResponse.Body;

    const fnam = cloudStorageKey.split('/');
    const filename: string = fnam[fnam.length - 1];

    if (Buffer.isBuffer(data)) {
      return {
        file: data,
        filename: filename,
        mimeType: mime.getType(filename),
      };
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<S3UploadResponse> {
    const filename =
      'resources' +
      '/' +
      new Date().toISOString().split('T')[0] +
      '/' +
      `${uuidv4()}.${mime.getExtension(file.mimetype)}`;

    const params: S3.Types.PutObjectRequest = {
      Bucket: this.BucketName,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResponse: S3.ManagedUpload.SendData =
      await this.S3Client.upload(params).promise();

    const response: S3UploadResponse = {
      ...uploadResponse,
      Key: filename,
      ContentType: file.mimetype,
      FileExtension: mime.getExtension(file.mimetype),
    };

    return new S3UploadResponse(response);
  }
}
