import { cn } from '@/lib/utils';
import FakeTextInputField from './FakeTextInputField';
import SearchAddressButton from './SearchAddressButton';

interface AddressInputProps {
  location: string;
  openAddressSearch: (
    callback: (data: { address: string; sido: string; sigungu: string }) => void
  ) => void;
  setLocation: (location: string) => void;
  setCity: (city: string) => void;
  setDistrict: (district: string) => void;
  className?: string;
}

export default function AddressInput({
  location,
  openAddressSearch,
  setLocation,
  setCity,
  setDistrict,
  className,
}: AddressInputProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <FakeTextInputField location={location} />
      <SearchAddressButton
        location={location}
        onClick={() =>
          openAddressSearch((data) => {
            setLocation(data.address);
            setCity(data.sido);
            setDistrict(data.sigungu);
          })
        }
      />
    </div>
  );
}
