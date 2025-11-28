type UserRequestBody = {
  email: string;
  password: string;
};

// TODO: 실패 시나리오 별 다른 에러 메시지 필요
export function postSignup(body: UserRequestBody & { name: string }) {
  // POST /auth/signup
  // body: { email, password, name }
  // 성공시
  // response: 201 Created
  // body: { id, email, name }
  // 실패시
  // response: 400 Bad Request
  // body: { error.message: "<에러 메시지>" }
}

export function postSignin(body: UserRequestBody) {
  // POST /auth/signin
  // body: { email, password }
  // 성공시
  // response: 200 OK
  // 실패시
  // response: 401 Unauthorized
  // body: { error.message: "<에러 메시지>" }
}

export function postSignout() {
  // POST /auth/signout
  // 성공시
  // response: 200 OK
  // body: { message: "Signed out successfully" }
  // 실패시
  // response: 400 Bad Request
  // body: { error.message: "<에러 메시지>" }
}
