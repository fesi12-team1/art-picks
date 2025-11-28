export function createSessionReview(sessionId: string, body: any) {
  // POST /reviews/:sessionId
  // body: { description, rating, image? }
  // 권한: 세션 참가자만 가능
  // 성공시
  // response: 201 Created
  // body: Review
  // 실패시
  // response: 400 Bad Request | 403 Forbidden
  // body: { error.message: "<에러 메시지>" }
}

export function getReviewsByCrewId(crewId: string) {
  // GET /reviews/:crewId
  // 성공시
  // response: 200 OK
  // body: Review[]
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function getReviewsBySessionId(sessionId: string) {
  // GET /reviews/:sessionId
  // 성공시
  // response: 200 OK
  // body: Review[]
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function getReviewsByUserId(userId: string) {
  // GET /reviews/:userId
  // 성공시
  // response: 200 OK
  // body: Review[]
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}
