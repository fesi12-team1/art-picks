'use client';

// import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
// import { sessionQueries } from '@/api/queries/sessionQueries';
import VerticalEllipsisIcon from '@/assets/icons/vertical-ellipsis.svg?react';
import FixedBottomBar, {
  useFixedBottomBar,
} from '@/components/layout/FixedBottomBar';
import KakaoMap from '@/components/session/KakaoMap';
import Badge, { PaceBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import Rating from '@/components/ui/Rating';
// import TimeSlider from '@/components/ui/TimeSlider';
import UserAvatar from '@/components/ui/UserAvatar';
import {
  formatDDay,
  formatKoMonthDayTime,
  formatKoYearMonthDay,
} from '@/lib/time';

export default function Page() {
  const { id } = useParams();
  // const {
  //   data: session,
  //   error,
  //   isLoading,
  // } = useQuery(sessionQueries.detail(Number(id)));

  const { data, error, isLoading } = {
    data: {
      id: 1,
      crewId: 1,
      hostUserId: 3,
      name: '여의도에서 잠실로 변경',
      description: '변경되었습니다',
      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      city: '서울',
      district: '영등포구',
      coords: {
        lat: 37.5267,
        lng: 126.9347,
      },
      sessionAt: '2025-12-17T09:39:44.324',
      registerBy: '2025-12-11T09:39:44.324',
      level: 'BEGINNER',
      status: 'CLOSED',
      pace: 360,
      maxParticipantCount: 40,
      currentParticipantCount: 2,
      liked: false,
      createdAt: '2025-12-15T18:55:20.314495',
    },
    error: false,
    isLoading: false,
  };

  const participants = [
    {
      userId: 2,
      name: '김철수',
      profileImage: null,
      role: 'MEMBER',
      joinedAt: '2025-12-15T23:07:29.253478',
    },
    {
      userId: 4,
      name: '김길동',
      profileImage:
        'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      role: 'MEMBER',
      joinedAt: '2025-12-15T23:52:19.581889',
    },
  ];

  const {
    name,
    description,
    image,
    city,
    district,
    coords,
    sessionAt,
    registerBy,
    level,
    status,
    pace,
    maxParticipantCount,
    currentParticipantCount,
    createdAt,
    liked,
  } = data;

  const crew = {
    id: 0,
    name: '달리는 거북이 크루',
    description: '엄청난 크루',
    city: '서울',
    image: 'string',
    createdAt: '2025-12-16T07:28:11.912Z',
  };

  const review = {
    id: 0,
    sessionId: 0,
    sessionName: '엄청난 세션',
    crewId: 0,
    userId: 0,
    userName: '하이',
    userImage: 'string',
    description:
      '러닝 너무 재미있었어요 :) 평소에 이용해보고 싶었는데 이렇게 러닝 세션 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
    ranks: 0,
    image: 'string',
    createdAt: '2025-12-16T07:30:41.004Z',
  };

  const { ref, height } = useFixedBottomBar();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {(error as Error).message}</div>;
  // }

  return (
    <main className="h-main w-full">
      <Image
        src={image}
        alt={name}
        height={200}
        width={300}
        className="w-full"
      />

      <div className="rounded-t-[20px] p-6">
        <div className="mb-6 px-1">
          <div className="mb-1 flex w-full items-center justify-between gap-2">
            <Badge variant="dday" size="sm">
              마감 {formatDDay(registerBy)}
            </Badge>
            <VerticalEllipsisIcon className="size-6" />
          </div>
          <div className="mb-2">
            <h1 className="text-title3-semibold text-gray-50">{name}</h1>
            <div className="text-body3-regular text-gray-300">
              {formatKoMonthDayTime(sessionAt)}
            </div>
          </div>
          <div className="mb-6 flex items-center gap-1">
            <PaceBadge size="sm" pace={pace} />
            {/* <LevelBadge size="sm" level={} /> */}
          </div>
          <ProgressBar
            value={currentParticipantCount}
            max={maxParticipantCount}
          />
        </div>

        <hr className="mb-6 text-gray-700" />

        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-body2-semibold text-gray-50">세션 소개</h2>
          <p className="text-body3-regular text-gray-200">{description}</p>
          <div className="text-body3-regular text-gray-300">
            {formatKoYearMonthDay(createdAt)}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-body2-semibold text-gray-50">일정</h2>
          <ul>
            <li>&nbsp;{`• 모임 일시: ${formatKoYearMonthDay(sessionAt)}`}</li>{' '}
            <li>
              &nbsp;{`• 모집 일정: ~ ${formatKoMonthDayTime(registerBy)} 마감`}
            </li>
          </ul>
        </div>
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-body2-semibold flex flex-col text-gray-50">
            장소
          </h2>
          <div className="flex h-[218px] flex-col overflow-hidden rounded-xl border border-gray-600">
            <div className="min-h-0 flex-1">
              <KakaoMap
                coords={coords}
                address="city"
                className="h-full w-full"
              />
            </div>

            <div className="text-body3-semibold flex-none px-4 py-5">
              반포 한강공원 (서울 서초구 신반포로11길 40)
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-body2-semibold inline-flex items-center gap-1 text-gray-50">
            참여 멤버
            <span className="text-body1-semibold text-brand-300">
              {currentParticipantCount}
            </span>
          </h2>
          <ul className="mb-3 flex flex-col gap-2">
            {participants.map((participant) => (
              <li key={participant.userId} className="flex items-center gap-3">
                <UserAvatar
                  src={participant.profileImage}
                  className="size-12 shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-body3-semibold">
                      {participant.name}
                    </span>
                    <Badge size="sm" variant="dday">
                      {participant.role}
                    </Badge>
                  </div>
                  <p className="text-caption-regular line-clamp-1 text-gray-200">
                    {/* {participant.introduction} */}
                    안녕하세요, 잘 부탁드립니다. 안녕하세요, 잘 부탁드립니다.
                    안녕하세요, 잘 부탁드립니다. 안녕하세요, 잘 부탁드립니다.
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="neutral" size="sm" className="w-full">
            더보기
          </Button>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border-gray-600 bg-gray-700 p-3">
          <div className="flex gap-3">
            <Image
              src={
                'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt={crew.name}
              height={44}
              width={66}
              className="rounded-lg"
            />
            <div>
              <div className="text-caption-semibold mb-0.5">{crew.name}</div>
              <div className="text-caption-regular">
                {`${crew.city} • 멤버 64명`}
                {/* {`${crew.city} • 멤버 ${crew.membersCount}명`} */}
              </div>
            </div>
          </div>
          <hr className="text-gray-600" />

          <div className="gap">
            <Rating value={review.ranks} onChange={() => 1} className="mb-2" />
            <p className="text-caption-regular text-gray-200">
              {review.description}
            </p>
          </div>
        </div>
      </div>
      <FixedBottomBar ref={ref}>hellowolrd</FixedBottomBar>
    </main>
  );
}
