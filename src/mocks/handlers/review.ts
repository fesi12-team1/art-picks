import { http, HttpResponse } from 'msw';
import { memberships, reviews, users } from '../db';
import { path } from '../utils';

export const reviewHandlers = [
  // 리뷰 삭제
  http.delete(path('/api/reviews'), async ({ request }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = authHeader.replace('Bearer ', '');

    const user = users.findFirst((q) => q.where({ id: Number(userId) }));

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const body = (await request.json()) as {
      reviewId: number;
    };

    const membership = memberships.findFirst((q) =>
      q.where({ user: { id: Number(userId) } })
    );

    if (!membership) {
      return HttpResponse.json(
        { message: 'Membership not found' },
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
        { message: 'Review not found' },
        { status: 404 }
      );
    }

    reviews.delete((q) => q.where({ id: review.id }));

    return HttpResponse.json(
      { message: 'Review deleted successfully' },
      { status: 200 }
    );
  }),
];
