import { v2 as cloudinary } from 'cloudinary';

// Hardcoded Cloudinary credentials for testing
const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxakeehl2',
  api_key: process.env.CLOUDINARY_API_KEY || '487114851951122',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'a-pk5YDYGiVDux0yNH6jHNGRqDA',
};

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.log('✅ Using hardcoded Cloudinary credentials for testing');
}

cloudinary.config(CLOUDINARY_CONFIG);

export const uploadToCloudinary = (fileBuffer, folder = 'healthmate/reports') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        type: 'upload',
        access_mode: 'public',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            resource_type: result.resource_type,
            format: result.format,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw new Error('Failed to delete file');
  }
};

export default cloudinary;
