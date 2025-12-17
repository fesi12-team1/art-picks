'use client';

import { use, useEffect, useState } from 'react';
import { getPresignedUrl, uploadToPresignedUrl } from '@/api/fetch/image';
import ReviewImagesUploader from '@/components/ui/ImageUploader/ReviewImageUploader';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [presignedUrl, setPresignedUrl] = useState<string | null>('null');
  const [publicImageUrl, setPublicImageUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    console.log(presignedUrl, publicImageUrl);
  }, [presignedUrl, publicImageUrl]);

  return (
    <main className="h-main flex items-center justify-center">
      <p className="text-title1-semibold bg-brand-500 tablet:bg-brand-600 laptop:bg-brand-700 desktop:bg-gray-200 p-5">
        Hello, world!
      </p>
      <div>
        <ReviewImagesUploader
          onChange={(file) => {
            setFile(file);
          }}
        />
        <button
          onClick={async () => {
            if (!file) return;
            const res = await getPresignedUrl({
              imageName: file.name,
            });
            setPresignedUrl(res.presignedUrl);
            setPublicImageUrl(res.imageUrl);
          }}
          className="bg-brand-50 p-4 text-black"
        >
          클릭
        </button>
        <button
          onClick={async () => {
            const res = await uploadToPresignedUrl({
              uploadUrl: presignedUrl as string,
              file: file as File,
            });
            console.log(res);
          }}
        >
          업로드~~~~~~
        </button>
      </div>
    </main>
  );
}
