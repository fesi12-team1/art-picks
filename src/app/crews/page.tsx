import CrewCard from '@/components/crew/CrewCard';
import { mockCrews } from '@/mocks/data';

export default function Page() {
  return (
    <div className="tablet:mx-8 laptop:mx-100 mx-4 flex h-screen flex-col items-center gap-12">
      {process.env.NODE_ENV === 'development' && (
        <div>
          <span className="tablet:hidden text-white">mobile</span>
          <span className="tablet:inline-flex laptop:hidden hidden text-white">
            tablet
          </span>
          <span className="laptop:inline-flex hidden text-white">laptop</span>
        </div>
      )}
      <ul className="tablet:gap-x-4 flex w-full flex-col gap-x-3 divide-y">
        {mockCrews.map((crew) => (
          <CrewCard key={crew.id} data={crew} />
        ))}
      </ul>
    </div>
  );
}
