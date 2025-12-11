import { http, HttpResponse } from 'msw';
import { memberships, reviews, users } from '../db';
import {
  errorResponse,
  getAuthenticatedUser,
  path,
  successResponse,
} from '../utils';

export const reviewHandlers = [
  // 리뷰 삭제
  http.delete(path('/api/reviews'), async ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      reviewId: number;
    };

    const membership = memberships.findFirst((q) =>
      q.where({ userId: Number(user.id) })
    );

    if (!membership) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Membership not found' }),
        { status: 404 }
      );
    }

    const review = reviews.findFirst((q) =>
      q.where({
        id: body.reviewId,
      })
    );

    if (!review) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Review not found' }),
        { status: 404 }
      );
    }

    reviews.delete((q) => q.where({ id: review.id }));

    const data = {
      message: '리뷰가 삭제되었습니다.',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),
];
