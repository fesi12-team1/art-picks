import { http, HttpResponse } from 'msw';

/*
  @TODO: 아래는 예시 핸들러입니다. 실제 API 명세에 맞게 수정해주세요.
*/
export const postsHandlers = [
  http.get('http://localhost:4000/posts', () => {
    return HttpResponse.json([
      { id: 1, title: '첫 번째 게시글', body: '내용 1' },
      { id: 2, title: '두 번째 게시글', body: '내용 2' },
    ]);
  }),
];
