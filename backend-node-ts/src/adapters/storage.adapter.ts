/**
 * Storage Adapter - Cloud storage integration
 * Implements Adapter Pattern for file storage
 */

export interface StorageProvider {
  upload(file: Buffer, filename: string, options?: UploadOptions): Promise<UploadResult>;
  download(fileId: string): Promise<Buffer>;
  delete(fileId: string): Promise<boolean>;
  getUrl(fileId: string, expiresIn?: number): Promise<string>;
}

export interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, any>;
  isPublic?: boolean;
}

export interface UploadResult {
  fileId: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

/**
 * AWS S3 Storage Adapter
 */
export class S3Adapter implements StorageProvider {
  private bucket: string;
  private region: string;

  constructor(bucket: string, region: string) {
    this.bucket = bucket;
    this.region = region;
  }

  async upload(file: Buffer, filename: string, options?: UploadOptions): Promise<UploadResult> {
    console.log(`Uploading to S3: ${filename} (${file.length} bytes)`);
    
    return {
      fileId: `s3_${Date.now()}_${filename}`,
      url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${filename}`,
      size: file.length,
      uploadedAt: new Date(),
    };
  }

  async download(fileId: string): Promise<Buffer> {
    console.log(`Downloading from S3: ${fileId}`);
    return Buffer.from('file content');
  }

  async delete(fileId: string): Promise<boolean> {
    console.log(`Deleting from S3: ${fileId}`);
    return true;
  }

  async getUrl(fileId: string, expiresIn: number = 3600): Promise<string> {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileId}?expires=${expiresIn}`;
  }
}

/**
 * Azure Blob Storage Adapter
 */
export class AzureBlobAdapter implements StorageProvider {
  private containerName: string;
  private accountName: string;

  constructor(containerName: string, accountName: string) {
    this.containerName = containerName;
    this.accountName = accountName;
  }

  async upload(file: Buffer, filename: string, options?: UploadOptions): Promise<UploadResult> {
    console.log(`Uploading to Azure Blob: ${filename} (${file.length} bytes)`);
    
    return {
      fileId: `azure_${Date.now()}_${filename}`,
      url: `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${filename}`,
      size: file.length,
      uploadedAt: new Date(),
    };
  }

  async download(fileId: string): Promise<Buffer> {
    console.log(`Downloading from Azure Blob: ${fileId}`);
    return Buffer.from('file content');
  }

  async delete(fileId: string): Promise<boolean> {
    console.log(`Deleting from Azure Blob: ${fileId}`);
    return true;
  }

  async getUrl(fileId: string, expiresIn: number = 3600): Promise<string> {
    return `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${fileId}`;
  }
}

/**
 * Storage Adapter Factory
 */
export class StorageAdapterFactory {
  static create(provider: 's3' | 'azure', config: any): StorageProvider {
    switch (provider) {
      case 's3':
        return new S3Adapter(config.bucket, config.region);
      case 'azure':
        return new AzureBlobAdapter(config.containerName, config.accountName);
      default:
        throw new Error(`Unknown storage provider: ${provider}`);
    }
  }
}
