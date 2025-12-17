import { SuccessResponse } from '@/types';

export type getPresignedUrlRequest = {
  imageName: string; // ex) 'cover.png', 'review.jpg'
};

export type getPresignedUrlResponse = {
  presignedUrl: string; // PUT 요청을 통해 이미지를 업로드할 주소
  imageUrl: string; // 이미지 업로드 이후 이미지 사용을 위한 public URL
};

export async function getPresignedUrl(body: getPresignedUrlRequest) {
  const response = await fetch(
    `https://run-fit.store/api/images/presigned-url`,
    {
      method: 'POST',
      // auth 헤더 붙여줘야 함.
      headers: {
        'Content-Type': 'application/json',
        'Authorization':
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJSdW4tRml0Iiwic3ViIjoiNyIsInRva2VuVHlwZSI6ImFjY2VzcyIsInVzZXJuYW1lIjoi7YWM7Iqk7Yq4Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NjU5ODg0MTQsImV4cCI6MTc2NTk5MjAxNH0.NaBgzKTh2cuf7ExeJKsNsK4rKq5ZXkj7CI1mRY_1RA0',
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<getPresignedUrlResponse> =
    await response.json();
  return data;
}

type UploadToPresignedUrlParams = {
  uploadUrl: string;
  file: File | Blob;
  contentType?: string;
};

export async function uploadToPresignedUrl({
  uploadUrl,
  file,
  contentType,
}: UploadToPresignedUrlParams) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      // auth 헤더를 붙이면 안 됨.
      'Content-Type':
        contentType ??
        (file instanceof File ? file.type : 'application/octet-stream'),
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  const etag = response.headers.get('ETag');
  const data = await response.text(); // S3는 빈 응답 바디를 반환함
  const body = await response.body?.getReader().read(); // 스트리밍 소비

  return { etag, data, body };
}
