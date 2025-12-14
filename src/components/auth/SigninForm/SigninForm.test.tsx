import { fireEvent, screen } from '@testing-library/react';
import { pushMock } from '@/mocks/nextNavigation';
import { renderWithProviders } from '@/provider/renderWithProviders';
import SigninForm from '.';

describe('SigninForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    pushMock.mockClear();
  });

  it('로그인 성공 시 메인 페이지로 이동한다', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          token: 'fake-token',
        },
      }),
    } as Response);

    renderWithProviders(<SigninForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await screen.findByRole('button', { name: '로그인' });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('INVALID_CREDENTIALS 에러 시 루트 에러 메시지를 표시한다', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        data: null,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
      }),
    } as Response);

    renderWithProviders(<SigninForm />);

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'wrong@test.com' },
    });

    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    expect(
      await screen.findByText('이메일 또는 비밀번호가 올바르지 않습니다.')
    ).toBeInTheDocument();
  });

  it('필수 값이 없으면 API 요청을 보내지 않는다', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');

    renderWithProviders(<SigninForm />);

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
