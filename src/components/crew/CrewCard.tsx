import { Dot } from 'lucide-react';
import Image from 'next/image';
import { mockSessions } from '@/mocks/data';
import { Crew } from '@/types';

interface CrewCardProps {
  data: Crew;
}

export default function CrewCard({ data }: CrewCardProps) {
  // const { data: crewMemberCount } = useGetCrewMemberCount();
  // const { data: crewSessions } = useGetSessionsByCrewId();
  const crewMemberCount = 64;

  return (
    <li className="laptop:justify-between flex w-full py-5">
      <div className="tablet:flex-row flex flex-col">
        <div className="tablet:w-60 relative aspect-video self-stretch overflow-hidden rounded-lg bg-blue-300">
          <Image
            src="/crew.local.jpg"
            alt="Crew"
            fill
            className="object-cover"
          />
          <div className="text-caption-regular absolute bottom-3.5 left-3.5 flex items-center">
            {`${data.city}`}
            <Dot />
            {`멤버 ${crewMemberCount}명`}
          </div>
        </div>
        <div className="laptop:w-[500px] p-3">
          <div className="text-title3-semibold text-gray-50">{data.name}</div>
          <div className="text-body2-regular line-clamp-2 text-gray-300">
            {data.description}
          </div>
        </div>
      </div>
      <div className="laptop:flex hidden w-[300px] flex-col gap-2 p-3">
        <div className="text-body3-semibold text-gray-300">진행된 세션</div>
        <ul className="">
          {/* 이후에는 hook으로 받아온 3개 이하의 crewSessions 사용 */}
          {mockSessions.map((session) => {
            const sessionAt = new Date(session.sessionAt);
            const sessionDate = `${sessionAt.getMonth() + 1}월 ${sessionAt.getDate()}일`;

            return (
              <li
                key={session.id}
                className="text-body2-regular flex justify-between text-gray-100"
              >
                <span>{session.name}</span>
                <div className="text-body3-regular text-gray-200">
                  {sessionDate}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
