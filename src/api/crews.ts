import { PostCrewsBody } from '@/types/api-request.types';

export function getCrews(queryParams?: any) {
  // GET /crews?queryParams
  // queryParams: {
  //   sort?: string,
  //   page?: number,
  //   limit?: number,
  //   city?: string,
  //   district?: string
  // }
  // 성공시
  // response: 200 OK
  // body: Member[]
}

export function createCrew(body: any) {
  // POST /crews
  // body: { name, description, city, district, image }
  // 성공시
  // response: 201 Created
  // body: Crew
  // 실패시
  // response: 400 Bad Request
  // body: { error.message: "<에러 메시지>" }
}

export function getCrewById(crewId: string) {
  // GET /crews/:crewId
  // 성공시
  // response: 200 OK
  // body: Crew
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function getCrewSessionsById(crewId: string, queryParams?: any) {
  // GET /crews/:crewId/sessions
  // queryParams: {
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // response: 200 OK
  // body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
  // // participants, likedUsers, reviews 제외 해도 되지 않을까?
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function getCrewMembersById(crewId: string, queryParams?: any) {
  // GET /crews/:crewId/members?queryParams
  // queryParams: {
  //   role?: 'leader' | 'staff' | 'member',
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // response: 200 OK
  // body: Member[] <- leader라도 배열로 반환
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

/**
 * 아래 함수들은 getCrewMembersById로 대체 가능
export function getCrewLeadersById(crewId: string) {
  // GET /crews/:crewId/members/leaders
}
export function getCrewStaffsById(crewId: string) {
  // GET /crews/:crewId/members/staffs
}
export function getCrewMembersById(crewId: string) {
  // GET /crews/:crewId/members/general
}
*/

export function updateCrewDetail(crewId: string, body: PostCrewsBody) {
  // PATCH /crews/:crewId
  // 권한: 크루장 또는 관리자 권한 필요
  // 성공시
  // response: 200 OK
  // body: Crew
  // 실패시
  // response: 400 Bad Request | 4권4 Not Found | 403 Forbidden
  // body: { error.message: "<에러 메시지>" }
}

export function deleteCrew(crewId: string) {
  // DELETE /crews/:crewId
  // 권한: 크루장 또는 관리자 권한 필요
  // 성공시
  // response: 200 OK
  // body: { message: "Crew deleted successfully" }
  // 실패시
  // response: 404 Not Found | 403 Forbidden
  // body: { error.message: "<에러 메시지>" }
}
