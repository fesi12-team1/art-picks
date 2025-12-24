'use client';

import { useState } from 'react';
import { useDaumPostcode } from '@/provider/DaumPostcodeProvider';
import AddressInput from './AddressInput';
import DateTimeInputField from './DateTimeInputField';
import DetailInputField from './DetailInputField';
import ImageInputField from './ImageInputField';
import LevelInputField from './LevelInputField';
import MaxParticipantsInputField from './MaxParticipantsInputField';
import NameInputField from './NameInputField';
import PaceInputField from './PaceInputField';
import SubmitButton from './SubmitButton';

export default function SessionCreateForm() {
  const date = new Date();
  const [location, setLocation] = useState('서울특별시 어쩌구');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const { openAddressSearch } = useDaumPostcode();

  return (
    <form className="laptop:flex-row laptop:gap-20 flex w-full flex-col items-stretch">
      <div>
        <div className="tablet:gap-6 mb-6 flex flex-col gap-5">
          <NameInputField />
          <ImageInputField />
        </div>
        <div className="laptop:gap-5 laoptop:mb-0 mb-6 flex flex-col gap-6">
          <DateTimeInputField />
          <AddressInput
            location={location}
            openAddressSearch={openAddressSearch}
            setLocation={setLocation}
            setCity={setCity}
            setDistrict={setDistrict}
          />
          <DetailInputField className="laptop:block hidden" />
        </div>
      </div>
      <div className="laptop:flex-1 laptop:gap-7 flex flex-col gap-6">
        <PaceInputField />
        <hr className="text-gray-800" />
        <LevelInputField />
        <hr className="text-gray-800" />
        <MaxParticipantsInputField />
        <DateTimeInputField />
        <DetailInputField className="laptop:block hidden" />
        <SubmitButton className="laptop:mt-5 mt-4" />
      </div>
    </form>
  );
}
