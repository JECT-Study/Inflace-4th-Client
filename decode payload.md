# JWT Payload 디코딩 제거 및 userDetails 응답 구조 전환 계획

## 배경

백엔드 API 스펙 변경으로 인해 JWT 페이로드에 유저 정보가 포함되지 않게 되었다.
대신 로그인/토큰 재발급 응답 body에 `userDetails`, `userChannelDetails`가 포함된다.

### 새 응답 구조 (로그인 & 재발급 공통)

```json
{
  "responseDto": {
    "accessToken": "...",
    "userDetails": {
      "id": "019da065-7cf7-7f75-a712-d5bae90738f0",
      "profileImage": "https://...",
      "userRoles": [],
      "plan": "FREE"
      "isOnboardingCompleted": false
    },
    "userChannelDetails": {
      "youtubeChannelId": "UXtest",
      "youtubeChannelName": "테스트",
      "youtubeChannelProfileImageUrl": null
    }
  },
  "error": null,
  "success": true
}
```

> 리프레시 토큰은 응답 body가 아닌 **Set-Cookie 헤더**로 전달된다.

---

## 변경 전/후 비교

| 항목           | 변경 전                    | 변경 후                                              |
| -------------- | -------------------------- | ---------------------------------------------------- |
| 유저 정보 출처 | JWT payload 디코딩         | 응답 body의 `userDetails`                            |
| 채널 정보 출처 | JWT payload 디코딩         | 응답 body의 `userChannelDetails`                     |
| `plan` 필드    | JWT payload에 포함         | 응답에 없음 → `AuthUser`에서 제거 또는 optional 처리 |
| 리프레시 토큰  | 응답 body의 `RefreshToken` | Set-Cookie 헤더 (기존 방식 유지)                     |

---

## 삭제할 파일

### `src/shared/lib/decodeJwt.ts`

- `decodeJwt()`, `jwtToAuthUser()` 함수 모두 불필요해짐
- 이 파일을 import하는 모든 곳에서 import 제거 필요

---

## 수정할 파일 목록 및 내용

### 1. `src/shared/api/types.ts`

**삭제할 항목:**

- `JwtPayload` 인터페이스 전체 삭제

**수정할 항목:**

- `AuthUser`: `plan` 필드 제거 (새 응답에 plan 없음). `profileImage`, `userRoles`, `youtubeChannelId`, `youtubeChannelProfileImageUrl` 등 새 필드 반영

  ```
  변경 전                         변경 후
  ──────────────────────────────  ──────────────────────────────
  id: string                      id: string
  plan: UserPlan                  profileImage: string | null
  youtubeChannelName?: string     isOnboardingCompleted: boolean
  youtubeChannelProfileImage?     userRoles: string[]
  isOnboardingCompleted: boolean  youtubeChannelId?: string | null
                                  youtubeChannelName?: string | null
                                  youtubeChannelProfileImageUrl?: string | null
  ```

- `AuthState`: `setAuth` 시그니처는 `user: AuthUser | null` 형태 유지 (변경 없음)

- `UserPlan` 타입: 새 응답에 plan이 없으므로 현재 사용처가 없어지면 삭제 검토

---

### 2. `src/features/auth/model/types.ts`

**수정할 항목: `LoginResponse`**

현재 구조의 문제점:

- `responseDto`에 `RefreshToken` 필드가 있으나, 리프레시 토큰은 Set-Cookie 헤더로 전달됨
- `AccessToken`(대문자) → 새 응답은 `accessToken`(소문자)
- `userDetails`, `userChannelDetails`가 누락되어 있음

변경 후 구조:

```
responseDto:
  accessToken: string
  userDetails:
    id: string
    profileImage: string | null
    userRoles: string[]
    isOnboardingCompleted: boolean
  userChannelDetails:
    youtubeChannelId: string | null
    youtubeChannelName: string | null
    youtubeChannelProfileImageUrl: string | null
error: LoginErrorDetail | null
success: boolean
```

---

### 3. `app/auth/callback/route.ts`

**수정할 항목:**

- `data.responseDto.AccessToken` → `data.responseDto.accessToken` (필드명 변경)
- `user: null`로 postMessage 전달하던 부분을 `userDetails`와 `userChannelDetails`로부터 `AuthUser` 객체를 조립하여 전달하도록 변경
- `decodeJwt` / `jwtToAuthUser` import 없으므로 영향 없음 (현재도 미사용)

---

### 4. `app/auth/refresh/route.ts`

**수정할 항목:**

- `decodeJwt`, `jwtToAuthUser` import 제거
- `responseDto?.AccessToken` → `responseDto?.accessToken` (필드명 변경)
- `user: jwtToAuthUser(decodeJwt(accessToken))` 를 응답 body의 `userDetails`, `userChannelDetails`로부터 `AuthUser` 객체 조립으로 교체
- postMessage 혹은 JSON 응답에 `user` 객체 포함

---

### 5. `src/shared/api/axiosInstance.ts`

**수정할 항목:**

- `decodeJwt`, `jwtToAuthUser` import 제거
- 401 인터셉터에서 refresh 성공 후 유저 정보 처리 변경
  - 현재: `jwtToAuthUser(decodeJwt(accessToken))`으로 user 조립
  - 변경: `/auth/refresh` Route Handler 응답 body의 `user` 필드를 그대로 사용
  - `data.user`가 이미 `AuthUser` 형태로 내려오므로 별도 변환 불필요

---

### 6. `src/shared/api/mock/mockAuth.ts`

**수정할 항목:**

- `JwtPayload` import 및 `mockJwtPayload` 제거
- `mockUser` 필드를 새 `AuthUser` 구조에 맞게 수정 (`plan` 제거, `profileImage`, `userRoles`, `userChannelDetails` 추가)
- `mockLoginResponse`, `mockReissueResponse`의 `responseDto` 구조를 새 응답 형식으로 변경
  - `AccessToken` → `accessToken`
  - `RefreshToken` 필드 제거
  - `userDetails`, `userChannelDetails` 추가

---

### 7. `src/shared/api/axiosInstance.test.ts`

**수정할 항목:**

- `vi.doMock('@/shared/lib/decodeJwt', ...)` mock 제거
- `mockJwtPayload` import 제거
- refresh 성공 테스트: `{ data: { accessToken, user } }` 응답 mock으로 교체
- `data.user` 를 검증하는 방식으로 assertion 수정

---

### 8. `app/auth/refresh/route.test.ts`

**수정할 항목:**

- `mockReissueResponse`의 구조 변경에 따라 응답 mock 업데이트
- `data.user`가 `userDetails` 기반으로 조립된 값인지 검증하는 assertion으로 수정
  - 기존: `expect(data.user).toEqual(expect.objectContaining({ id: '1', plan: 'FREE' }))`
  - 변경: `expect(data.user).toEqual(expect.objectContaining({ id: '...', isOnboardingCompleted: false }))`

---

### 9. `app/auth/mock-callback/route.ts`

**수정할 항목:**

- 현재 mock JWT payload에 `plan`, `isNewUser` 등이 포함되어 있으나 이를 디코딩하는 로직이 제거되므로, postMessage payload에 `user` 객체를 직접 포함하는 방식으로 변경
- `decodeJwt` 호환 포맷의 mock JWT 생성 로직 제거 가능

---

## 작업 순서 (의존성 고려)

```
1. src/features/auth/model/types.ts        — LoginResponse 타입 정의 수정 (가장 먼저, 하위 레이어)
2. src/shared/api/types.ts                 — JwtPayload 삭제, AuthUser 필드 수정
3. src/shared/api/mock/mockAuth.ts         — mock 데이터 새 구조로 수정
4. app/auth/callback/route.ts              — 필드명 변경 + user 조립 방식 변경
5. app/auth/refresh/route.ts               — decodeJwt 제거 + user 조립 방식 변경
6. src/shared/api/axiosInstance.ts         — decodeJwt 제거 + data.user 직접 사용
7. src/shared/lib/decodeJwt.ts             — 파일 삭제
8. src/shared/api/axiosInstance.test.ts    — mock 및 assertion 수정
9. app/auth/refresh/route.test.ts          — mock 및 assertion 수정
10. app/auth/mock-callback/route.ts        — mock JWT 방식 제거
```

---

## 주의 사항

- `app/auth/callback/route.ts`의 postMessage에 `user: null` → `user: AuthUser` 로 변경 시, 수신측 (팝업 메시지 처리 feature) 에서 user를 실제로 사용하는지 확인 필요
- 테스트 파일의 `mockUser.id`가 `'1'`(문자열)인데 새 응답의 id는 UUID 형태 — mock데이터도 UUID 형식에 맞도록 변경해야함
- 유튜브 연동 여부는 userChannelDetails의 존재 유무로 판단한다()
