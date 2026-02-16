import { expect, test } from '@playwright/test';

test('루트 접근 시 세션 목록 페이지로 이동하고 기본 네비게이션이 보인다', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/sessions$/);
  await expect(page).toHaveTitle(/RunFit/);
  await expect(page.getByRole('link', { name: '세션 목록' })).toBeVisible();
  await expect(page.getByRole('link', { name: '크루 찾기' })).toBeVisible();
  await expect(page.getByRole('link', { name: '로그인' })).toBeVisible();
});

test('로그인 페이지에서 회원가입 페이지로 이동할 수 있다', async ({ page }) => {
  await page.goto('/signin');

  await expect(
    page.getByRole('heading', { name: '로그인' }).first()
  ).toBeVisible();
  await expect(page.getByLabel('이메일').first()).toBeVisible();
  await expect(page.getByLabel('비밀번호').first()).toBeVisible();
  await expect(
    page.getByRole('button', { name: '로그인' }).first()
  ).toBeVisible();

  await page.getByRole('link', { name: '회원가입' }).first().click();

  await expect(page).toHaveURL(/\/signup$/);
  await expect(
    page.getByRole('heading', { name: '회원가입' }).first()
  ).toBeVisible();
  await expect(page.getByLabel('이름').first()).toBeVisible();
});
